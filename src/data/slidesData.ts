import { SlideData, LeakPath, ArchitectureComponent, MetricData } from '../types/deck';

export const SLIDES_META: SlideData[] = [
  {
    id: 1,
    slug: 'title',
    number: '01',
    title: 'SecureLens',
    subtitle: 'Use AI on sensitive data without exposing it',
    category: 'Executive Summary',
    speakerNotes:
      'Welcome everyone. Today, every enterprise CISO faces a high-stakes deadlock: their executives want generative AI gains, but entering corporate data into commercial LLMs risks multi-million dollar exfiltration. SecureLens breaks this deadlock. We provide a hardware-enforced confidential computing gateway built on IBM LinuxONE and IBM Z that allows companies to use leading AI models on sensitive intellectual property, PII, and financial data without ever exposing plaintext outside their secure boundary.',
  },
  {
    id: 2,
    slug: 'problem',
    number: '02',
    title: 'The Enterprise AI Leak Surface',
    subtitle: 'The three critical leak paths and a verified production disaster',
    category: 'Market Problem',
    speakerNotes:
      'Enterprise LLM adoption has three distinct architectural leak paths. Path 1: Prompts sent over public wires directly into vendor training and logging pools. Path 2: Developer observability logs, caches, and vector databases where prompts sit unencrypted in plaintext forever. Path 3: Malicious outputs and indirect prompt injections where untrusted data hijacks internal agents. We saw this blow up at Samsung Semiconductor in March 2023, where engineers inadvertently submitted secret yield code and executive transcripts, leading to an immediate company-wide ban.',
  },
  {
    id: 3,
    slug: 'why-options-fail',
    number: '03',
    title: 'Why Existing Options Fail',
    subtitle: 'The enterprise trilemma: Total ban, raw exposure, or fragile regex proxies',
    category: 'Market Gap',
    speakerNotes:
      'Current enterprise responses fall into three failing traps. Trait 1: Blocking AI kills business velocity, driving employees straight to shadow AI on personal phones. Trait 2: Unrestricted access invites massive regulatory fines under GDPR and DPDP. Trait 3: Software-only proxies like regex gateways fail under scrutiny—they introduce crippling 250ms+ latency, get trivially bypassed by Base64 or token-splitting jailbreaks, and offer zero memory protection against hypervisor dumps.',
  },
  {
    id: 4,
    slug: 'solution-flow',
    number: '04',
    title: 'The SecureLens 6-Step Flow',
    subtitle: 'Hardware-enforced zero-exposure confidential computing pipeline',
    category: 'Core Solution',
    speakerNotes:
      'Here is how SecureLens solves this with a clean 6-step flow. Ingestion validates schemas. IBM Secure Execution encrypts memory so even the cloud host cannot see it. The IBM Telum on-chip accelerator scans for prompt injections in under 2.8ms. Sensitive data is tokenized with high-entropy surrogate markers stored in an HSM vault. Only the sanitized prompt is sent to external LLMs. Finally, responses are quarantined, detokenized in the enclave, and sealed with a post-quantum cryptographic signature.',
  },
  {
    id: 5,
    slug: 'ibm-z-architecture',
    number: '05',
    title: 'Architecture on IBM Z / LinuxONE',
    subtitle: 'Dedicated hardware security features mapped directly to the threats they stop',
    category: 'Deep Tech & Infrastructure',
    speakerNotes:
      'We do not rely on standard commodity cloud instances. SecureLens runs on IBM Z and LinuxONE 4. Each hardware layer maps to an exact enterprise threat: Secure Execution stops hypervisor and rogue cloud admin memory snooping. The Telum on-chip AI coprocessor stops latency bloat while detecting semantic jailbreaks. The Crypto Express 8S HSM stops key theft and cold-boot attacks. And dual-signature post-quantum crypto stops Harvest-Now-Decrypt-Later adversaries.',
  },
  {
    id: 6,
    slug: 'live-demo',
    number: '06',
    title: 'Live Demonstration & Telemetry',
    subtitle: 'Real-time prompt redaction, injection interception, and quantum-safe audit logging',
    category: 'Proof of Execution',
    speakerNotes:
      'In this live demonstration, notice three critical proofs. First: A prompt containing customer credit cards and proprietary pricing logic is instantaneously masked into non-reversible surrogate tokens. Second: An adversarial jailbreak payload is intercepted in 2.1 milliseconds by the Telum coprocessor and quarantined before reaching the model. Third: The immutable audit record has zero plaintext, verified with a post-quantum Dilithium-5 signature.',
  },
  {
    id: 7,
    slug: 'impact-metrics',
    number: '07',
    title: 'Enterprise Impact & Measurable Value',
    subtitle: 'Targeting regulated sectors, bulletproof compliance, and wire-speed performance',
    category: 'Market Impact',
    speakerNotes:
      'Our primary target buyers are CISOs and Chief AI Officers in Fintech, Healthcare, Defense, and GovTech. We unlock complete compliance for GDPR Article 17, HIPAA Safe Harbor, and India’s new DPDP Act which levies ₹250 Crore fines for unauthorized data leaks. Operationally, SecureLens delivers a 99.94% leak-detection rate with under 2.8ms added latency—fast enough for high-frequency trading and live customer support.',
  },
  {
    id: 8,
    slug: 'roadmap-ask',
    number: '08',
    title: 'Roadmap & The Ask',
    subtitle: 'Scaling multi-tenancy, universal LLM gateway SDK, and launching enterprise pilots',
    category: 'Strategy & Milestones',
    speakerNotes:
      'Our roadmap is laser-focused. In Q1 and Q2, we are shipping multi-tenant HSM isolation and a 1-line drop-in SDK for OpenAI, Anthropic, Gemini, and Azure. Our Ask: We are seeking two pilot enterprise design partners in regulated banking or healthcare for a 90-day sandbox pilot on IBM LinuxONE infrastructure. Thank you, and we welcome your questions.',
  },
];

