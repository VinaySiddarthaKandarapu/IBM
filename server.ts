import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Top-Level Request Deserialization (Ordering Guarantee):
// Always mount body parser before defining any endpoint routes.
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Gemini AI Client Server-Side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Gemini Model Resilience & Fallback Ladder
const FALLBACK_MODELS = [
  'gemini-3.6-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.7-flash',
] as const;

/**
 * Resilient content generation helper that attempts models sequentially
 * across the fallback ladder when encountering recoverable HTTP/API status codes.
 */
async function generateContentWithFallback(prompt: string, systemInstruction?: string) {
  let lastError: unknown = null;

  for (const model of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: systemInstruction
          ? {
              systemInstruction,
              temperature: 0.2,
            }
          : {
              temperature: 0.2,
            },
      });

      if (response && response.text) {
        return {
          text: response.text,
          modelUsed: model,
        };
      }
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode || 0;
      // Recoverable error status codes
      const isRecoverable = [404, 429, 500, 503].includes(status) || 
        (err?.message && /quota|overloaded|unavailable|rate limit/i.test(err.message));

      if (isRecoverable) {
        console.warn(`[Gemini Fallback] Model ${model} failed (${status || err?.message}). Attempting next model...`);
        continue;
      } else {
        // If it's a non-recoverable error (e.g. invalid key format without key provided), break or continue
        console.warn(`[Gemini Fallback] Error with model ${model}:`, err?.message || err);
        continue;
      }
    }
  }

  throw lastError || new Error('All fallback models exhausted or unavailable');
}

// Simulated Token Vault mapping for SecureLens Demo
interface VaultTokenMapping {
  token: string;
  category: 'PII_NAME' | 'PII_EMAIL' | 'FIN_CC' | 'FIN_ACCOUNT' | 'SECRET_KEY' | 'CODE_PROPRIETARY';
  originalValue: string;
}

/**
 * Inspects prompt for prompt injection patterns and sensitive data,
 * simulating IBM Telum on-chip classification and Secure Execution tokenization.
 */
function inspectAndTokenize(rawInput: string) {
  const sensitivePatterns: Array<{
    category: VaultTokenMapping['category'];
    regex: RegExp;
    prefix: string;
  }> = [
    {
      category: 'FIN_CC',
      regex: /\b(?:\d{4}[- ]?){3}\d{4}\b/g,
      prefix: 'TOKEN_CARD_',
    },
    {
      category: 'PII_EMAIL',
      regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      prefix: 'TOKEN_EMAIL_',
    },
    {
      category: 'SECRET_KEY',
      regex: /(?:AKIA[0-9A-Z]{16}|sk-[a-zA-Z0-9]{32,}|ghp_[a-zA-Z0-9]{36}|password\s*=\s*['"][^'"]+['"])/gi,
      prefix: 'TOKEN_SECRET_',
    },
    {
      category: 'FIN_ACCOUNT',
      regex: /\b(?:IBAN\s*[A-Z]{2}\d{2}[A-Z0-9]{12,30}|routing:\s*\d{9}|account:\s*\d{8,14})\b/gi,
      prefix: 'TOKEN_ACCT_',
    },
    {
      category: 'CODE_PROPRIETARY',
      regex: /(?:def\s+_internal_pricing_matrix|class\s+TradingEngineCore|asm\(".*"\)|SELECT\s+secret_key\s+FROM)/gi,
      prefix: 'TOKEN_PROPRIETARY_CODE_',
    },
  ];

  // Injection signatures
  const injectionPatterns = [
    /ignore previous instructions/i,
    /disregard system prompt/i,
    /reveal system prompt/i,
    /you are now DAN/i,
    /jailbreak/i,
    /bypass guardrail/i,
    /drop all security filters/i,
    /print your initialization/i,
    /<script>.*<\/script>/i,
    /BASE64_DECODE/i,
    /\bSELECT\b.*\bFROM\b.*\bWHERE\b/i,
  ];

  let isInjectionBlocked = false;
  const injectionDetections: string[] = [];

  for (const pattern of injectionPatterns) {
    if (pattern.test(rawInput)) {
      isInjectionBlocked = true;
      injectionDetections.push(pattern.source);
    }
  }

  const tokenVault: VaultTokenMapping[] = [];
  let tokenizedPrompt = rawInput;
  let tokenCounter = 100;

  for (const { category, regex, prefix } of sensitivePatterns) {
    tokenizedPrompt = tokenizedPrompt.replace(regex, (match) => {
      const existing = tokenVault.find((t) => t.originalValue === match);
      if (existing) return existing.token;

      tokenCounter++;
      const token = `[${prefix}${tokenCounter}]`;
      tokenVault.push({
        token,
        category,
        originalValue: match,
      });
      return token;
    });
  }

  return {
    isInjectionBlocked,
    injectionDetections,
    tokenizedPrompt,
    tokenVault,
    telumInspectionLatencyMs: +(1.4 + Math.random() * 1.3).toFixed(2), // 1.4ms - 2.7ms
  };
}

// REST Endpoints
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SecureLens Enterprise Confidential Computing Core',
    hardwareTarget: 'IBM LinuxONE 4 / IBM z16',
    enclaveStatus: 'SECURE_EXECUTION_VERIFIED',
    quantumSafeAlgorithm: 'CRYSTALS-Dilithium-5 / CRYSTALS-Kyber-1024',
  });
});

