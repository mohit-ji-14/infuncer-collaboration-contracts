import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  DollarSign, 
  Layers, 
  Calendar 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContractWizardModal({ 
  isOpen, 
  onClose, 
  templates, 
  standardClauses, 
  onCreateContract 
}) {
  const [step, setStep] = useState(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState('tpl-tier1-social');

  // Form states
  const [title, setTitle] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [brandName, setBrandName] = useState('Nike Global Partnerships');
  const [brandContact, setBrandContact] = useState('Marcus Vance');
  const [brandEmail, setBrandEmail] = useState('marcus.vance@nike.com');
  const [creatorName, setCreatorName] = useState('');
  const [creatorHandle, setCreatorHandle] = useState('');
  const [creatorEmail, setCreatorEmail] = useState('');
  const [category, setCategory] = useState('Athletics & Footwear');
  const [totalCompensation, setTotalCompensation] = useState(12500);
  const [currency, setCurrency] = useState('USD');
  const [startDate, setStartDate] = useState('2026-11-01');
  const [endDate, setEndDate] = useState('2026-12-15');

  // Deliverables & Milestones
  const [deliverables, setDeliverables] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [clauses, setClauses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load defaults on open or template change
  useEffect(() => {
    if (templates && templates.length > 0) {
      const tpl = templates.find(t => t.id === selectedTemplateId) || templates[0];
      if (tpl) {
        setTitle(tpl.name);
        setCampaignName(tpl.category);
        setTotalCompensation(tpl.default_compensation || 10000);
        setDeliverables(JSON.parse(JSON.stringify(tpl.default_deliverables || [])));
        setMilestones(JSON.parse(JSON.stringify(tpl.default_milestones || [])));
      }
    }
    if (standardClauses) {
      setClauses(JSON.parse(JSON.stringify(standardClauses)));
    }
  }, [selectedTemplateId, templates, standardClauses, isOpen]);

  const handleTemplateSelect = (tplId) => {
    setSelectedTemplateId(tplId);
    const tpl = templates.find(t => t.id === tplId);
    if (tpl) {
      setTitle(tpl.name);
      setCampaignName(tpl.category);
      setTotalCompensation(tpl.default_compensation || 10000);
      setDeliverables(JSON.parse(JSON.stringify(tpl.default_deliverables || [])));
      setMilestones(JSON.parse(JSON.stringify(tpl.default_milestones || [])));
    }
  };

  const addDeliverable = () => {
    const newId = `del-${Date.now()}`;
    setDeliverables([
      ...deliverables,
      {
        id: newId,
        title: 'New Promotional Content',
        platform: 'instagram',
        format: 'Reel',
        specs: 'Vertical 9:16, tag @brand in caption and link in bio.',
        due_date: '2026-11-20',
        status: 'pending'
      }
    ]);
  };

  const removeDeliverable = (index) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const updateDeliverable = (index, field, value) => {
    const copy = [...deliverables];
    copy[index][field] = value;
    setDeliverables(copy);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !creatorName.trim() || !creatorHandle.trim()) {
      setErrorMsg('Please fill in contract title, creator name, and creator handle.');
      return;
    }
    try {
      setSubmitting(true);
      setErrorMsg('');

      const payload = {
        title,
        campaign_name: campaignName || 'Enterprise Campaign 2026',
        brand_name: brandName,
        brand_contact: brandContact,
        brand_email: brandEmail,
        creator_name: creatorName,
        creator_handle: creatorHandle.startsWith('@') ? creatorHandle : `@${creatorHandle}`,
        creator_email: creatorEmail || 'creator@partner talent.com',
        category,
        total_compensation: parseFloat(totalCompensation),
        currency,
        start_date: startDate,
        end_date: endDate,
        deliverables,
        milestones,
        clauses
      };

      await onCreateContract(payload);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });

      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create contract');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header with Steps */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Smart Contract Studio</h3>
              <p className="text-xs text-slate-400">Step {step} of 4: MNC Legal Builder</p>
            </div>
          </div>

          {/* Stepper indicator */}
          <div className="hidden sm:flex items-center space-x-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400/40'
                    : step > s
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {step > s ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          {/* STEP 1: TEMPLATE & PARTIES */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2">
                  Choose Enterprise Template
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {templates?.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleTemplateSelect(tpl.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        selectedTemplateId === tpl.id
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-sm'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-1">{tpl.name}</div>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{tpl.description}</p>
                      <div className="mt-2 text-xs font-semibold text-indigo-400">
                        Default: ${tpl.default_compensation?.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Contract Agreement Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Next-Gen Velocity Launch Endorsement"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Campaign / Vertical Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Athletics & Footwear">Athletics & Footwear</option>
                    <option value="Beauty & Skincare">Beauty & Skincare</option>
                    <option value="Tech & Consumer Electronics">Tech & Consumer Electronics</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Health & Nutrition">Health & Nutrition</option>
                    <option value="Gaming & Entertainment">Gaming & Entertainment</option>
                  </select>
                </div>
              </div>

              {/* Creator Details */}
              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-pink-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Influencer / Creator Partner</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Full Legal Name *</label>
                    <input
                      type="text"
                      value={creatorName}
                      onChange={(e) => setCreatorName(e.target.value)}
                      placeholder="e.g. Maya Chen"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Social Handle (@...) *</label>
                    <input
                      type="text"
                      value={creatorHandle}
                      onChange={(e) => setCreatorHandle(e.target.value)}
                      placeholder="e.g. @glowwithmaya"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Email Address *</label>
                    <input
                      type="email"
                      value={creatorEmail}
                      onChange={(e) => setCreatorEmail(e.target.value)}
                      placeholder="collabs@creator.com"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                </div>
              </div>

              {/* Campaign Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Campaign Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Campaign End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DELIVERABLES */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Content Deliverables & Scope
                  </h4>
                  <p className="text-xs text-slate-400">Specify requirements, platforms, and draft review deadlines.</p>
                </div>
                <button
                  type="button"
                  onClick={addDeliverable}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 border border-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Deliverable</span>
                </button>
              </div>

              <div className="space-y-3">
                {deliverables.map((d, index) => (
                  <div key={d.id || index} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Deliverable #{index + 1}</span>
                      {deliverables.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDeliverable(index)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={d.title}
                          onChange={(e) => updateDeliverable(index, 'title', e.target.value)}
                          placeholder="e.g. 1x 60s Instagram Reel"
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100"
                        />
                      </div>
                      <div>
                        <select
                          value={d.platform}
                          onChange={(e) => updateDeliverable(index, 'platform', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100"
                        >
                          <option value="instagram">Instagram</option>
                          <option value="tiktok">TikTok</option>
                          <option value="youtube">YouTube</option>
                          <option value="twitch">Twitch</option>
                          <option value="twitter">X / Twitter</option>
                          <option value="linkedin">LinkedIn</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={d.specs}
                          onChange={(e) => updateDeliverable(index, 'specs', e.target.value)}
                          placeholder="Specifications: 9:16 vertical, product in hand, clear CTA"
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300"
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          value={d.due_date}
                          onChange={(e) => updateDeliverable(index, 'due_date', e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: COMPENSATION & ESCROW */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Total Financial Consideration</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Total Contract Value ($)</label>
                    <input
                      type="number"
                      value={totalCompensation}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setTotalCompensation(val);
                        // auto-calculate 40/60
                        if (milestones.length === 2) {
                          const copy = [...milestones];
                          copy[0].amount = Math.round(val * 0.4);
                          copy[1].amount = Math.round(val * 0.6);
                          setMilestones(copy);
                        }
                      }}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400">Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="CAD">CAD ($)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Milestones Escrow Split */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Automated Escrow Milestone Schedule
                </h4>
                {milestones.map((m, idx) => (
                  <div key={m.id || idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{m.name}</div>
                      <div className="text-[11px] text-slate-400">{m.due_trigger}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400 text-sm">
                        ${m.amount?.toLocaleString()} {currency}
                      </div>
                      <div className="text-[10px] text-slate-500">{m.percentage}% of total</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: LEGAL & COMPLIANCE CLAUSES */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  MNC Standard Legal Provisions & Compliance
                </h4>
                <p className="text-xs text-slate-400">
                  Pre-configured compliance clauses aligned with FTC, ASA, and E-SIGN commercial law.
                </p>
              </div>

              <div className="space-y-3">
                {clauses.map((clause, idx) => (
                  <div key={clause.id || idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{clause.title}</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                        Standard Clause
                      </span>
                    </div>
                    <p className="text-xs text-sky-300 font-medium bg-slate-900/60 p-2 rounded">
                      Plain English: {clause.summary}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-serif">
                      {clause.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 bg-slate-800/80 border-t border-slate-700/80 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && (!title.trim() || !creatorName.trim())) {
                  setErrorMsg('Please enter a contract title and creator name.');
                  return;
                }
                setErrorMsg('');
                setStep(step + 1);
              }}
              className="flex items-center space-x-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
            >
              <span>Next: {step === 1 ? 'Deliverables' : step === 2 ? 'Compensation & Escrow' : 'Legal Clauses'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-400 hover:from-indigo-500 hover:to-sky-300 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{submitting ? 'Generating Contract...' : 'Issue & Dispatch Smart Contract'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