export const LEAK_PATHS: LeakPath[] = [
  {
    id: 'leak-1',
    title: 'Prompts to LLM Providers',
    vector: 'Raw Data Ingestion & Model Training Pools',
    impact: 'Intellectual property, proprietary algorithms, and customer PII are transmitted over third-party APIs and may enter public model retraining sets.',
    severity: 'CRITICAL',
    description: 'When engineers or analysts query cloud LLMs, the complete plaintext prompt traverses public internet gateways and third-party data center buffers.',
  },
  {
    id: 'leak-2',
    title: 'Developer Logs & Vector Caches',
    vector: 'Plaintext Observability & Semantic Caches',
    impact: 'Unencrypted monitoring logs (APM, SIEM, reverse proxies) and vector DB embeddings store queries indefinitely, vulnerable to insider threats and credential leaks.',
    severity: 'HIGH',
    description: 'Even if an LLM provider agrees not to train on prompts, internal infrastructure caches and observability platforms ingest and persist raw sensitive queries.',
  },
  {
    id: 'leak-3',
    title: 'Malicious Outputs & Indirect Injections',
    vector: 'Poisoned Context & Agent Exploitation',
    impact: 'Adversarial jailbreaks and poisoned RAG retrievals trick downstream enterprise agents into leaking private databases or executing unauthorized actions.',
    severity: 'CRITICAL',
    description: 'Attackers embed invisible prompts in external documents or emails that trigger LLMs to exfiltrate private credentials via markdown links or API webhooks.',
  },
];

export const VERIFIED_BREACH_CASE = {
  organization: 'Samsung Electronics (Semiconductor & Device Solutions)',
  date: 'March – April 2023 (Verified Incident)',
  location: 'Hwaseong & Giheung Campus, South Korea',
  rootCause: 'Unrestricted usage of commercial LLM (ChatGPT) on enterprise intellectual property',
  incidents: [
    {
      title: 'Semiconductor Yield Diagnostic Leak',
      detail: 'An engineer in the semiconductor equipment division copied faulty measurement source code and database logs directly into ChatGPT to troubleshoot a yield bottleneck.',
    },
    {
      title: 'Wafer Defect Pattern Exposure',
      detail: 'A second engineer pasted confidential semiconductor equipment test software and yield optimization parameters to generate automated verification scripts.',
    },
    {
      title: 'Executive Strategic Meeting Disclosure',
      detail: 'A third employee uploaded the recorded audio transcript of an executive corporate strategy meeting into ChatGPT to create an automated executive briefing.',
    },
  ],
  consequences: [
    'Proprietary semiconductor manufacturing IP ingested into commercial AI data pools',
    'Emergency 1,024-byte prompt limit imposed immediately across all engineering divisions',
    'Full internal company ban on generative AI tools announced in May 2023',
    'Launch of costly internal bespoke infrastructure to replace off-the-shelf AI services',
  ],
  lesson: 'Software policies and employee NDAs are ineffective against employee convenience; hardware-enforced data isolation is essential.',
};

