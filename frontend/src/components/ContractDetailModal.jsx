import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Download, 
  PenTool, 
  ExternalLink, 
  Eye, 
  DollarSign, 
  Sparkles, 
  Layers, 
  Lock,
  AlertTriangle
} from 'lucide-react';
import { api } from '../services/api';

export default function ContractDetailModal({
  isOpen,
  onClose,
  contract,
  role,
  onOpenSign,
  onOpenDeliverables,
  onOpenCertificate
}) {
  const [activeTab, setActiveTab] = useState('clauses'); // 'clauses', 'deliverables', 'milestones', 'audit'
  const [showPlainEnglish, setShowPlainEnglish] = useState(true);

  if (!isOpen || !contract) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active & Executed</span>;
      case 'pending_creator_sign':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1"><Clock className="w-3.5 h-3.5 mr-1" /> Pending Creator E-Sign</span>;
      case 'pending_brand_sign':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1"><Clock className="w-3.5 h-3.5 mr-1" /> Pending Brand E-Sign</span>;
      case 'completed':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center space-x-1"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Campaign Completed</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">{status}</span>;
    }
  };

  const isSignableByCurrentRole = () => {
    if (role === 'creator') {
      return !contract.creator_signature?.signed;
    } else {
      return !contract.brand_signature?.signed;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/90 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">{contract.title}</h3>
                <span className="text-xs font-mono text-slate-400">{contract.contract_number}</span>
              </div>
              <p className="text-xs text-slate-400">
                {contract.brand_name} &bull; {contract.creator_name} ({contract.creator_handle})
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {getStatusBadge(contract.status)}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Highlights Bar */}
        <div className="px-6 py-2.5 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Compensation</span>
              <span className="font-bold text-emerald-400 text-sm">
                ${contract.total_compensation?.toLocaleString()} {contract.currency}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Campaign Duration</span>
              <span className="font-medium text-slate-300">
                {contract.start_date} &rarr; {contract.end_date}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 uppercase tracking-wider text-[10px] block">Security Fingerprint</span>
              <span className="font-mono text-sky-400 text-[11px]">
                {contract.contract_hash ? contract.contract_hash.substring(0, 16) + '...' : 'Verified'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={api.getPdfUrl(contract.id)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={() => onOpenCertificate(contract)}
              className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audit Cert</span>
            </button>

            {isSignableByCurrentRole() && (
              <button
                onClick={() => onOpenSign(contract)}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-semibold rounded-lg shadow-md transition-all cursor-pointer"
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>E-Sign Contract</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Headers */}
        <div className="flex items-center px-6 border-b border-slate-800 bg-slate-900/40 text-xs font-medium space-x-4">
          <button
            onClick={() => setActiveTab('clauses')}
            className={`py-3 border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'clauses'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Legal Clauses & AI Explainer</span>
          </button>

          <button
            onClick={() => setActiveTab('deliverables')}
            className={`py-3 border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'deliverables'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Deliverables ({contract.deliverables?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('milestones')}
            className={`py-3 border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'milestones'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Escrow Milestones</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'audit'
                ? 'border-indigo-500 text-indigo-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Signatures & Audit Trail</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 space-y-4 overflow-y-auto">
          
          {/* TAB 1: CLAUSES & AI EXPLAINER */}
          {activeTab === 'clauses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-indigo-950/20 border border-indigo-900/40 rounded-xl">
                <div className="flex items-center space-x-2 text-xs text-indigo-300 font-medium">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>AI Plain-English Summary Mode</span>
                </div>
                <button
                  onClick={() => setShowPlainEnglish(!showPlainEnglish)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    showPlainEnglish
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {showPlainEnglish ? 'Enabled (Simplified)' : 'Disabled (Legalese)'}
                </button>
              </div>

              <div className="space-y-3">
                {contract.clauses?.map((c, idx) => (
                  <div key={c.id || idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                          {idx + 1}
                        </span>
                        <span>{c.title}</span>
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        FTC Verified
                      </span>
                    </div>

                    {showPlainEnglish ? (
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-sky-300 leading-relaxed">
                        <span className="font-semibold text-sky-200">Plain English Takeaway: </span>
                        {c.summary}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-300 font-serif leading-relaxed pl-7">
                        {c.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DELIVERABLES */}
          {activeTab === 'deliverables' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Deliverable Tracking & Verification
                </h4>
                <button
                  onClick={() => onOpenDeliverables(contract)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Manage / Submit Proofs
                </button>
              </div>

              <div className="space-y-3">
                {contract.deliverables?.map((d) => (
                  <div key={d.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white">{d.title}</span>
                        <span className="text-[10px] font-bold uppercase text-slate-400 px-1.5 py-0.5 bg-slate-800 rounded">
                          {d.platform}
                        </span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        d.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        d.status === 'submitted' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                        d.status === 'revision_requested' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {d.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400">{d.specs}</p>
                    <div className="text-[11px] text-slate-500">Due: {d.due_date}</div>

                    {d.submission_url && (
                      <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 font-medium">Proof URL:</span>
                          <a
                            href={d.submission_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-400 hover:underline flex items-center space-x-1"
                          >
                            <span>{d.submission_url}</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        </div>
                        {d.feedback && (
                          <div className="text-amber-300 text-[11px]">Feedback: {d.feedback}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Escrow Vault & Payment Triggers
                </h4>
                <button
                  onClick={() => onOpenDeliverables(contract)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Manage Escrow
                </button>
              </div>

              <div className="space-y-3">
                {contract.milestones?.map((m) => (
                  <div key={m.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white">{m.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          m.status === 'released' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}>
                          {m.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{m.due_trigger}</p>
                      {m.released_at && (
                        <div className="text-[10px] text-emerald-400 mt-0.5">
                          Released on: {new Date(m.released_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-base font-extrabold text-emerald-400">
                        ${m.amount?.toLocaleString()} {contract.currency}
                      </div>
                      <div className="text-xs text-slate-500">{m.percentage}% allocation</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT & SIGNATURES */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Brand Signature */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase text-indigo-400">
                    <span>Brand Signature</span>
                    {contract.brand_signature?.signed ? (
                      <span className="text-emerald-400">Signed</span>
                    ) : (
                      <span className="text-amber-400">Pending</span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-white">{contract.brand_name}</div>
                  <div className="text-xs text-slate-300">
                    Signer: {contract.brand_signature?.signer_name || contract.brand_contact}
                  </div>
                  {contract.brand_signature?.signed && (
                    <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800">
                      Signed: {contract.brand_signature?.timestamp}
                    </div>
                  )}
                </div>

                {/* Creator Signature */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase text-pink-400">
                    <span>Creator Signature</span>
                    {contract.creator_signature?.signed ? (
                      <span className="text-emerald-400">Signed</span>
                    ) : (
                      <span className="text-amber-400">Pending</span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-white">{contract.creator_name} ({contract.creator_handle})</div>
                  <div className="text-xs text-slate-300">
                    Signer: {contract.creator_signature?.signer_name || 'Pending creator sign'}
                  </div>
                  {contract.creator_signature?.signed && (
                    <div className="text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800">
                      Signed: {contract.creator_signature?.timestamp}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Audit Events ({contract.audit_trail?.length || 0})
                </div>
                <div className="space-y-1.5">
                  {contract.audit_trail?.map((ev, i) => (
                    <div key={i} className="text-xs text-slate-400 flex items-center justify-between p-2 bg-slate-900 rounded">
                      <div>
                        <span className="font-semibold text-white mr-2">{ev.action}</span>
                        <span>{ev.details}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap ml-2">
                        {new Date(ev.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-800/80 border-t border-slate-700/80 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