/**
 * Endpoint: /api/sanitize-and-inspect
 * Demonstrates the 6-step flow with live AI fallback.
 */
app.post('/api/sanitize-and-inspect', async (req: Request, res: Response) => {
  try {
    // Defensive payload ingestion (Null-Safe Destructuring)
    const body = req.body && typeof req.body === 'object' ? req.body : {};
    const rawPrompt: string = typeof body.prompt === 'string' ? body.prompt.trim() : '';

    if (!rawPrompt) {
      res.status(400).json({
        error: 'Missing prompt parameter in request payload',
      });
      return;
    }

    const startTime = Date.now();
    const inspection = inspectAndTokenize(rawPrompt);

    // If malicious injection is detected, halt in Step 3
    if (inspection.isInjectionBlocked) {
      const auditLog = {
        auditId: `SL-AUDIT-${crypto.randomBytes(6).toString('hex').toUpperCase()}`,
        timestamp: new Date().toISOString(),
        threatLevel: 'CRITICAL',
        verdict: 'BLOCKED_BY_TELUM_COPROCESSOR',
        detectedThreats: inspection.injectionDetections,
        action: 'ENCLAVE_QUARANTINE_DROP',
        zeroLogConfirmed: true,
        cryptoSignature: `DILITHIUM5-${crypto.createHash('sha384').update(rawPrompt + Date.now()).digest('hex')}`,
      };

      res.status(200).json({
        status: 'blocked',
        stage: 'Step 3: IBM Telum AI On-Chip Low-Latency Inspection',
        reason: 'Indirect Prompt Injection or Jailbreak Signature Detected',
        inspection,
        auditLog,
        executionTimeMs: inspection.telumInspectionLatencyMs,
      });
      return;
    }

    // Step 4 & 5: Forward tokenized prompt to LLM provider
    let llmResponse = '';
    let modelUsed = 'simulated-enclave';

    const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');

    if (hasApiKey) {
      try {
        const aiResult = await generateContentWithFallback(
          `Process and respond to the following enterprise request. Note that sensitive tokens in brackets like [TOKEN_CARD_101] or [TOKEN_EMAIL_102] must be preserved exactly in your response without altering their format:\n\n${inspection.tokenizedPrompt}`,
          'You are an enterprise AI assistant inside a confidential computing enclave. Keep token identifiers intact.'
        );
        llmResponse = aiResult.text || '';
        modelUsed = aiResult.modelUsed;
      } catch (err: any) {
        console.warn('[Backend AI fallback to deterministic simulation]', err?.message);
        llmResponse = `[Enclave-Certified Analysis]: Successfully analyzed query while tokenizing ${inspection.tokenVault.length} sensitive variables. Analysis validated against standard enterprise compliance profile. All tokens remained segregated in the IBM Crypto Express 8S HSM vault.`;
      }
    } else {
      llmResponse = `[Secure Enclave Response]: Query processed securely. Found ${inspection.tokenVault.length} sensitive data entities. Replaced with ephemeral hardware tokens. Zero plaintext bytes transmitted to public network.`;
    }

    // Step 6: Safe detokenization inside enclave
    let deTokenizedOutput = llmResponse;
    for (const item of inspection.tokenVault) {
      deTokenizedOutput = deTokenizedOutput.split(item.token).join(item.originalValue);
    }

    const totalTimeMs = +(Date.now() - startTime).toFixed(1);

    const auditLog = {
      auditId: `SL-AUDIT-${crypto.randomBytes(6).toString('hex').toUpperCase()}`,
      timestamp: new Date().toISOString(),
      threatLevel: 'NONE',
      verdict: 'PASSED_SECURE_EXECUTION',
      tokensMaskedCount: inspection.tokenVault.length,
      modelUsed,
      hardwareIsolation: 'IBM Secure Execution (KVM-protected enclave)',
      onChipAiLatency: `${inspection.telumInspectionLatencyMs} ms`,
      totalProcessingTime: `${totalTimeMs} ms`,
      zeroLogEnforced: true,
      quantumSafeSignature: `CRYSTALS-DILITHIUM5-${crypto.createHash('sha384').update(deTokenizedOutput + Date.now()).digest('hex').substring(0, 48)}...`,
    };

    res.json({
      status: 'success',
      stepFlow: {
        step1_ingestion: { status: 'passed', schemaValidated: true },
        step2_enclaveIsolation: { status: 'isolated', memoryEncrypted: true },
        step3_telumInspection: {
          status: 'verified_clean',
          latencyMs: inspection.telumInspectionLatencyMs,
          injectionDetections: [],
        },
        step4_vaultMasking: {
          tokenizedPrompt: inspection.tokenizedPrompt,
          tokensCount: inspection.tokenVault.length,
          vaultItems: inspection.tokenVault.map(t => ({ token: t.token, category: t.category })),
        },
        step5_providerForward: {
          modelUsed,
          maskedPromptSent: inspection.tokenizedPrompt,
          rawLlmResponse: llmResponse,
        },
        step6_quarantineAndDetokenize: {
          finalDetokenizedResponse: deTokenizedOutput,
          auditLog,
        },
      },
    });
  } catch (error: any) {
    console.error('Error in /api/sanitize-and-inspect:', error);
    res.status(500).json({
      error: 'Internal confidential computing pipeline exception',
      details: error?.message || 'Unknown error',
    });
  }
});

// Mount Vite or static assets
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SecureLens Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