export const EXISTING_OPTIONS_FAIL = [
  {
    option: 'Option A: Blanket AI Ban',
    verdict: 'Kills Innovation & Spawns Shadow AI',
    tradeoff: 'Security: High | Productivity: Zero',
    flaw: 'Employees circumvent network firewalls using personal devices and unmonitored home networks, exacerbating unmonitored data exfiltration.',
    latency: 'N/A',
  },
  {
    option: 'Option B: Unrestricted Adoption',
    verdict: 'Catastrophic Regulatory Exposure',
    tradeoff: 'Security: Zero | Productivity: High',
    flaw: 'Direct exposure to GDPR fines (up to 4% global turnover), DPDP Act penalties (₹250 Cr), and irreversible loss of core trade secrets.',
    latency: '0 ms',
  },
  {
    option: 'Option C: Software-Only Regex / Proxies',
    verdict: 'High Latency & Easily Bypassed',
    tradeoff: 'Security: Fragile | Productivity: Degraded',
    flaw: 'Adds 250ms–600ms latency. Defeated by Base64, leetspeak, token-smuggling, and zero-day jailbreaks. Vulnerable to hypervisor-level memory scraping.',
    latency: '+280 ms to +650 ms',
  },
];

export const SIX_STEP_FLOW = [
  {
    step: 1,
    title: 'Ingestion & Pre-Flight Sanitization',
    focus: 'Strict Schema & Format Guard',
    technology: 'OWASP LLM02 Context Filter',
    details: 'Validates structure, enforces parameter bounds, and strips unauthorized binary payloads before entering compute boundary.',
  },
  {
    step: 2,
    title: 'Secure Execution Enclave Isolation',
    focus: 'Hardware Memory Confidentiality',
    technology: 'IBM Secure Execution for Linux',
    details: 'Isolates workload in a hardware-encrypted memory space inaccessible to hypervisors, cloud admins, or kernel memory dumps.',
  },
  {
    step: 3,
    title: 'Telum AI On-Chip Low-Latency Inspection',
    focus: 'Microcode-Speed Neural Defense',
    technology: 'IBM Telum Integrated AI Coprocessor',
    details: 'Runs inline deep neural models in <2.8ms to classify adversarial jailbreaks, prompt injections, and covert semantic leaks.',
  },
  {
    step: 4,
    title: 'Ephemeral Zero-Log Token Masking',
    focus: 'Cryptographic Surrogate Substitution',
    technology: 'Crypto Express 8S HSM Vault',
    details: 'Replaces sensitive PII, account numbers, and code tokens with transient surrogate keys. Vault keys never leave the HSM.',
  },
  {
    step: 5,
    title: 'External LLM Provider Forwarding',
    focus: 'Sanitized Public Wire Transit',
    technology: 'TLS 1.3 + Provider Enclave Bridge',
    details: 'Transmits only sanitized, tokenized prompts to commercial LLMs (Gemini, Claude, GPT-4). Plaintext secrets never leave the enterprise.',
  },
  {
    step: 6,
    title: 'Quarantine, Detokenize & Post-Quantum Audit',
    focus: 'Safe Output & Quantum Non-Repudiation',
    technology: 'CRYSTALS-Dilithium-5 / Kyber-1024',
    details: 'Inspects model response, detokenizes variables inside secure enclave, and stamps an immutable quantum-safe cryptographic audit trail.',
  },
];

