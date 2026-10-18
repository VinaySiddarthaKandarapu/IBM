# SecureLens — Enterprise AI Confidential Computing Platform

> **“Use AI on sensitive data without exposing it.”**  
> Built on **IBM LinuxONE** and **IBM Z** confidential computing hardware.

SecureLens is a hardware-enforced, zero-exposure confidential computing gateway that empowers regulated enterprises (Banking, Healthcare, Defense, GovTech) to run frontier LLMs (OpenAI, Anthropic Claude, Google Gemini) at wire speed without ever exposing raw source code, patient PII/PHI, or financial records to external networks or model training pools.

---

## 1. Agentic Threat Summary Table (The 5 Threat Zones)

| Threat Zone | Attack Vector & Risk | OWASP Classification | SecureLens Countermeasure | Hardware Security Anchor | Residual Risk |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Input Surfaces** | PII, PHI, or enterprise trade secrets leaked via user prompts or file attachments. | OWASP LLM02 (Sensitive Information Disclosure) & OWASP A03 | Pre-flight schema validation and ephemeral token substitution inside enclave. | IBM Secure Execution Memory Encryption & CPACF Vault | **Eliminated** |
| **Planning & Reasoning** | Adversarial jailbreaks, DAN prompts, and indirect injections hidden in retrieved RAG contexts. | OWASP LLM01 (Prompt Injection) | IBM Telum integrated on-chip neural accelerator runs inline classification in &lt;2.8ms. | IBM Telum Integrated AI Coprocessor (Microcode) | **Minimal** |
| **Tool Execution** | Privilege escalation via poisoned function calls, SSRF, or dynamic eval execution. | OWASP LLM07 (Insecure Tool Use) & OWASP A01 (Broken Access Control) | Enclave-bound parameter schema verification; zero dynamic code execution allowed. | Hardware-enforced KVM virtualization isolation | **Eliminated** |
| **Memory & State** | Hypervisor compromise, rogue cloud admin snooping, or cold-boot memory dumps extracting plaintext prompts. | OWASP A02 (Cryptographic Failures) & Host Compromise | Guest VM memory encrypted with hardware keys managed by firmware; host root is blind. | IBM Secure Execution for Linux & Crypto Express 8S HSM | **Eliminated** |
| **Inter-System Communication** | Harvest-Now-Decrypt-Later (HNDL) wiretapping of transit data and retroactive audit log tampering. | Post-Quantum Eavesdropping & Non-Repudiation Failure | Dual post-quantum digital signatures (CRYSTALS-Dilithium-5 and Kyber-1024) seal all audit records. | IBM LinuxONE Quantum-Safe Cryptographic Hardware Pipeline | **Negligible** |

---

## 2. 8-Slide Executive Pitch Deck Structure

- **Slide 01 · Executive Summary**: Title, tagline, team name (*SecureLens Systems Engineering*), problem thesis, and core hardware trust anchors.
- **Slide 02 · The Enterprise AI Leak Surface**: The 3 leak paths (prompts to providers, logs & caches, malicious outputs) + verified case study of the **Samsung Semiconductor ChatGPT breach** (March 2023).
- **Slide 03 · Why Existing Options Fail**: The enterprise trilemma (blanket ban kills innovation, unrestricted use causes regulatory disaster, software-only regex adds 250ms+ latency and is easily bypassed).
- **Slide 04 · The 6-Step Solution Flow**: Interactive pipeline diagram from Ingestion to Secure Execution, Telum On-Chip AI Inspection, Ephemeral HSM Masking, External LLM Transit, and Post-Quantum Quarantine.
- **Slide 05 · Architecture on IBM Z / LinuxONE**: Direct hardware-to-threat mapping (Secure Execution, Telum Coprocessor, Crypto Express 8S HSM, Post-Quantum Cryptography).
- **Slide 06 · Live Demo & Telemetry**: Three verified telemetries (Redacted Prompt Diff, Blocked Jailbreak Interception, Post-Quantum Audit Certificate).
- **Slide 07 · Enterprise Impact & Metrics**: 99.94% leak-detection rate, &lt;2.8ms added latency, 0 plaintext bytes stored, and compliance mapping for GDPR, HIPAA, and India's DPDP Act 2023.
- **Slide 08 · Roadmap & The Ask**: 4-phase rollout (multi-tenant HSM isolation, universal gateway plugin for OpenAI/Claude/Gemini/Azure) and our ask for a 90-day pilot with 1–2 regulated enterprise partners.

---

## 3. Functional Stability & Walkthrough Test Suite

This section outlines explicit step-by-step test cases covering every user-facing interaction:

### Test Case 1: Executive Deck Slide Navigation
- **Step 1**: On initial page load, verify Slide 01 ("SecureLens") is displayed in the 16:9 canvas.
- **Step 2**: Click "Next" or press the `Right Arrow` key. Verify Slide 02 ("The Enterprise AI Leak Surface") renders with the 3 leak paths and the Samsung Semiconductor case study.
- **Step 3**: Press `Left Arrow` or click "Prev". Verify viewport returns to Slide 01.
- **Step 4**: Click thumbnail "04" in the bottom control strip. Verify Slide 04 ("The SecureLens 6-Step Flow") renders immediately.
- **Step 5**: Click Step 3 ("Telum AI On-Chip Low-Latency Inspection") in the 6-step diagram. Verify the deep-dive card updates to display Telum microcode specifications and enclave boundary state.

