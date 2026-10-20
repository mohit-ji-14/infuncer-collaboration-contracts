import hashlib
import json
from datetime import datetime
from typing import Dict, List, Optional
from app.services.templates import STANDARD_CLAUSES

def compute_contract_hash(contract_data: dict) -> str:
    serialized = json.dumps({
        "id": contract_data.get("id"),
        "title": contract_data.get("title"),
        "brand": contract_data.get("brand_name"),
        "creator": contract_data.get("creator_name"),
        "compensation": contract_data.get("total_compensation"),
        "deliverables": [d.get("title") for d in contract_data.get("deliverables", [])],
        "clauses": [c.get("key") for c in contract_data.get("clauses", [])],
    }, sort_keys=True)
    return "0x" + hashlib.sha256(serialized.encode('utf-8')).hexdigest()

INITIAL_CONTRACTS: List[dict] = [
    {
        "id": "cnt-nike-01",
        "contract_number": "NKE-2026-8812",
        "title": "Air Max Pulse Global Creator Campaign",
        "campaign_name": "Next-Gen Velocity Launch",
        "brand_name": "Nike Global Running",
        "brand_contact": "Marcus Vance (VP Brand Partnerships)",
        "brand_email": "marcus.vance@nike-partnerships.com",
        "brand_logo": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80",
        "creator_name": "Alex Rivera",
        "creator_handle": "@alex_runs_faster",
        "creator_email": "collabs@alexriverafit.com",
        "creator_avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        "category": "Athletics & Footwear",
        "status": "active",
        "total_compensation": 18500.0,
        "currency": "USD",
        "start_date": "2026-10-15",
        "end_date": "2026-12-15",
        "created_at": "2026-10-15T09:30:00Z",
        "updated_at": "2026-10-18T14:20:00Z",
        "contract_hash": "0x4a8f9c118b62ef3e07d0d826a71bb9356ef29bc5b3762c99a4e9b98c39e2401f",
        "clauses": STANDARD_CLAUSES,
        "deliverables": [
            {
                "id": "del-nike-1",
                "title": "1x 60-Second Dynamic Urban Sprint Reel",
                "platform": "instagram",
                "format": "Reel",
                "specs": "4K 60fps vertical footage, high-energy cut, shoe close-up at 0:02, #AirMaxPulse & #ad tags mandatory.",
                "due_date": "2026-10-25",
                "status": "approved",
                "submission_url": "https://instagram.com/p/DBc88219xX",
                "submission_notes": "First cut uploaded and verified by brand team. Received 142k views in 48 hours.",
                "feedback": "Approved by Marcus Vance. Exceptional engagement and lighting.",
                "metrics": {"views": 142800, "likes": 18450, "shares": 3100, "comments": 680}
            },
            {
                "id": "del-nike-2",
                "title": "1x TikTok Sound Integration & Running Challenge",
                "platform": "tiktok",
                "format": "Short",
                "specs": "Use campaign custom sound 'Pulse Beats', include bio link sticker with Nike app download discount.",
                "due_date": "2026-11-05",
                "status": "submitted",
                "submission_url": "https://tiktok.com/@alex_runs_faster/video/72910488219",
                "submission_notes": "Submitted video for brand review. Showing the sprint drills on track.",
                "feedback": "Under review by Nike social compliance.",
                "metrics": {"views": 95200, "likes": 12100, "shares": 1940, "comments": 420}
            },
            {
                "id": "del-nike-3",
                "title": "3x Instagram Stories with Direct Store Swipe-Up",
                "platform": "instagram",
                "format": "Story",
                "specs": "Live unboxing, fit review, direct affiliate link sticker with UTM tracking.",
                "due_date": "2026-11-15",
                "status": "pending",
                "submission_url": None,
                "submission_notes": None,
                "feedback": None,
                "metrics": None
            }
        ],
        "milestones": [
            {
                "id": "ms-nike-1",
                "name": "Contract Execution Advance (40%)",
                "amount": 7400.0,
                "percentage": 40.0,
                "status": "released",
                "due_trigger": "Executed upon mutual signature",
                "released_at": "2026-10-16T11:00:00Z"
            },
            {
                "id": "ms-nike-2",
                "name": "Deliverables Approval & Verification (60%)",
                "amount": 11100.0,
                "percentage": 60.0,
                "status": "in_escrow",
                "due_trigger": "Disbursed upon completion of all 3 deliverables"
            }
        ],
        "creator_signature": {
            "signed": True,
            "signer_name": "Alex Rivera",
            "signer_title": "Independent Athlete & Content Creator",
            "signature_data": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60'><path d='M10,40 Q50,10 90,40 T170,30' fill='none' stroke='%232563EB' stroke-width='3'/></svg>",
            "signature_type": "drawn",
            "timestamp": "2026-10-15T10:14:22Z",
            "ip_address": "198.51.100.42",
            "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X)"
        },
        "brand_signature": {
            "signed": True,
            "signer_name": "Marcus Vance",
            "signer_title": "VP Brand Partnerships, Nike Global",
            "signature_data": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60'><path d='M15,35 Q60,5 110,45 T180,25' fill='none' stroke='%230F172A' stroke-width='3'/></svg>",
            "signature_type": "drawn",
            "timestamp": "2026-10-15T11:02:18Z",
            "ip_address": "12.184.22.109",
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4)"
        },
        "audit_trail": [
            {
                "id": "aud-1",
                "timestamp": "2026-10-15T09:30:00Z",
                "actor_name": "Marcus Vance",
                "actor_role": "Brand Manager",
                "action": "Contract Initialized",
                "details": "Contract draft created with template 'MNC Tier-1 Social Sponsorship'",
                "hash": "0x11ab"
            },
            {
                "id": "aud-2",
                "timestamp": "2026-10-15T10:14:22Z",
                "actor_name": "Alex Rivera",
                "actor_role": "Influencer / Creator",
                "action": "Digitally Executed (Creator)",
                "details": "Contract digitally signed via touch canvas. IP: 198.51.100.42",
                "hash": "0x22cd"
            },
            {
                "id": "aud-3",
                "timestamp": "2026-10-15T11:02:18Z",
                "actor_name": "Marcus Vance",
                "actor_role": "Brand Manager",
                "action": "Countersigned & Sealed",
                "details": "Mutual contract finalized. Escrow funds locked.",
                "hash": "0x33ef"
            },
            {
                "id": "aud-4",
                "timestamp": "2026-10-16T11:00:00Z",
                "actor_name": "System Escrow",
                "actor_role": "Escrow Vault",
                "action": "Milestone #1 Disbursed",
                "details": "Initial deposit $7,400.00 transferred to Alex Rivera via Stripe Connect.",
                "hash": "0x44fa"
            }
        ]
    },
    {
        "id": "cnt-sephora-02",
        "contract_number": "SEP-2026-4409",
        "title": "Radiant Dew Skin Glow Autumn Spotlight",
        "campaign_name": "Glow From Within 2026",
        "brand_name": "Sephora North America",
        "brand_contact": "Elena Rostova (Global Talent Director)",
        "brand_email": "elena.rostova@sephora-talents.com",
        "brand_logo": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&auto=format&fit=crop&q=80",
        "creator_name": "Maya Chen",
        "creator_handle": "@glowwithmaya",
        "creator_email": "maya@glowwithmaya.com",
        "creator_avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80",
        "category": "Beauty & Skincare",
        "status": "pending_creator_sign",
        "total_compensation": 9500.0,
        "currency": "USD",
        "start_date": "2026-10-20",
        "end_date": "2026-11-30",
        "created_at": "2026-10-18T10:00:00Z",
        "updated_at": "2026-10-19T08:15:00Z",
        "contract_hash": "0x9c42b8e018d451a998bc156102cf94801192efcba76689d04efb9a8231d68371",
        "clauses": STANDARD_CLAUSES,
        "deliverables": [
            {
                "id": "del-sep-1",
                "title": "1x High-Definition Skincare Routine Reel (90s)",
                "platform": "instagram",
                "format": "Reel",
                "specs": "Focus on application texture, unedited skin filter, macro close-up of serum dropper, include Sephora VIP code.",
                "due_date": "2026-11-04",
                "status": "pending",
                "submission_url": None,
                "submission_notes": None,
                "feedback": None,
                "metrics": None
            },
            {
                "id": "del-sep-2",
                "title": "1x TikTok 'Get Ready With Me' (GRWM) Video",
                "platform": "tiktok",
                "format": "Short",
                "specs": "Natural everyday look, showcase before/after radiance, tag @sephora and pin top comment with product link.",
                "due_date": "2026-11-10",
                "status": "pending",
                "submission_url": None,
                "submission_notes": None,
                "feedback": None,
                "metrics": None
            }
        ],
        "milestones": [
            {
                "id": "ms-sep-1",
                "name": "Upfront Production Retainer (50%)",
                "amount": 4750.0,
                "percentage": 50.0,
                "status": "in_escrow",
                "due_trigger": "Upon digital counter-execution by creator"
            },
            {
                "id": "ms-sep-2",
                "name": "Final Deliverables & Performance Settlement (50%)",
                "amount": 4750.0,
                "percentage": 50.0,
                "status": "pending",
                "due_trigger": "Upon approval of all published content and 7-day metric report"
            }
        ],
        "creator_signature": {
            "signed": False,
            "signer_name": None,
            "signer_title": None,
            "signature_data": None,
            "signature_type": "drawn",
            "timestamp": None,
            "ip_address": None,
            "user_agent": None
        },
        "brand_signature": {
            "signed": True,
            "signer_name": "Elena Rostova",
            "signer_title": "Global Talent Director, Sephora",
            "signature_data": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60'><path d='M20,40 Q70,5 120,40 T180,30' fill='none' stroke='%23E11D48' stroke-width='3'/></svg>",
            "signature_type": "drawn",
            "timestamp": "2026-10-18T10:30:00Z",
            "ip_address": "66.249.79.12",
            "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        },
        "audit_trail": [
            {
                "id": "aud-sep-1",
                "timestamp": "2026-10-18T10:00:00Z",
                "actor_name": "Elena Rostova",
                "actor_role": "Brand Manager",
                "action": "Contract Generated",
                "details": "Contract offer created with Sephora North America standard influencer terms.",
                "hash": "0x55aa"
            },
            {
                "id": "aud-sep-2",
                "timestamp": "2026-10-18T10:30:00Z",
                "actor_name": "Elena Rostova",
                "actor_role": "Brand Manager",
                "action": "Brand Countersigned",
                "details": "Pre-authorized by Elena Rostova. Waiting for Maya Chen to review and sign.",
                "hash": "0x66bb"
            }
        ]
    },
    {
        "id": "cnt-samsung-03",
        "contract_number": "SAM-2026-9021",
        "title": "Galaxy Z-Fold 8 Creator Studio Experience",
        "campaign_name": "Unfold Tomorrow Tech Spotlight",
        "brand_name": "Samsung Electronics America",
        "brand_contact": "David Sterling (Head of Consumer Tech Collabs)",
        "brand_email": "david.sterling@samsung-collabs.com",
        "brand_logo": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=120&auto=format&fit=crop&q=80",
        "creator_name": "Samir 'TechSam' Patel",
        "creator_handle": "@techsam_reviews",
        "creator_email": "business@techsam.io",
        "creator_avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
        "category": "Tech & Consumer Electronics",
        "status": "sent_for_review",
        "total_compensation": 24000.0,
        "currency": "USD",
        "start_date": "2026-11-01",
        "end_date": "2026-12-31",
        "created_at": "2026-10-19T06:00:00Z",
        "updated_at": "2026-10-19T06:00:00Z",
        "contract_hash": "0x77ee19bb4458d92911cc6480a8451192efcba76689d04efb9a8231d6837190ff",
        "clauses": STANDARD_CLAUSES,
        "deliverables": [
            {
                "id": "del-sam-1",
                "title": "1x Dedicated 10-Minute YouTube Hands-On Review",
                "platform": "youtube",
                "format": "Dedicated Video",
                "specs": "Comprehensive unboxing, camera zoom shootout, multi-tasking split screen showcase in 4K resolution.",
                "due_date": "2026-11-10",
                "status": "pending",
                "submission_url": None,
                "submission_notes": None,
                "feedback": None,
                "metrics": None
            },
            {
                "id": "del-sam-2",
                "title": "2x YouTube Shorts (Multi-Tasking & Camera Nightography)",
                "platform": "youtube",
                "format": "Short",
                "specs": "Snappy, high visual fidelity, highlight generative AI photography features.",
                "due_date": "2026-11-18",
                "status": "pending",
                "submission_url": None,
                "submission_notes": None,
                "feedback": None,
                "metrics": None
            }
        ],
        "milestones": [
            {
                "id": "ms-sam-1",
                "name": "Pre-Production & Tech Kit Security Deposit (35%)",
                "amount": 8400.0,
                "percentage": 35.0,
                "status": "in_escrow",
                "due_trigger": "Execution of NDA and collaboration agreement"
            },
            {
                "id": "ms-sam-2",
                "name": "Dedicated Review Live Publication (45%)",
                "amount": 10800.0,
                "percentage": 45.0,
                "status": "pending",
                "due_trigger": "Publication of long-form YouTube review video"
            },
            {
                "id": "ms-sam-3",
                "name": "Shorts Delivery & 30-Day Metrics Wrap (20%)",
                "amount": 4800.0,
                "percentage": 20.0,
                "status": "pending",
                "due_trigger": "Final performance audit report"
            }
        ],
        "creator_signature": {
            "signed": False,
            "signer_name": None,
            "signer_title": None,
            "signature_data": None,
            "signature_type": "drawn",
            "timestamp": None,
            "ip_address": None,
            "user_agent": None
        },
        "brand_signature": {
            "signed": False,
            "signer_name": None,
            "signer_title": None,
            "signature_data": None,
            "signature_type": "drawn",
            "timestamp": None,
            "ip_address": None,
            "user_agent": None
        },
        "audit_trail": [
            {
                "id": "aud-sam-1",
                "timestamp": "2026-10-19T06:00:00Z",
                "actor_name": "David Sterling",
                "actor_role": "Brand Manager",
                "action": "Contract Dispatched for Creator Review",
                "details": "Contract proposal dispatched to @techsam_reviews for review and redlining.",
                "hash": "0x77cc"
            }
        ]
    }
]

