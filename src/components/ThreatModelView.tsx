import React from 'react';
import { THREAT_MODEL_TABLE } from '../data/threatModelData';
import { ShieldCheck, AlertTriangle, Cpu, Lock, CheckCircle2 } from 'lucide-react';

export const ThreatModelView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-slate-900/90 rounded-xl p-6 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>AGENTIC THREAT MODELING SPECIFICATION</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              The 5 Threat Zones &amp; Countermeasures Matrix
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Structured threat analysis for SecureLens confidential computing architecture,
              evaluating attack vectors across the 5 threat zones against OWASP Top 10 (Web) and
              OWASP Top 10 for LLM Applications.
            </p>
          </div>

          <div className="text-xs font-mono bg-slate-950 px-3 py-2 rounded-lg border border-slate-800">
            <span className="text-slate-400">FRAMEWORK:</span>{' '}
            <span className="text-blue-400 font-semibold">OWASP LLM 2025 / NIST FIPS</span>
          </div>
        </div>
      </div>

      {/* Threat Summary Table */}
      <div className="bg-slate-900/90 rounded-xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono">
                <th className="py-3 px-4 uppercase">Threat Zone</th>
                <th className="py-3 px-4 uppercase">Attack Scenario &amp; Exposure</th>
                <th className="py-3 px-4 uppercase">OWASP Mapping</th>
                <th className="py-3 px-4 uppercase">SecureLens Countermeasure</th>
                <th className="py-3 px-4 uppercase">Hardware Anchor</th>
                <th className="py-3 px-4 uppercase">Residual Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {THREAT_MODEL_TABLE.map((item, index) => (
                <tr key={index} className="hover:bg-slate-950/40 transition-colors">
                  <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      <span>{item.zone}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-300 max-w-xs leading-relaxed">
                    {item.threatScenario}
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-blue-300 max-w-[180px]">
                    {item.owaspMapping}
                  </td>
                  <td className="py-4 px-4 text-slate-300 max-w-sm leading-relaxed">
                    {item.secureLensCountermeasure}
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-400 max-w-[180px]">
                    {item.hardwareAnchor}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`font-mono text-[11px] px-2 py-0.5 rounded ${
                        item.residualRisk === 'Eliminated'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                          : 'bg-blue-950 text-blue-300 border border-blue-800/50'
                      }`}
                    >
                      {item.residualRisk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hardware Defense in Depth Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-blue-400 font-semibold flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL COMPUTE</span>
          </div>
          <h4 className="text-sm font-bold text-white">IBM Secure Execution for Linux</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Eliminates all hypervisor and operator trust. Even root cloud administrators with physical host access
            cannot inspect guest memory registers or extract prompts.
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-blue-400 font-semibold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>WIRE-SPEED AI CLASSIFICATION</span>
          </div>
          <h4 className="text-sm font-bold text-white">IBM Telum Integrated Coprocessor</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            32+ TFLOPS on-chip neural engine evaluates semantic jailbreak vectors in &lt;2.8ms without PCIe traversal
            or Python proxy bottlenecks.
          </p>
        </div>

        <div className="p-4 bg-slate-900/80 rounded-lg border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-blue-400 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>QUANTUM RESILIENCE</span>
          </div>
          <h4 className="text-sm font-bold text-white">Post-Quantum Cryptography</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            CRYSTALS-Dilithium-5 and Kyber-1024 dual digital signatures seal audit logs against
            Harvest-Now-Decrypt-Later (HNDL) attacks for 20+ years.
          </p>
        </div>
      </div>
    </div>
  );
};
