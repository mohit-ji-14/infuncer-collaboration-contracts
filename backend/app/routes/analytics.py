from fastapi import APIRouter
from app.database import db

router = APIRouter(prefix="/api", tags=["analytics"])

@router.get("/analytics")
def get_analytics():
    all_contracts = list(db.contracts.values())
    
    total_value = sum(c.get("total_compensation", 0) for c in all_contracts)
    total_contracts = len(all_contracts)
    
    status_counts = {}
    for c in all_contracts:
        st = c.get("status", "draft")
        status_counts[st] = status_counts.get(st, 0) + 1
        
    platform_counts = {}
    total_deliverables = 0
    approved_deliverables = 0
    
    for c in all_contracts:
        for d in c.get("deliverables", []):
            p = d.get("platform", "other")
            platform_counts[p] = platform_counts.get(p, 0) + 1
            total_deliverables += 1
            if d.get("status") == "approved":
                approved_deliverables += 1

    escrow_locked = 0.0
    escrow_released = 0.0
    for c in all_contracts:
        for m in c.get("milestones", []):
            if m.get("status") == "in_escrow":
                escrow_locked += m.get("amount", 0)
            elif m.get("status") == "released":
                escrow_released += m.get("amount", 0)

    # Recent Audit activity
    recent_activity = []
    for c in all_contracts:
        for ev in c.get("audit_trail", []):
            recent_activity.append({
                **ev,
                "contract_id": c.get("id"),
                "contract_title": c.get("title"),
                "contract_number": c.get("contract_number")
            })
    recent_activity.sort(key=lambda x: x.get("timestamp", ""), reverse=True)

    return {
        "total_value": total_value,
        "total_contracts": total_contracts,
        "active_contracts": status_counts.get("active", 0),
        "pending_signatures": status_counts.get("pending_creator_sign", 0) + status_counts.get("pending_brand_sign", 0),
        "completed_contracts": status_counts.get("completed", 0),
        "deliverables_stats": {
            "total": total_deliverables,
            "approved": approved_deliverables,
            "completion_rate": round((approved_deliverables / total_deliverables * 100), 1) if total_deliverables > 0 else 0
        },
        "financial_summary": {
            "total_escrow_secured": escrow_locked + escrow_released,
            "escrow_locked": escrow_locked,
            "escrow_released": escrow_released
        },
        "platform_distribution": platform_counts,
        "status_distribution": status_counts,
        "recent_activity": recent_activity[:8]
    }
