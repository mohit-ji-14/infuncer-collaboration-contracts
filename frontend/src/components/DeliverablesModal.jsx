import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Link as LinkIcon, Send, RefreshCw, DollarSign, ExternalLink } from 'lucide-react';

export default function DeliverablesModal({ 
  isOpen, 
  onClose, 
  contract, 
  role, 
  onSubmitDeliverable, 
  onReviewDeliverable,
  onReleaseMilestone
}) {
  const [selectedDelivId, setSelectedDelivId] = useState(contract?.deliverables?.[0]?.id || '');
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [brandFeedback, setBrandFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !contract) return null;

  const currentDeliv = contract.deliverables?.find(d => d.id === selectedDelivId) || contract.deliverables?.[0];

  const handleCreatorSubmit = async (e) => {
    e.preventDefault();
    if (!submissionUrl.trim()) {
      setErrorMsg('Please enter a live link or draft preview URL.');
      return;
    }
    try {
      setSubmitting(true);
      setErrorMsg('');
      await onSubmitDeliverable(contract.id, currentDeliv.id, {
        submission_url: submissionUrl,
        submission_notes: submissionNotes
      });
      setSubmissionUrl('');
      setSubmissionNotes('');
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit deliverable');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBrandReview = async (action) => {
    try {
      setSubmitting(true);
      setErrorMsg('');
      await onReviewDeliverable(contract.id, currentDeliv.id, {
        action,
        feedback: brandFeedback || (action === 'approve' ? 'Approved by Brand Team' : 'Revisions requested')
      });
      setBrandFeedback('');
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update review status');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRelease = async (milestoneId) => {
    try {
      setSubmitting(true);
      await onReleaseMilestone(contract.id, milestoneId);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to release milestone');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Deliverables & Escrow Manager</h3>
              <p className="text-xs text-slate-400">
                {contract.title} • {contract.contract_number}
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

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          {/* Deliverables Selector Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Select Deliverable</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {contract.deliverables?.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDelivId(d.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    currentDeliv?.id === d.id
                      ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-sm'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{d.platform}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                      d.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300' :
                      d.status === 'submitted' ? 'bg-sky-500/20 text-sky-300' :
                      d.status === 'revision_requested' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {d.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-xs font-semibold truncate text-slate-200">{d.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Due: {d.due_date}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Deliverable Details */}
          {currentDeliv && (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{currentDeliv.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{currentDeliv.specs}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase">Deadline</div>
                  <div className="text-xs font-medium text-slate-300">{currentDeliv.due_date}</div>
                </div>
              </div>

              {/* Existing Submission Info */}
              {currentDeliv.submission_url && (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Submitted Content Link:</span>
                    <a
                      href={currentDeliv.submission_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-sky-400 hover:underline"
                    >
                      <LinkIcon className="w-3.5 h-3.5" />
                      <span>{currentDeliv.submission_url}</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </a>
                  </div>
                  {currentDeliv.submission_notes && (
                    <p className="text-xs text-slate-400 bg-slate-950 p-2 rounded">
                      <span className="font-semibold text-slate-300">Creator Note: </span>
                      {currentDeliv.submission_notes}
                    </p>
                  )}
                  {currentDeliv.feedback && (
                    <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 p-2 rounded">
                      <span className="font-semibold">Brand Feedback: </span>
                      {currentDeliv.feedback}
                    </div>
                  )}
                  {currentDeliv.metrics && (
                    <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-800 text-center">
                      <div className="bg-slate-950 p-1.5 rounded">
                        <div className="text-[10px] text-slate-500">Views</div>
                        <div className="text-xs font-bold text-indigo-400">{currentDeliv.metrics.views?.toLocaleString()}</div>
                      </div>
                      <div className="bg-slate-950 p-1.5 rounded">
                        <div className="text-[10px] text-slate-500">Likes</div>
                        <div className="text-xs font-bold text-pink-400">{currentDeliv.metrics.likes?.toLocaleString()}</div>
                      </div>
                      <div className="bg-slate-950 p-1.5 rounded">
                        <div className="text-[10px] text-slate-500">Shares</div>
                        <div className="text-xs font-bold text-emerald-400">{currentDeliv.metrics.shares?.toLocaleString()}</div>
                      </div>
                      <div className="bg-slate-950 p-1.5 rounded">
                        <div className="text-[10px] text-slate-500">Comments</div>
                        <div className="text-xs font-bold text-sky-400">{currentDeliv.metrics.comments?.toLocaleString()}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Panels depending on role */}
              {role === 'creator' ? (
                <form onSubmit={handleCreatorSubmit} className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="text-xs font-semibold text-pink-400 flex items-center space-x-1.5">
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Proof / Draft URL for Review</span>
                  </div>
                  <div>
                    <input
                      type="url"
                      placeholder="https://instagram.com/p/... or Drive / Dropbox URL"
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Notes for brand team (timestamps, caption draft, discount code check)..."
                      value={submissionNotes}
                      onChange={(e) => setSubmissionNotes(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Upload & Submit for Brand Approval'}
                  </button>
                </form>
              ) : (
                <div className="space-y-3 pt-2 border-t border-slate-800">
                  <div className="text-xs font-semibold text-indigo-400 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Brand Review & Quality Signoff</span>
                  </div>
                  <div>
                    <textarea
                      placeholder="Feedback notes for creator or specific revision timestamps..."
                      value={brandFeedback}
                      onChange={(e) => setBrandFeedback(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleBrandReview('revision_requested')}
                      disabled={submitting}
                      className="py-2 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                    >
                      Request Revisions
                    </button>
                    <button
                      type="button"
                      onClick={() => handleBrandReview('approve')}
                      disabled={submitting}
                      className="py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      Approve Deliverable
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Payment Milestones & Escrow Section */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Milestone Escrow Payouts</span>
            </h4>
            <div className="space-y-2">
              {contract.milestones?.map((m) => (
                <div key={m.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{m.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                        m.status === 'released' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        m.status === 'in_escrow' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {m.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{m.due_trigger}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-xs font-bold text-emerald-400">${m.amount?.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500">{m.percentage}% of contract</div>
                    </div>
                    {role === 'brand' && m.status === 'in_escrow' && (
                      <button
                        onClick={() => handleRelease(m.id)}
                        disabled={submitting}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        Release Escrow
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
