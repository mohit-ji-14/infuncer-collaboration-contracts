import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  PenTool, 
  ShieldCheck, 
  Download, 
  Layers, 
  DollarSign, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  Building2
} from 'lucide-react';
import { api } from '../services/api';

export default function ContractList({ 
  contracts, 
  role, 
  onSelectContract, 
  onOpenSign, 
  onOpenDeliverables, 
  onOpenCertificate,
  statusFilter,
  setStatusFilter
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Athletics & Footwear', 'Beauty & Skincare', 'Tech & Consumer Electronics', 'High-Impact Product Launch'];

  const filteredContracts = contracts.filter(c => {
    if (selectedCategory !== 'All' && c.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Active & Executed
          </span>
        );
      case 'pending_creator_sign':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3 mr-1" /> Pending Creator Sign
          </span>
        );
      case 'pending_brand_sign':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3 mr-1" /> Pending Brand Sign
          </span>
        );
      case 'sent_for_review':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
            <Clock className="w-3 h-3 mr-1" /> In Review / Negotiation
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Completed & Paid
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-5">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Contracts' },
            { id: 'active', label: 'Active (Executed)' },
            { id: 'pending_creator_sign', label: 'Needs Creator Sign' },
            { id: 'completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 text-xs overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-indigo-400 border border-slate-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Contract Cards Grid */}
      {filteredContracts.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800/80 space-y-3">
          <FileText className="w-10 h-10 text-slate-600 mx-auto" />
          <h4 className="text-sm font-semibold text-slate-300">No contracts found</h4>
          <p className="text-xs text-slate-500">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredContracts.map((contract) => {
            const approvedCount = contract.deliverables?.filter(d => d.status === 'approved').length || 0;
            const totalDeliv = contract.deliverables?.length || 1;
            const delivProgress = Math.round((approvedCount / totalDeliv) * 100);

            const isPendingSign = role === 'creator'
              ? !contract.creator_signature?.signed
              : !contract.brand_signature?.signed;

            return (
              <div
                key={contract.id}
                className="group relative bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Brand & Influencer Avatars + Status */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center space-x-3">
                      {/* Avatar combo */}
                      <div className="relative flex -space-x-2">
                        <img
                          src={contract.brand_logo || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'}
                          alt={contract.brand_name}
                          className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-900 bg-slate-800"
                        />
                        <img
                          src={contract.creator_avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                          alt={contract.creator_name}
                          className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-900 bg-slate-800"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center space-x-1">
                          <span>{contract.brand_name}</span>
                          <span className="text-slate-500">&times;</span>
                          <span className="text-pink-400">{contract.creator_handle}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {contract.contract_number} &bull; {contract.category}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(contract.status)}
                  </div>

                  {/* Contract Title */}
                  <h4 
                    onClick={() => onSelectContract(contract)}
                    className="text-sm font-bold text-slate-100 group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
                  >
                    {contract.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                    Campaign: {contract.campaign_name}
                  </p>

                  {/* Metrics & Deliverables progress */}
                  <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 text-slate-400">
                        <Layers className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Deliverables Progress</span>
                      </div>
                      <span className="font-semibold text-slate-300">{approvedCount} of {totalDeliv} approved</span>
                    </div>

                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${delivProgress}%` }}
                      />
                    </div>

                    {/* Platform icons list */}
                    <div className="flex items-center space-x-1.5 pt-1">
                      {contract.deliverables?.map((d, i) => (
                        <span
                          key={i}
                          className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-semibold ${
                            d.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300' :
                            d.status === 'submitted' ? 'bg-sky-500/20 text-sky-300' :
                            'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {d.platform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Consideration & Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Contract Value</span>
                    <span className="text-sm font-extrabold text-emerald-400">
                      ${contract.total_compensation?.toLocaleString()} {contract.currency}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* E-Sign quick action */}
                    {isPendingSign && (
                      <button
                        onClick={() => onOpenSign(contract)}
                        className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                      >
                        <PenTool className="w-3.5 h-3.5" />
                        <span>E-Sign</span>
                      </button>
                    )}

                    <button
                      onClick={() => onSelectContract(contract)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-colors cursor-pointer"
                    >
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