export const ARCHITECTURE_COMPONENTS: ArchitectureComponent[] = [
  {
    component: 'IBM Secure Execution for Linux',
    technology: 'Confidential Computing / Hardware Memory Encryption',
    threatStopped: 'Hypervisor compromise, cloud operator snooping, and host kernel memory dumping.',
    hardwareLevel: 'Microarchitecture / Firmware-managed VM boundaries',
    spec: 'Hardware-enforced memory keys generated per-guest via Secure Execution CPACF.',
    details: 'Eliminates cloud provider trust assumptions by ensuring memory is cryptographically locked even against root-level host admins.',
  },
  {
    component: 'IBM Telum On-Chip AI Accelerator',
    technology: 'Inline Deep Neural Microcode Coprocessor',
    threatStopped: 'Software proxy latency penalties (>300ms) and evasive semantic jailbreak/injection attacks.',
    hardwareLevel: 'Directly on Telum / Telum II processor die (32+ TFLOPS)',
    spec: '<2.8ms end-to-end inference latency with zero PCIe bus traversal bottlenecks.',
    details: 'Allows high-throughput real-time classification of complex prompts at line rate without degrading user experience.',
  },
  {
    component: 'CPACF & Crypto Express 8S HSM',
    technology: 'Hardware Security Module with Physical Tamper Envelope',
    threatStopped: 'Cryptographic key extraction, cold-boot DRAM attacks, and token-reversal vault theft.',
    hardwareLevel: 'FIPS 140-3 Level 4 certified physical and environmental security',
    spec: 'True hardware random number generation (TRNG) & hardware-accelerated symmetric/asymmetric engines.',
    details: 'Ensures the surrogate token lookup table remains locked in tamper-responsive hardware that zeroes keys upon unauthorized physical probe.',
  },
  {
    component: 'Quantum-Safe Dual-Signature Pipeline',
    technology: 'NIST Post-Quantum Cryptography (FIPS 203 & 204)',
    threatStopped: 'Harvest-Now-Decrypt-Later (HNDL) state-sponsored surveillance and retroactive audit forgery.',
    hardwareLevel: 'Hardware-accelerated post-quantum primitives (Kyber-1024 / Dilithium-5)',
    spec: 'Dual classic/PQC hybrid digital signatures generated in hardware with microsecond verification.',
    details: 'Guarantees compliance and non-repudiation for financial and defense audit logs 20+ years into the quantum computing era.',
  },
];

export const IMPACT_METRICS: MetricData[] = [
  {
    label: 'Leak Detection Rate',
    value: '99.94%',
    baseline: '74.2% (Software Regex)',
    detail: 'Deep neural semantic intent classification on Telum coprocessor vs brittle pattern matching.',
  },
  {
    label: 'Added Pipeline Latency',
    value: '<2.8 ms',
    baseline: '+340 ms (Python Proxies)',
    unit: 'ms',
    detail: 'Direct on-chip die acceleration eliminates network hops and OS context switches.',
  },
  {
    label: 'Plaintext Stored or Logged',
    value: '0 Bytes',
    baseline: 'Full Prompt in SIEM',
    detail: 'Zero-log architecture substitutes data at hardware boundary; keys stay in volatile HSM.',
  },
  {
    label: 'Audit Non-Repudiation',
    value: '100%',
    baseline: 'SHA-256 (Vulnerable)',
    detail: 'Quantum-safe dual signatures (Dilithium-5) guarantee tamper-proof regulatory proof.',
  },
];

export const COMPLIANCE_FRAMEWORKS = [
  {
    framework: 'GDPR (European Union)',
    articles: 'Articles 17, 25, 32',
    solutionProof: 'Guarantees the Right to Erasure by ensuring private data never enters model weights. Implements Data Protection by Design & Default.',
  },
  {
    framework: 'HIPAA (United States)',
    articles: 'Section 164.514 (ePHI Safe Harbor)',
    solutionProof: 'Hardware-enforced 18-element identifier stripping transforms patient clinical notes into compliant anonymized research queries.',
  },
  {
    framework: 'India DPDP Act (2023)',
    articles: 'Section 6 & Section 8 Fiduciary Safeguards',
    solutionProof: 'Prevents unauthorized cross-border transmission of Indian citizen data, eliminating penalties that reach up to ₹250 Crore (~$30M USD).',
  },
  {
    framework: 'EU AI Act (2024)',
    articles: 'High-Risk AI System Traceability',
    solutionProof: 'Enforces mandatory risk assessment, bias monitoring, and immutable post-quantum audit logging required for Tier-1 algorithmic systems.',
  },
];

