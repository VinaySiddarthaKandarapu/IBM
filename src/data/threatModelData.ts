import { ThreatZoneEntry } from '../types/deck';

export const THREAT_MODEL_TABLE: ThreatZoneEntry[] = [
  {
    zone: 'Input Surfaces',
    threatScenario: 'PII, PHI, or enterprise API keys leaked via user prompts or file attachments into external LLM clouds.',
    owaspMapping: 'OWASP LLM02 (Sensitive Information Disclosure) & OWASP A03 (Injection)',
    secureLensCountermeasure: 'Pre-flight context sanitization and ephemeral token masking inside IBM Secure Execution enclave before external dispatch.',
    hardwareAnchor: 'IBM Secure Execution Memory Isolation & CPACF Hardware Key Vault',
    residualRisk: 'Eliminated',
  },
  {
    zone: 'Planning & Reasoning',
    threatScenario: 'Adversarial jailbreaks and indirect prompt injection hidden in retrieved RAG contexts overriding model guardrails.',
    owaspMapping: 'OWASP LLM01 (Prompt Injection)',
    secureLensCountermeasure: 'IBM Telum on-chip integrated AI coprocessor runs low-latency (<2.8ms) neural inspection detecting injection signatures at microcode speed.',
    hardwareAnchor: 'IBM Telum On-Chip Neural Accelerator (Dedicated Microcode Coprocessor)',
    residualRisk: 'Minimal',
  },
  {
    zone: 'Tool Execution',
    threatScenario: 'Privilege escalation and unauthorized tool routing (SSRF, malicious function calls invoked via poisoned LLM completions).',
    owaspMapping: 'OWASP LLM07 (Insecure Tool Use) & OWASP A01 (Broken Access Control)',
    secureLensCountermeasure: 'Strict JSON schema parameters verification, enclave-bound proxy boundaries, and zero dynamic code evaluation.',
    hardwareAnchor: 'Hardware-enforced KVM memory virtualization barriers',
    residualRisk: 'Eliminated',
  },
  {
    zone: 'Memory & State',
    threatScenario: 'Host hypervisor compromise, side-channel snooping, or cold-boot memory dumps extracting plaintext prompts and surrogate token tables.',
    owaspMapping: 'OWASP A02 (Cryptographic Failures) & Cloud Hypervisor Exposure',
    secureLensCountermeasure: 'IBM Secure Execution hardware-encrypts guest memory with keys generated and locked inside CPACF/HSM firmware, inaccessible to host root.',
    hardwareAnchor: 'CPACF / Crypto Express 8S HSM (FIPS 140-3 Level 4 physical tamper proofing)',
    residualRisk: 'Eliminated',
  },
  {
    zone: 'Inter-System Communication',
    threatScenario: 'Harvest-Now-Decrypt-Later (HNDL) wiretapping of transit data and retroactive tampering with audit records by quantum computers.',
    owaspMapping: 'Post-Quantum Eavesdropping & Audit Tampering',
    secureLensCountermeasure: 'Dual-signature post-quantum cryptography (CRYSTALS-Dilithium-5 and Kyber-1024) applied to all inter-enclave telemetry and audit digests.',
    hardwareAnchor: 'IBM LinuxONE Quantum-Safe Cryptographic Hardware Pipeline (NIST FIPS 203/204)',
    residualRisk: 'Negligible',
  },
];