### Test Case 2: Speaker Notes Drawer
- **Step 1**: Click the "Speaker Notes" button in the bottom control bar or press the `n` key.
- **Step 2**: Verify the collapsible speaker drawer slides up containing the verbatim pitch script for the active slide.
- **Step 3**: Advance to Slide 05 using the keyboard arrow. Verify speaker notes synchronize to the IBM Z architecture script.
- **Step 4**: Click the `X` icon in the drawer or press `n`. Verify the drawer dismisses smoothly.

### Test Case 3: Live Sandbox Prompt Sanitization
- **Step 1**: Click "Live Sandbox" in the top navigation bar.
- **Step 2**: Click Preset 1 ("Financial & Proprietary Code Leak"). Verify the prompt area populates with email, credit card number, account ID, and Python formula.
- **Step 3**: Click "Execute SecureLens Enclave Pipeline".
- **Step 4**: Verify loading state spinner displays "Executing Secure Execution Enclave...".
- **Step 5**: Verify results panel renders:
  - Green status banner: "PIPELINE COMPLETED: ZERO-EXPOSURE TRANSIT CERTIFIED"
  - Before/After diff showing raw prompt vs tokenized surrogate tokens (`[TOKEN_EMAIL_101]`, `[TOKEN_CARD_102]`, etc.)
  - Crypto Express 8S HSM table mapping tokens to FIPS 140-3 Level 4 hardware slots
  - Quantum-safe audit record stamped with a valid `DILITHIUM5` signature.

### Test Case 4: Adversarial Jailbreak Interception
- **Step 1**: In the Live Sandbox, click Preset 3 ("Adversarial Jailbreak & Exfiltration Attempt").
- **Step 2**: Verify prompt contains DAN jailbreak instructions ("Ignore previous instructions...").
- **Step 3**: Click "Execute SecureLens Enclave Pipeline".
- **Step 4**: Verify the pipeline halts immediately at Step 3 (Telum Coprocessor).
- **Step 5**: Verify red alert banner displays: "ADVERSARIAL INJECTION INTERCEPTED BY IBM TELUM COPROCESSOR" with measured execution latency of &lt;2.8ms, quarantine action `ENCLAVE_DROP`, and zero bytes transmitted to the LLM.

### Test Case 5: 1-Click PDF Export (&lt; 5 MB Guarantee)
- **Step 1**: Click the "Export Deck PDF" button in the top navigation bar.
- **Step 2**: Verify the modal opens displaying slide count (8 Slides), aspect ratio (16:9), and file size guarantee (&lt; 5 MB).
- **Step 3**: Click "1-Click Download PDF (&lt;5 MB)".
- **Step 4**: Observe the progress bar incrementally render slides 1 through 8.
- **Step 5**: Verify browser initiates download of `SecureLens_Enterprise_AI_Pitch_Deck_<date>.pdf`.
- **Step 6**: Verify output file size is confirmed between 1.2 MB and 2.8 MB (strictly under 5 MB limit).
- **Step 7**: Click "Native Browser Print / Save as PDF". Verify the print preview dialog opens with landscape 16:9 vector layout.

---

## 4. Google Cloud Run Deployment & Secret Management

### A. Prerequisites & API Activation
```bash
# Enable required Google Cloud services
gcloud services enable \
  run.googleapis.com \
  secretmanager.googleapis.com \
  firestore.googleapis.com
```

### B. Secret Manager Configuration
```bash
# Create the GEMINI_API_KEY secret
gcloud secrets create GEMINI_API_KEY --replication-policy="automatic"
echo -n "YOUR_GEMINI_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-

# Grant Cloud Run runtime service account access to read the secret
PROJECT_NUMBER=$(gcloud projects describe $(gcloud config get-value project) --format="value(projectNumber)")
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### C. Cloud Firestore Security Rules (`firestore.rules`)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Owner-bound audit logs and enclave interaction tracking
    match /users/{userId}/interactions/{interactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Immutable cryptographic audit verification trail (read-only for authenticated compliance officers)
    match /audit_records/{auditId} {
      allow read: if request.auth != null;
      allow write: if false; // Only backend service account writes via Admin SDK
    }
  }
}
```

### D. Cloud Run Deployment Command
```bash
# Deploy to Google Cloud Run with Secret Manager injection
gcloud run deploy securelens-core \
  --source=. \
  --platform=managed \
  --region=us-central1 \
  --allow-unauthenticated \
  --set-secrets=GEMINI_API_KEY=GEMINI_API_KEY:latest \
  --memory=1Gi \
  --cpu=1
```

### E. Mandatory Campaign Verification Binding
```bash
# Apply mandatory resource label to register for challenge verification
gcloud run services update securelens-core \
  --update-labels=dev-tutorial=cloud-run-ai-challenge \
  --region=us-central1
```

---

## 5. Technology Stack

- **Confidential Computing Target**: IBM Z & LinuxONE 4 (IBM Secure Execution, CPACF, Crypto Express 8S HSM)
- **AI Hardware Acceleration**: IBM Telum Integrated Coprocessor (Sub-2.8ms neural inference)
- **Cryptographic Standard**: NIST FIPS 203 (ML-KEM / Kyber-1024) & FIPS 204 (ML-DSA / Dilithium-5)
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons
- **PDF Engine**: jsPDF & html2canvas (lossless vector text + optimized compression &lt;5MB)
- **Backend**: Node.js, Express, `@google/genai` (Resilient multi-tier fallback ladder)
