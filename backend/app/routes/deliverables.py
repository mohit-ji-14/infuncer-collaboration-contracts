from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.schemas import SubmitDeliverableRequest, ReviewDeliverableRequest, ReleaseMilestoneRequest

router = APIRouter(prefix="/api/contracts", tags=["deliverables"])

@router.post("/{contract_id}/deliverables/{deliv_id}/submit")
def submit_deliverable(contract_id: str, deliv_id: str, payload: SubmitDeliverableRequest):
    update_data = {
        "status": "submitted",
        "submission_url": payload.submission_url,
        "submission_notes": payload.submission_notes
    }
    updated = db.update_deliverable(contract_id, deliv_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Contract or deliverable not found")
    return {"success": True, "message": "Deliverable submitted for review", "contract": updated}

@router.post("/{contract_id}/deliverables/{deliv_id}/review")
def review_deliverable(contract_id: str, deliv_id: str, payload: ReviewDeliverableRequest):
    new_status = "approved" if payload.action == "approve" else "revision_requested"
    update_data = {
        "status": new_status,
        "feedback": payload.feedback
    }
    updated = db.update_deliverable(contract_id, deliv_id, update_data)
    if not updated:
        raise HTTPException(status_code=404, detail="Contract or deliverable not found")
    return {"success": True, "message": f"Deliverable marked as {new_status}", "contract": updated}

@router.post("/{contract_id}/milestones/{milestone_id}/release")
def release_milestone(contract_id: str, milestone_id: str):
    updated = db.release_milestone(contract_id, milestone_id)
    if not updated:
        raise HTTPException(status_code=404, detail="Contract or milestone not found")
    return {"success": True, "message": "Milestone escrow funds successfully disbursed", "contract": updated}
