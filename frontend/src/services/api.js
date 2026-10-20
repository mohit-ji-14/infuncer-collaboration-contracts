const API_BASE = '/api';

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async getContracts(params = {}) {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'all') query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    const res = await fetch(`${API_BASE}/contracts?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch contracts');
    return res.json();
  },

  async getContract(id) {
    const res = await fetch(`${API_BASE}/contracts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch contract');
    return res.json();
  },

  async createContract(payload) {
    const res = await fetch(`${API_BASE}/contracts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create contract');
    return res.json();
  },

  async signContract(id, payload) {
    const res = await fetch(`${API_BASE}/contracts/${id}/sign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to sign contract');
    return res.json();
  },

  async submitDeliverable(contractId, delivId, payload) {
    const res = await fetch(`${API_BASE}/contracts/${contractId}/deliverables/${delivId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to submit deliverable');
    return res.json();
  },

  async reviewDeliverable(contractId, delivId, payload) {
    const res = await fetch(`${API_BASE}/contracts/${contractId}/deliverables/${delivId}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to review deliverable');
    return res.json();
  },

  async releaseMilestone(contractId, milestoneId) {
    const res = await fetch(`${API_BASE}/contracts/${contractId}/milestones/${milestoneId}/release`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error('Failed to release milestone');
    return res.json();
  },

  async getTemplates() {
    const res = await fetch(`${API_BASE}/templates`);
    if (!res.ok) throw new Error('Failed to fetch templates');
    return res.json();
  },

  async getClauses() {
    const res = await fetch(`${API_BASE}/clauses`);
    if (!res.ok) throw new Error('Failed to fetch clauses');
    return res.json();
  },

  async getCertificate(id) {
    const res = await fetch(`${API_BASE}/contracts/${id}/certificate`);
    if (!res.ok) throw new Error('Failed to fetch certificate');
    return res.json();
  },

  async getAnalytics() {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    return res.json();
  },

  getPdfUrl(id) {
    return `${API_BASE}/contracts/${id}/pdf`;
  }
};
