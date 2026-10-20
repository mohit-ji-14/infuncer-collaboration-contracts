import React from 'react';
import { X, ShieldCheck, CheckCircle2, Clock, Copy, Download, ExternalLink } from 'lucide-react';

export default function AuditCertificateModal({ isOpen, onClose, contract }) {
  if (!isOpen || !contract) return null;

  const handleCopyHash = () => {
    if (contract.contract_hash) {
      navigator.clipboard.writeText(contract.contract_hash);
      alert('Contract SHA-256 Hash copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Certificate of Execution & Cryptographic Audit</h3>
              <p className="text-xs text-slate-400">
                Official E-SIGN Compliance Record • {contract.contract_number}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Body (Styled like an official legal certificate) */}
        <div className="p-6 space-y-6 overflow-y-auto print:p-0">
          
          {/* Certificate Badge Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Legally Binding Digital Execution</span>
              </span>
              <h4 className="text-lg font-bold text-white">{contract.title}</h4>
              <p className="text-xs text-slate-400">Campaign: {contract.campaign_name}</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Total Consideration</div>
              <div className="text-xl font-extrabold text-indigo-400">
                ${contract.total_compensation?.toLocaleString('en-US', { minimumFractionDigits: 2 })} {contract.currency}
              </div>
            </div>
          </div>

          {/* Cryptographic SHA-256 Hash Box */}
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Document Cryptographic Fingerprint (SHA-256):</span>
              <button
                onClick={handleCopyHash}
                className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Hash</span>
              </button>
            </div>
            <div className="font-mono text-xs text-sky-400 break-all select-all bg-slate-900/80 p-2 rounded border border-slate-800">
              {contract.contract_hash || 'SHA-256 Verification in progress'}
            </div>
            <div className="text-[10px] text-slate-500">
              Certified under U.S. Electronic Signatures in Global and National Commerce Act (15 U.S.C. § 7001) & EU eIDAS regulation.
            </div>
          </div>

          {/* Signers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Brand Signer Block */}
            <div className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-2">
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center justify-between">
                <span>Brand Representative</span>
                {contract.brand_signature?.signed ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Signed & Verified
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                    Pending
                  </span>
                )}
              </div>
              <div className="text-sm font-bold text-white">{contract.brand_name}</div>
              <div className="text-xs text-slate-300">
                Signer: {contract.brand_signature?.signer_name || contract.brand_contact}
              </div>
              <div className="text-xs text-slate-400">
                Title: {contract.brand_signature?.signer_title || 'Authorized Executive'}
              </div>
              <div className="text-[11px] text-slate-500 font-mono space-y-0.5 pt-2 border-t border-slate-700/40">
                <div>Date: {contract.brand_signature?.timestamp || 'Pending execution'}</div>
                <div>IP: {contract.brand_signature?.ip_address || 'Encrypted SSL'}</div>
              </div>
            </div>

            {/* Creator Signer Block */}
            <div className="p-4 bg-slate-800/40 border border-slate-700/60 rounded-xl space-y-2">
              <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider flex items-center justify-between">
                <span>Creator / Influencer Talent</span>
                {contract.creator_signature?.signed ? (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Signed & Verified
                  </span>
                ) : (
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                    Pending
                  </span>
                )}
              </div>
              <div className="text-sm font-bold text-white">
                {contract.creator_name} <span className="text-slate-400 font-normal">({contract.creator_handle})</span>
              </div>
              <div className="text-xs text-slate-300">
                Signer: {contract.creator_signature?.signer_name || contract.creator_name}
              </div>
              <div className="text-xs text-slate-400">
                Email: {contract.creator_email}
              </div>
              <div className="text-[11px] text-slate-500 font-mono space-y-0.5 pt-2 border-t border-slate-700/40">
                <div>Date: {contract.creator_signature?.timestamp || 'Awaiting creator sign'}</div>
                <div>IP: {contract.creator_signature?.ip_address || 'Encrypted SSL'}</div>
              </div>
            </div>
          </div>

          {/* Chronological Audit Trail */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Immutable Lifecycle Audit Trail</span>
            </h5>
            <div className="space-y-2">
              {contract.audit_trail?.map((evt, idx) => (
                <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-start justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{evt.action}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {evt.actor_role}
                      </span>
                    </div>
                    <p className="text-slate-400">{evt.details}</p>
                    <div className="text-[10px] text-slate-500 font-mono">Actor: {evt.actor_name}</div>
                  </div>
                  <div className="text-right text-[10px] font-mono text-slate-500">
                    <div>{new Date(evt.timestamp).toLocaleString()}</div>
                    <div className="text-indigo-400">{evt.hash}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-800/80 border-t border-slate-700/80 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Certificate ID: <span className="font-mono text-slate-400">CERT-{contract.id?.toUpperCase()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
            >
              Print / Save Certificate
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
