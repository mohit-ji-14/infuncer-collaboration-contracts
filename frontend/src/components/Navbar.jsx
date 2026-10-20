import React, { useState } from 'react';
import { 
  FileSignature, 
  Building2, 
  Sparkles, 
  PlusCircle, 
  LayoutDashboard, 
  FileText, 
  CheckCircle2, 
  Search,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';

export default function Navbar({ 
  role, 
  setRole, 
  activeTab, 
  setActiveTab, 
  onNewContract, 
  searchQuery, 
  setSearchQuery,
  stats,
  sessionUser,
  onSignOut
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & MNC Tag */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <FileSignature className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold tracking-tight text-white">CollabSign</span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded uppercase tracking-wider">
                  MNC CLM
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Influencer Contract Lifecycle & E-Sign Engine</p>
            </div>
          </div>

          {/* Persona / Role Switcher */}
          <div className="hidden lg:flex items-center p-1 bg-slate-800/90 border border-slate-700/80 rounded-xl">
            <button
              onClick={() => setRole('brand')}
              className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                role === 'brand'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Brand / Agency Portal</span>
            </button>
            <button
              onClick={() => setRole('creator')}
              className={`flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                role === 'creator'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md shadow-pink-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creator / Influencer Portal</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Global Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search contracts, creators, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-64 pl-9 pr-3 py-1.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {role === 'brand' ? (
              <button
                onClick={onNewContract}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm shadow-indigo-600/40 hover:shadow-indigo-500/50 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Contract</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Talent</span>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2 border-l border-slate-700 pl-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-300">
              {(sessionUser?.name || 'U').slice(0, 1).toUpperCase()}
            </div>
            <span className="max-w-28 truncate text-xs font-medium text-slate-200">{sessionUser?.name}</span>
            <button
              type="button"
              onClick={onSignOut}
              title="Sign out"
              aria-label="Sign out"
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-4 border-t border-slate-800/80 pt-2 pb-2 text-xs font-medium overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('contracts')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'contracts'
                ? 'bg-slate-800 text-indigo-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Contracts Hub</span>
            {stats && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-slate-700 text-slate-300 rounded-full text-[10px]">
                {stats.total_contracts || 0}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('deliverables')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'deliverables'
                ? 'bg-slate-800 text-indigo-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Deliverables & Proofs</span>
            {stats?.deliverables_stats && (
              <span className="ml-1.5 px-1.5 py-0.2 bg-slate-700 text-slate-300 rounded-full text-[10px]">
                {stats.deliverables_stats.approved}/{stats.deliverables_stats.total}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'templates'
                ? 'bg-slate-800 text-indigo-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>MNC Legal Templates</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'analytics'
                ? 'bg-slate-800 text-indigo-400 border border-slate-700 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Executive Analytics & Escrow</span>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-2 border-t border-slate-800 space-y-3 bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-700">
                  {(sessionUser?.name || 'U').slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-slate-200">{sessionUser?.name}</p>
                  <p className="truncate text-[10px] text-slate-500">{sessionUser?.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { onSignOut(); setMobileMenuOpen(false); }}
                className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Active Perspective</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { setRole('brand'); setMobileMenuOpen(false); }}
                  className={`p-2 text-xs rounded-lg text-center font-medium ${
                    role === 'brand' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Brand / Agency
                </button>
                <button
                  onClick={() => { setRole('creator'); setMobileMenuOpen(false); }}
                  className={`p-2 text-xs rounded-lg text-center font-medium ${
                    role === 'creator' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Creator / Talent
                </button>
              </div>
            </div>

            {role === 'brand' && (
              <button
                onClick={() => { onNewContract(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center space-x-1.5 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Create New Contract</span>
              </button>
            )}

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search contracts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200"
              />
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
