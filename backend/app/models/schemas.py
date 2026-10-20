from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class Deliverable(BaseModel):
    id: str
    title: str
    platform: str  # instagram, tiktok, youtube, twitter, linkedin
    format: str  # Reel, Story, Dedicated Video, Short, Post
    specs: str
    due_date: str
    status: str = "pending"  # pending, submitted, in_review, revision_requested, approved
    submission_url: Optional[str] = None
    submission_notes: Optional[str] = None
    feedback: Optional[str] = None
    metrics: Optional[Dict[str, Any]] = None

class Milestone(BaseModel):
    id: str
    name: str
    amount: float
    percentage: float
    status: str = "pending"  # pending, in_escrow, released
    due_trigger: str
    released_at: Optional[str] = None

class SignatureInfo(BaseModel):
    signed: bool = False
    signer_name: Optional[str] = None
    signer_title: Optional[str] = None
    signature_data: Optional[str] = None  # Data URL / Base64 image
    signature_type: Optional[str] = "drawn"  # drawn, typed
    timestamp: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class AuditLogEvent(BaseModel):
    id: str
    timestamp: str
    actor_name: str
    actor_role: str  # Brand Manager, Influencer Talent, System, Escrow
    action: str
    details: str
    hash: Optional[str] = None

class Clause(BaseModel):
    id: str
    key: str
    title: str
    summary: str  # Plain English explanation
    content: str  # Legalese
    risk_level: str = "standard"  # low, standard, warning
    is_mandatory: bool = True

class Contract(BaseModel):
    id: str
    contract_number: str
    title: str
    campaign_name: str
    brand_name: str
    brand_contact: str
    brand_email: str
    brand_logo: Optional[str] = None
    creator_name: str
    creator_handle: str
    creator_email: str
    creator_avatar: Optional[str] = None
    category: str
    status: str = "draft"  # draft, sent_for_review, pending_creator_sign, pending_brand_sign, active, completed, terminated
    total_compensation: float
    currency: str = "USD"
    start_date: str
    end_date: str
    created_at: str
    updated_at: str
    contract_hash: Optional[str] = None
    clauses: List[Clause] = []
    deliverables: List[Deliverable] = []
    milestones: List[Milestone] = []
    creator_signature: SignatureInfo = Field(default_factory=SignatureInfo)
    brand_signature: SignatureInfo = Field(default_factory=SignatureInfo)
    audit_trail: List[AuditLogEvent] = []

class ContractCreateRequest(BaseModel):
    title: str
    campaign_name: str
    brand_name: str
    brand_contact: str
    brand_email: str
    creator_name: str
    creator_handle: str
    creator_email: str
    category: str
    total_compensation: float
    currency: str = "USD"
    start_date: str
    end_date: str
    deliverables: List[Deliverable]
    milestones: List[Milestone]
    clauses: List[Clause]

class SignContractRequest(BaseModel):
    signer_name: str
    signer_role: str  # creator or brand
    signer_title: Optional[str] = None
    signature_data: str
    signature_type: str = "drawn"  # drawn or typed
    agreement_confirmed: bool

class SubmitDeliverableRequest(BaseModel):
    submission_url: str
    submission_notes: Optional[str] = ""

class ReviewDeliverableRequest(BaseModel):
    action: str  # approve, revision_requested
    feedback: Optional[str] = ""

class ReleaseMilestoneRequest(BaseModel):
    milestone_id: str
    note: Optional[str] = ""
