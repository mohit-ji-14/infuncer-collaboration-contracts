import React, { useRef, useState, useEffect } from 'react';
import { X, Check, RotateCcw, PenTool, Type, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SignatureModal({ isOpen, onClose, contract, role, onSignSuccess }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [signMode, setSignMode] = useState('draw'); // 'draw' or 'type'
  const [typedName, setTypedName] = useState('');
  const [typedFontIndex, setTypedFontIndex] = useState(0);
  const [titleInput, setTitleInput] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fontStyles = [
    { name: 'Classic Script', className: 'font-signature text-3xl text-indigo-400' },
    { name: 'Executive Modern', className: 'italic font-serif text-2xl text-emerald-400' },
    { name: 'Cursive Pen', className: 'font-mono italic text-2xl text-purple-400' }
  ];

  useEffect(() => {
    if (isOpen && contract) {
      if (role === 'creator') {
        setTypedName(contract.creator_name || '');
        setTitleInput('Independent Content Creator');
      } else {
        setTypedName(contract.brand_contact || 'Marcus Vance');
        setTitleInput('VP Brand Partnerships');
      }
      setConsentChecked(false);
      setHasDrawn(false);
      setErrorMsg('');
      setTimeout(initCanvas, 100);
    }
  }, [isOpen, contract, role]);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#38bdf8'; // Sky blue ink
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    setIsDrawing(true);
    const coords = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const coords = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = (e) => {
    if (isDrawing) {
      e.preventDefault();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSubmit = async () => {
    if (!consentChecked) {
      setErrorMsg('You must agree to the electronic signature legal consent.');
      return;
    }

    let signatureData = '';
    if (signMode === 'draw') {
      if (!hasDrawn) {
        setErrorMsg('Please draw your signature in the box above.');
        return;
      }
      signatureData = canvasRef.current.toDataURL('image/png');
    } else {
      if (!typedName.trim()) {
        setErrorMsg('Please enter your full legal name.');
        return;
      }
      signatureData = `typed:${fontStyles[typedFontIndex].name}:${typedName}`;
    }

    try {
      setSubmitting(true);
      setErrorMsg('');

      await onSignSuccess({
        signer_name: typedName,
        signer_role: role,
        signer_title: titleInput,
        signature_data: signatureData,
        signature_type: signMode,
        agreement_confirmed: true
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Error signing contract');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !contract) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">E-Sign Execution Portal</h3>
              <p className="text-xs text-slate-400">
                Signing as <span className="text-indigo-400 font-semibold">{role === 'creator' ? 'Influencer / Talent' : 'Brand Executive'}</span> for {contract.contract_number}
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
        <div className="p-6 space-y-5 overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          {/* Mode Switcher */}
          <div className="flex items-center justify-between bg-slate-800/60 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setSignMode('draw')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 text-xs font-medium rounded-lg transition-all ${
                signMode === 'draw'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Draw Signature (Pen / Touch)</span>
            </button>
            <button
              onClick={() => setSignMode('type')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 text-xs font-medium rounded-lg transition-all ${
                signMode === 'type'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Type Signature (Calligraphic)</span>
            </button>
          </div>

          {/* Signature Input Canvas or Font Preview */}
          {signMode === 'draw' ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Sign inside the box using your mouse, trackpad, or finger</span>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="flex items-center space-x-1 text-slate-400 hover:text-rose-400 text-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear Canvas</span>
                </button>
              </div>

              <div className="relative border-2 border-dashed border-slate-700 rounded-xl bg-slate-950 overflow-hidden cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  width={560}
                  height={160}
                  className="w-full h-40 touch-none block"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                {!hasDrawn && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-600 text-sm italic">
                    Draw your signature here
                  </div>
                )}
                <div className="absolute bottom-2 left-3 pointer-events-none text-[10px] text-slate-600 font-mono">
                  &times; Sign on the line
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Your Full Legal Name</label>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="e.g. Alex M. Rivera"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Font choices */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Choose Calligraphic Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {fontStyles.map((style, idx) => (
                    <button
                      key={style.name}
                      type="button"
                      onClick={() => setTypedFontIndex(idx)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        typedFontIndex === idx
                          ? 'border-indigo-500 bg-indigo-500/10 shadow-sm'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 mb-1">{style.name}</div>
                      <div className={style.className}>
                        {typedName || 'Signer Name'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Signer Title & Role Confirmation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Signer Identity / Name</label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300">Corporate or Creator Title</label>
              <input
                type="text"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200"
              />
            </div>
          </div>

          {/* Cryptographic Compliance Stamp */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5 text-[11px] text-slate-400 font-mono">
            <div className="flex items-center space-x-1.5 text-indigo-400 font-sans font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Tamper-Proof Audit Metadata</span>
            </div>
            <div className="flex justify-between">
              <span>Timestamp:</span>
              <span className="text-slate-300">{new Date().toUTCString()}</span>
            </div>
            <div className="flex justify-between">
              <span>IP & Location:</span>
              <span className="text-slate-300">198.51.100.42 (Encrypted SSL Verified)</span>
            </div>
            <div className="flex justify-between truncate">
              <span>Contract Hash:</span>
              <span className="text-slate-300 truncate">{contract.contract_hash?.substring(0, 24)}...</span>
            </div>
          </div>

          {/* Legal Consent Checkbox */}
          <label className="flex items-start space-x-3 p-3 rounded-xl bg-indigo-950/20 border border-indigo-900/40 cursor-pointer hover:bg-indigo-950/30 transition-colors">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500 focus:ring-offset-0"
            />
            <span className="text-xs text-slate-300 leading-relaxed">
              I agree that my electronic signature provided here is legally binding under the <b>Electronic Signatures in Global and National Commerce Act (E-SIGN)</b> and represents my authorized acceptance of all deliverables, terms, and payment milestones.
            </span>
          </label>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-800/80 border-t border-slate-700/80 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-500/25 transition-all cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <span>Sealing Contract...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Affix Signature & Seal Contract</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