class ContractDatabase:
    def __init__(self):
        self.contracts: Dict[str, dict] = {c["id"]: c for c in INITIAL_CONTRACTS}

    def get_all(self, status: Optional[str] = None, role: Optional[str] = None, search: Optional[str] = None) -> List[dict]:
        results = list(self.contracts.values())
        if status and status != "all":
            results = [c for c in results if c.get("status") == status]
        if search:
            s = search.lower()
            results = [
                c for c in results
                if s in c.get("title", "").lower()
                or s in c.get("brand_name", "").lower()
                or s in c.get("creator_name", "").lower()
                or s in c.get("creator_handle", "").lower()
                or s in c.get("contract_number", "").lower()
            ]
        # Sort by updated_at descending
        results.sort(key=lambda x: x.get("updated_at", ""), reverse=True)
        return results

    def get_by_id(self, contract_id: str) -> Optional[dict]:
        return self.contracts.get(contract_id)

    def create(self, data: dict) -> dict:
        contract_id = f"cnt-{int(datetime.now().timestamp() * 1000)}"
        number_code = f"MNC-{datetime.now().year}-{str(hash(contract_id) % 10000).zfill(4)}"
        now_iso = datetime.now().isoformat() + "Z"
        
        contract = {
            "id": contract_id,
            "contract_number": number_code,
            "title": data.get("title"),
            "campaign_name": data.get("campaign_name", "Brand Campaign 2026"),
            "brand_name": data.get("brand_name"),
            "brand_contact": data.get("brand_contact", "Brand Partnerships Lead"),
            "brand_email": data.get("brand_email"),
            "brand_logo": data.get("brand_logo", "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=120&auto=format&fit=crop&q=80"),
            "creator_name": data.get("creator_name"),
            "creator_handle": data.get("creator_handle"),
            "creator_email": data.get("creator_email"),
            "creator_avatar": data.get("creator_avatar", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"),
            "category": data.get("category", "General Media"),
            "status": "pending_creator_sign",
            "total_compensation": float(data.get("total_compensation", 0)),
            "currency": data.get("currency", "USD"),
            "start_date": data.get("start_date"),
            "end_date": data.get("end_date"),
            "created_at": now_iso,
            "updated_at": now_iso,
            "clauses": data.get("clauses", STANDARD_CLAUSES),
            "deliverables": data.get("deliverables", []),
            "milestones": data.get("milestones", []),
            "creator_signature": {
                "signed": False, "signer_name": None, "signer_title": None,
                "signature_data": None, "signature_type": "drawn",
                "timestamp": None, "ip_address": None, "user_agent": None
            },
            "brand_signature": {
                "signed": True,
                "signer_name": data.get("brand_contact", "Brand Executive"),
                "signer_title": "Campaign Director",
                "signature_data": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='60'><path d='M10,35 Q60,10 110,40 T180,25' fill='none' stroke='%230F172A' stroke-width='3'/></svg>",
                "signature_type": "drawn",
                "timestamp": now_iso,
                "ip_address": "127.0.0.1",
                "user_agent": "Enterprise CLM Portal v2.4"
            },
            "audit_trail": [
                {
                    "id": f"aud-{int(datetime.now().timestamp() * 1000)}",
                    "timestamp": now_iso,
                    "actor_name": data.get("brand_contact", "Brand Manager"),
                    "actor_role": "Brand Manager",
                    "action": "Contract Generated & Pre-Signed",
                    "details": f"Generated contract {number_code} and dispatched to {data.get('creator_name')}",
                    "hash": "0x" + hashlib.sha256(now_iso.encode()).hexdigest()[:8]
                }
            ]
        }
        contract["contract_hash"] = compute_contract_hash(contract)
        self.contracts[contract_id] = contract
        return contract

    def sign(self, contract_id: str, sign_data: dict) -> Optional[dict]:
        contract = self.contracts.get(contract_id)
        if not contract:
            return None
        
        now_iso = datetime.now().isoformat() + "Z"
        role = sign_data.get("signer_role", "creator")
        sig_info = {
            "signed": True,
            "signer_name": sign_data.get("signer_name"),
            "signer_title": sign_data.get("signer_title") or ("Content Creator" if role == "creator" else "Brand Executive"),
            "signature_data": sign_data.get("signature_data"),
            "signature_type": sign_data.get("signature_type", "drawn"),
            "timestamp": now_iso,
            "ip_address": "172.56.21.84",
            "user_agent": "CollabSign Secure Signer Engine / Chrome"
        }

        if role == "creator":
            contract["creator_signature"] = sig_info
            # If brand already signed, transition to active
            if contract.get("brand_signature", {}).get("signed"):
                contract["status"] = "active"
            else:
                contract["status"] = "pending_brand_sign"
        else:
            contract["brand_signature"] = sig_info
            if contract.get("creator_signature", {}).get("signed"):
                contract["status"] = "active"
            else:
                contract["status"] = "pending_creator_sign"

        contract["updated_at"] = now_iso
        contract["contract_hash"] = compute_contract_hash(contract)

        contract["audit_trail"].append({
            "id": f"aud-{int(datetime.now().timestamp() * 1000)}",
            "timestamp": now_iso,
            "actor_name": sign_data.get("signer_name"),
            "actor_role": "Influencer / Creator" if role == "creator" else "Brand Manager",
            "action": f"Digitally Signed ({'Influencer' if role == 'creator' else 'Brand'})",
            "details": f"Sealed with {sign_data.get('signature_type', 'drawn')} signature under E-SIGN Act compliance.",
            "hash": "0x" + hashlib.sha256((now_iso + role).encode()).hexdigest()[:12]
        })

        return contract

    def update_deliverable(self, contract_id: str, deliverable_id: str, update_dict: dict) -> Optional[dict]:
        contract = self.contracts.get(contract_id)
        if not contract:
            return None
        
        now_iso = datetime.now().isoformat() + "Z"
        for d in contract.get("deliverables", []):
            if d.get("id") == deliverable_id:
                d.update(update_dict)
                contract["updated_at"] = now_iso
                contract["audit_trail"].append({
                    "id": f"aud-{int(datetime.now().timestamp() * 1000)}",
                    "timestamp": now_iso,
                    "actor_name": "System Audit",
                    "actor_role": "CLM Monitor",
                    "action": f"Deliverable '{d.get('title')}' Updated",
                    "details": f"Status changed to {d.get('status')}.",
                    "hash": "0x" + hashlib.sha256((now_iso + deliverable_id).encode()).hexdigest()[:8]
                })
                return contract
        return None

    def release_milestone(self, contract_id: str, milestone_id: str) -> Optional[dict]:
        contract = self.contracts.get(contract_id)
        if not contract:
            return None
        
        now_iso = datetime.now().isoformat() + "Z"
        for m in contract.get("milestones", []):
            if m.get("id") == milestone_id:
                m["status"] = "released"
                m["released_at"] = now_iso
                contract["updated_at"] = now_iso
                contract["audit_trail"].append({
                    "id": f"aud-{int(datetime.now().timestamp() * 1000)}",
                    "timestamp": now_iso,
                    "actor_name": "Financial Escrow Vault",
                    "actor_role": "Escrow Vault",
                    "action": f"Milestone Released: {m.get('name')}",
                    "details": f"Disbursed ${m.get('amount', 0):,.2f} to creator account.",
                    "hash": "0x" + hashlib.sha256((now_iso + milestone_id).encode()).hexdigest()[:10]
                })
                # Check if all milestones released
                if all(item.get("status") == "released" for item in contract.get("milestones", [])):
                    contract["status"] = "completed"
                return contract
        return None

db = ContractDatabase()