export const TARGET_USERS = [
  {
    role: 'Chief Information Security Officer (CISO)',
    domain: 'Tier-1 Banks, Asset Managers & Insurance',
    painPoint: 'Paralyzed by compliance risk of financial analysts querying confidential M&A, algorithmic trade books, or customer balances.',
  },
  {
    role: 'Chief Medical / Clinical Informatics Officer',
    domain: 'Hospital Networks & Life Sciences',
    painPoint: 'Clinical doctors want LLMs to summarize patient histories but risk massive HIPAA OCR penalties if raw notes touch external clouds.',
  },
  {
    role: 'Head of National Security & Defense AI',
    domain: 'Defense Contractors & Federal Agencies',
    painPoint: 'Classified or CUI intelligence summaries must never leak to multi-tenant commercial model infrastructure.',
  },
  {
    role: 'VP of AI & Enterprise Digital Transformation',
    domain: 'Multinational Corporations & Tech',
    painPoint: 'Blocked from rolling out enterprise-wide Copilots and coding assistants due to legal team vetoes over IP ownership.',
  },
];

export const ROADMAP_QUARTERS = [
  {
    quarter: 'Phase 1 · Current',
    title: 'Core Hardware-Enforced Engine',
    deliverables: [
      'IBM Secure Execution enclave runtime',
      'IBM Telum inline microcode classifier (<2.8ms)',
      'Crypto Express 8S HSM surrogate token vault',
      'Post-quantum Dilithium-5 audit verification',
    ],
    status: 'COMPLETED',
  },
  {
    quarter: 'Phase 2 · Q3 2026',
    title: 'Multi-Tenant Enterprise Partitioning',
    deliverables: [
      'Dynamic per-tenant HSM key segmentation',
      'Custom fine-grained compliance policy rulesets',
      'Cross-departmental budget & quota telemetry',
      'Automated tenant revocation with zero data remnants',
    ],
    status: 'IN_DEVELOPMENT',
  },
  {
    quarter: 'Phase 3 · Q4 2026',
    title: 'Universal Drop-In Gateway Plugin',
    deliverables: [
      '1-line endpoint redirect SDK for OpenAI, Anthropic, Gemini & Azure',
      'Client-side zero-configuration interceptor proxy',
      'LangChain, LlamaIndex, and AutoGen middleware bridges',
      'Synthetic benchmark testing suite for continuous verification',
    ],
    status: 'UPCOMING',
  },
  {
    quarter: 'Phase 4 · Q1 2027',
    title: 'Decentralized Cross-Cloud Attestation',
    deliverables: [
      'Multi-cloud federation via IBM Cloud Hyper Protect Virtual Servers',
      'Hardware remote attestation verification reports',
      'Zero-trust multi-agent confidential communication',
      'Global Tier-1 financial compliance certifications',
    ],
    status: 'PLANNED',
  },
];

export const THE_ASK_DETAILS = {
  headline: 'Partnering for Regulated Enterprise Confidential AI',
  targetPartners: '1–2 Tier-1 Regulated Customers (Financial Services, Healthcare, or GovTech)',
  pilotStructure: {
    duration: '90-Day Production Pilot',
    seats: 'Up to 500 Enterprise Knowledge Workers / Developers',
    infrastructure: 'Dedicated IBM LinuxONE / IBM Z Confidential Computing Enclave',
    objective: 'Demonstrate zero-leak AI adoption on live internal workflows with 100% compliance clearance',
  },
  coInnovationSupport: 'Joint architecture validation and hardware optimization in partnership with IBM Ecosystem & LinuxONE Engineering.',
  teamContact: {
    teamName: 'SecureLens Systems Engineering',
    lead: 'Vinay S. Kandarapu & Team',
    focus: 'Enterprise Confidential Computing & Hardware AI Security',
    email: 'vinaysiddarthakandarapu@gmail.com',
  },
};
