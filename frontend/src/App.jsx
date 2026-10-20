import React, { useState, useEffect } from 'react';
import './App.css';
import LoginView from './components/LoginView';
import Navbar from './components/Navbar';
import ContractList from './components/ContractList';
import ContractDetailModal from './components/ContractDetailModal';
import SignatureModal from './components/SignatureModal';
import AuditCertificateModal from './components/AuditCertificateModal';
import DeliverablesModal from './components/DeliverablesModal';
import ContractWizardModal from './components/ContractWizardModal';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import TemplatesView from './components/TemplatesView';
import DeliverablesHub from './components/DeliverablesHub';
import { api } from './services/api';
import { Building2, Sparkles, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [role, setRole] = useState('brand'); // 'brand' or 'creator'
  const [activeTab, setActiveTab] = useState('contracts'); // 'contracts', 'deliverables', 'templates', 'analytics'
  const [contracts, setContracts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [standardClauses, setStandardClauses] = useState([]);
  const [stats, setStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [sessionUser, setSessionUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('collabsign-preview-user') ||
        sessionStorage.getItem('collabsign-preview-user')
      );
    } catch {
      return null;
    }
  });

  // Modals state
  const [selectedContract, setSelectedContract] = useState(null);
  const [signContractTarget, setSignContractTarget] = useState(null);
  const [deliverablesTarget, setDeliverablesTarget] = useState(null);
  const [certificateTarget, setCertificateTarget] = useState(null);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Fetch initial data
  const loadData = async () => {
    try {
      setLoading(true);
      const [contractsData, templatesData, clausesData, analyticsData] = await Promise.all([
        api.getContracts({ status: statusFilter, search: searchQuery }),
        api.getTemplates(),
        api.getClauses(),
        api.getAnalytics()
      ]);
      setContracts(contractsData);
      setTemplates(templatesData);
      setStandardClauses(clausesData);
      setStats(analyticsData);

      // Refresh selected modal contracts if any open
      if (selectedContract) {
        const updated = contractsData.find(c => c.id === selectedContract.id);
        if (updated) setSelectedContract(updated);
      }
      if (deliverablesTarget) {
        const updated = contractsData.find(c => c.id === deliverablesTarget.id);
        if (updated) setDeliverablesTarget(updated);
      }
    } catch (err) {
      console.error('Failed to load platform data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionUser) loadData();
  }, [statusFilter, searchQuery, sessionUser]);

  const handleSignIn = (user) => {
    const storage = user.rememberMe ? localStorage : sessionStorage;
    storage.setItem('collabsign-preview-user', JSON.stringify(user));
    setSessionUser(user);
  };

  const handleSignOut = () => {
    localStorage.removeItem('collabsign-preview-user');
    sessionStorage.removeItem('collabsign-preview-user');
    setSessionUser(null);
  };

  // Handlers
  const handleSignContract = async (payload) => {
    if (!signContractTarget) return;
    await api.signContract(signContractTarget.id, payload);
    await loadData();
  };

  const handleSubmitDeliverable = async (contractId, delivId, payload) => {
    await api.submitDeliverable(contractId, delivId, payload);
    await loadData();
  };

  const handleReviewDeliverable = async (contractId, delivId, payload) => {
    await api.reviewDeliverable(contractId, delivId, payload);
    await loadData();
  };

  const handleReleaseMilestone = async (contractId, milestoneId) => {
    await api.releaseMilestone(contractId, milestoneId);
    await loadData();
  };

  const handleCreateContract = async (payload) => {
    await api.createContract(payload);
    await loadData();
    setActiveTab('contracts');
  };

  const handleUseTemplate = (tpl) => {
    setIsWizardOpen(true);
  };

  if (!sessionUser) {
    return <LoginView onSignIn={handleSignIn} />;
  }

  return (
    <div className="workspace-shell min-h-screen flex flex-col">
      
      {/* Top Navigation */}
      <Navbar
        role={role}
        setRole={setRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewContract={() => setIsWizardOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        stats={stats}
        sessionUser={sessionUser}
        onSignOut={handleSignOut}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Persona Context Banner */}
        <div className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
          role === 'brand'
            ? 'bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border-indigo-500/30'
            : 'bg-gradient-to-r from-pink-950/60 via-slate-900 to-slate-900 border-pink-500/30'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              role === 'brand' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40' : 'bg-pink-600/20 text-pink-400 border border-pink-500/40'
            }`}>
              {role === 'brand' ? <Building2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active Workspace Role:
                </span>
                <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  role === 'brand' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                }`}>
                  {role === 'brand' ? 'Brand / Enterprise Agency' : 'Influencer & Creator Talent'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {role === 'brand'
                  ? 'Viewing as Marcus Vance (VP Brand Partnerships). You have authorization to create contracts, review proofs, and release milestone funds.'
                  : 'Viewing as Alex Rivera / Maya Chen. You can review plain-English clauses, e-sign contracts, and submit proof of deliverables.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setRole(role === 'brand' ? 'creator' : 'brand')}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Switch to {role === 'brand' ? 'Creator Portal' : 'Brand Portal'}
            </button>
          </div>
        </div>

        {/* Tab 1: Contracts Hub */}
        {activeTab === 'contracts' && (
          <ContractList
            contracts={contracts}
            role={role}
            onSelectContract={(c) => setSelectedContract(c)}
            onOpenSign={(c) => setSignContractTarget(c)}
            onOpenDeliverables={(c) => setDeliverablesTarget(c)}
            onOpenCertificate={(c) => setCertificateTarget(c)}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}

        {/* Tab 2: Deliverables & Proofs */}
        {activeTab === 'deliverables' && (
          <DeliverablesHub
            contracts={contracts}
            role={role}
            onOpenDeliverables={(c) => setDeliverablesTarget(c)}
          />
        )}

        {/* Tab 3: MNC Legal Templates */}
        {activeTab === 'templates' && (
          <TemplatesView
            templates={templates}
            standardClauses={standardClauses}
            onUseTemplate={handleUseTemplate}
          />
        )}

        {/* Tab 4: Executive Analytics & Escrow */}
        {activeTab === 'analytics' && (
          <AnalyticsDashboard
            stats={stats}
            contracts={contracts}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>CollabSign Enterprise CLM &bull; Compliant with U.S. E-SIGN Act & FTC Endorsement Guides</span>
          </div>
          <div>
            <span>Engineered for Multinational Creator Partnerships &bull; Python & React</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ContractDetailModal
        isOpen={!!selectedContract}
        onClose={() => setSelectedContract(null)}
        contract={selectedContract}
        role={role}
        onOpenSign={(c) => {
          setSelectedContract(null);
          setSignContractTarget(c);
        }}
        onOpenDeliverables={(c) => {
          setSelectedContract(null);
          setDeliverablesTarget(c);
        }}
        onOpenCertificate={(c) => {
          setSelectedContract(null);
          setCertificateTarget(c);
        }}
      />

      <SignatureModal
        isOpen={!!signContractTarget}
        onClose={() => setSignContractTarget(null)}
        contract={signContractTarget}
        role={role}
        onSignSuccess={handleSignContract}
      />

      <DeliverablesModal
        isOpen={!!deliverablesTarget}
        onClose={() => setDeliverablesTarget(null)}
        contract={deliverablesTarget}
        role={role}
        onSubmitDeliverable={handleSubmitDeliverable}
        onReviewDeliverable={handleReviewDeliverable}
        onReleaseMilestone={handleReleaseMilestone}
      />

      <AuditCertificateModal
        isOpen={!!certificateTarget}
        onClose={() => setCertificateTarget(null)}
        contract={certificateTarget}
      />

      <ContractWizardModal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        templates={templates}
        standardClauses={standardClauses}
        onCreateContract={handleCreateContract}
      />

    </div>
  );
}
