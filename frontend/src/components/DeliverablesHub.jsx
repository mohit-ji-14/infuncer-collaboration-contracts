import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  ExternalLink, 
  Layers, 
  Filter,
  DollarSign
} from 'lucide-react';

export default function DeliverablesHub({ contracts, role, onOpenDeliverables }) {
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Flatten deliverables with contract context
  const allDeliverables = [];
  contracts.forEach(contract => {
    (contract.deliverables || []).forEach(d => {
      allDeliverables.push({
        ...d,
        contractId: contract.id,
        contractTitle: contract.title,
        contractNumber: contract.contract_number,
        brandName: contract.brand_name,
        creatorName: contract.creator_name,
        creatorHandle: contract.creator_handle,
        contractObj: contract
      });
    });
  });

  const filtered = allDeliverables.filter(item => {
    if (filterPlatform !== 'all' && item.platform !== filterPlatform) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            <span>Deliverables & Milestone Fulfillment Hub</span>
          </h3>
          <p className="text-xs text-slate-400">
            Track proof submissions, review brand approvals, and trigger automated escrow releases.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center space-x-2 text-xs">
          <select
            value={filterPlatform}
            onChange={(e) => setFilterPlatform(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
          >
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
            <option value="twitch">Twitch</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="revision_requested">Revision Requested</option>
          </select>
        </div>
      </div>

      {/* Deliverables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-md flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {item.platform}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  item.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300' :
                  item.status === 'submitted' ? 'bg-sky-500/20 text-sky-300' :
                  item.status === 'revision_requested' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-slate-800 text-slate-400'
                }`}>
                  {item.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{item.specs}</p>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Contract:</span>
                  <span className="text-slate-200 font-medium truncate max-w-[140px]">{item.contractTitle}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Partner:</span>
                  <span className="text-pink-400">{item.creatorHandle}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Due Date:</span>
                  <span className="text-slate-300">{item.due_date}</span>
                </div>
              </div>

              {item.submission_url && (
                <div className="text-xs text-sky-400 truncate flex items-center space-x-1">
                  <span>Proof:</span>
                  <a
                    href={item.submission_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline truncate"
                  >
                    {item.submission_url}
                  </a>
                </div>
              )}
            </div>

            <button
              onClick={() => onOpenDeliverables(item.contractObj)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors cursor-pointer"
            >
              {role === 'creator' ? 'Submit / Update Proof' : 'Review & Signoff'}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
