import React, { useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, FileCheck2, FileSignature, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginView({ onSignIn }) {
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const enterWorkspace = (address = email, displayName = name) => {
    const fallbackName = address.split('@')[0]?.replace(/[._-]/g, ' ') || 'Workspace user';
    onSignIn({ email: address, name: displayName || fallbackName, rememberMe });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    enterWorkspace();
  };

  return (
    <main className="login-screen">
      <section className="login-showcase" aria-label="CollabSign partnership workspace">
        <div className="login-showcase-top">
          <a className="login-brand" href="#home" aria-label="CollabSign home">
            <span className="login-brand-mark"><FileSignature size={19} /></span>
            <span>collabsign</span>
          </a>
          <span className="login-edition"><Sparkles size={12} /> PARTNERSHIPS, IN SYNC</span>
        </div>

        <div className="showcase-copy">
          <p className="showcase-eyebrow">THE CREATOR PARTNERSHIP WORKSPACE</p>
          <h1>Good work starts with <em>good agreements.</em></h1>
          <p className="showcase-description">Bring briefs, signatures, deliverables, and payouts into one considered place.</p>
        </div>

        <div className="agreement-preview" aria-label="Example signed campaign agreement">
          <div className="preview-topline">
            <span><FileCheck2 size={15} /> CAMPAIGN AGREEMENT</span>
            <span className="preview-status"><span /> SIGNED</span>
          </div>
          <div className="preview-rule" />
          <div className="preview-title">Spring / Summer<br />Creator Partnership</div>
          <div className="preview-parties">
            <div><small>BRAND</small><strong>Northstar Studio</strong></div>
            <div><small>CREATOR</small><strong>Alex Rivera</strong></div>
          </div>
          <div className="preview-bottom">
            <span><ShieldCheck size={14} /> Audit trail complete</span>
            <span>CS-2025-0842</span>
          </div>
          <div className="preview-seal"><Check size={22} /><span>VERIFIED<br />SIGNATURE</span></div>
        </div>

        <div className="showcase-footnote"><LockKeyhole size={13} /> A clear record for every collaboration.</div>
      </section>

      <section className="login-form-panel">
        <div className="login-form-wrap">
          <div className="mobile-login-brand">
            <span className="login-brand-mark"><FileSignature size={18} /></span>
            <span>collabsign</span>
          </div>
          <div className="form-heading">
            <div className="form-kicker">YOUR WORKSPACE, READY</div>
            <h2>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
            <p>{mode === 'signin' ? 'Sign in to keep every partnership moving.' : 'Set up your workspace and bring your team together.'}</p>
          </div>

          <div className="auth-mode-switch" role="tablist" aria-label="Account access">
            <button type="button" role="tab" aria-selected={mode === 'signin'} className={mode === 'signin' ? 'selected' : ''} onClick={() => setMode('signin')}>Sign in</button>
            <button type="button" role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'selected' : ''} onClick={() => setMode('signup')}>Create account</button>
          </div>

          <form className="access-form" onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <label className="field-label">
                Full name
                <input autoComplete="name" type="text" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} required />
              </label>
            )}
            <label className="field-label">
              Work email
              <input autoComplete="email" type="email" placeholder="you@company.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label className="field-label">
              Password
              <span className="password-field">
                <input autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} minLength={mode === 'signup' ? 8 : undefined} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
              {mode === 'signup' && <span className="field-hint">Use at least 8 characters.</span>}
            </label>

            {mode === 'signin' && (
              <label className="remember-option">
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                <span>Keep me signed in on this device</span>
              </label>
            )}

            <button className="submit-access" type="submit">
              {mode === 'signin' ? 'Sign in to workspace' : 'Create account'} <ArrowRight size={17} />
            </button>
          </form>

          <div className="login-divider"><span>OR</span></div>
          <button type="button" className="demo-access" onClick={() => enterWorkspace('marcus@northstar.studio', 'Marcus Vance')}>
            <span className="demo-icon"><Sparkles size={16} /></span>
            <span><strong>Explore the demo workspace</strong><small>Continue as a brand manager</small></span>
            <ArrowRight size={16} />
          </button>

          <p className="preview-notice">Preview access only. Authentication is not connected to a server.</p>
          <div className="login-form-footer"><span>© 2025 CollabSign</span><span><ShieldCheck size={13} /> Built for clear, accountable partnerships</span></div>
        </div>
      </section>
    </main>
  );
}