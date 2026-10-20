import React from 'react';
import { 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Activity,
  Camera,
  Video,
  Share2
} from 'lucide-react';

export default function AnalyticsDashboard({ stats, contracts }) {
  if (!stats) return null;

  return (
    <div className="space-y-6">
      
      {/* Top Level MNC Executive KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Value */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider">Total Contract Pipeline</span>
            <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            ${stats.total_value?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>Across {stats.total_contracts} active enterprise deals</span>
          </div>
        </div>

        {/* Active In-Market */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider">Active Executed Deals</span>
            <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">
            {stats.active_contracts || 0}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Fully signed and in production
          </div>
        </div>

        {/* Pending E-Sign */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider">Pending Signatures</span>
            <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-400">
            {stats.pending_signatures || 0}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Awaiting creator or brand counter-sign
          </div>
        </div>

        {/* Escrow Locked */}
        <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider">Escrow Vault Secured</span>
            <div className="p-1.5 bg-sky-500/10 text-sky-400 rounded-lg border border-sky-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-sky-400">
            ${stats.financial_summary?.escrow_locked?.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Released: ${stats.financial_summary?.escrow_released?.toLocaleString()}
          </div>
        </div>

      </div>

      {/* Middle Section: Platform Breakdown & Fulfillment Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Deliverable Fulfillment Stats */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Deliverable Fulfillment</span>
            </h4>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              {stats.deliverables_stats?.completion_rate}% Approved
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Verified Deliverables:</span>
              <span className="font-semibold text-white">
                {stats.deliverables_stats?.approved} of {stats.deliverables_stats?.total}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${stats.deliverables_stats?.completion_rate}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Avg Brand Review Turnaround:</span>
              <span className="font-medium text-slate-200">18.4 Hours</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span>FTC Compliance Rate:</span>
              <span className="font-medium text-emerald-400">100% Certified</span>
            </div>
          </div>
        </div>

        {/* Platform Share */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <Share2 className="w-4 h-4 text-pink-400" />
            <span>Platform Content Allocation</span>
          </h4>

          <div className="space-y-3">
            {Object.entries(stats.platform_distribution || {}).map(([platform, count]) => {
              const total = stats.deliverables_stats?.total || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={platform} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="capitalize font-semibold text-slate-300">{platform}</span>
                    <span className="text-slate-400">{count} items ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compliance & Security Guard */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>MNC Legal Governance</span>
          </h4>

          <div className="space-y-2.5 text-xs">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1" />
              <div>
                <span className="font-bold text-slate-200 block">E-SIGN Act Compliant</span>
                <span className="text-slate-400 text-[11px]">All electronic signatures backed by SHA-256 tamper logs.</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1" />
              <div>
                <span className="font-bold text-slate-200 block">FTC Endorsement Guides</span>
                <span className="text-slate-400 text-[11px]">Clear disclosure clauses enforce #ad and sponsored tags.</span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-start space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1" />
              <div>
                <span className="font-bold text-slate-200 block">Whitelisting Media Rights</span>
                <span className="text-slate-400 text-[11px]">Strict 60-90 day ad amplification limits prevent perpetual exploitation.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section: Recent Immutable Audit Activity Feed */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center space-x-2">
            <Activity className="w-4 h-4 text-sky-400" />
            <span>Real-Time CLM Security Audit Feed</span>
          </h4>
          <span className="text-xs text-slate-400 font-mono">Live Immutable Stream</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {stats.recent_activity?.map((act, idx) => (
            <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">{act.action}</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {new Date(act.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-slate-400 text-[11px]">{act.details}</p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono">
                <span>By: {act.actor_name} ({act.actor_role})</span>
                <span className="text-indigo-400">{act.contract_number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
