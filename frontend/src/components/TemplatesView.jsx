import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, Layers, DollarSign, FileCheck } from 'lucide-react';

export default function TemplatesView({ templates, standardClauses, onUseTemplate }) {
  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/20 rounded-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>MNC Legal Standards Library</span>
          </div>
          <h3 className="text-xl font-bold text-white">Pre-Approved Influencer Contract Frameworks</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Battle-tested by multinational brands. Built with strict FTC disclosure rules, bounded paid-media whitelisting terms, and automated escrow milestones.
          </p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates?.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {tpl.category}
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  Base: ${tpl.default_compensation?.toLocaleString()}
                </span>
              </div>

              <h4 className="text-base font-bold text-white">{tpl.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{tpl.description}</p>

              {/* Deliverables summary */}
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-300 flex items-center space-x-1">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  <span>Standard Deliverables:</span>
                </div>
                <div className="space-y-1">
                  {tpl.default_deliverables?.map((d, i) => (
                    <div key={i} className="text-[11px] text-slate-400 flex items-center justify-between">
                      <span className="truncate">{d.title}</span>
                      <span className="uppercase text-[9px] px-1 bg-slate-800 text-slate-300 rounded ml-1">
                        {d.platform}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800">
              <button
                onClick={() => onUseTemplate(tpl)}
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md transition-colors cursor-pointer"
              >
                <span>Deploy Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Standard Legal Clauses Library */}
      <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Core Regulatory & Protection Clauses</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {standardClauses?.map((clause) => (
            <div key={clause.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{clause.title}</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 bg-emerald-500/10 text-emerald-300 rounded font-semibold">
                  Required
                </span>
              </div>
              <p className="text-xs text-sky-300 font-medium">
                Plain English: {clause.summary}
              </p>
              <p className="text-[11px] text-slate-400 font-serif line-clamp-2">
                {clause.content}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
