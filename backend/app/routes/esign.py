from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.schemas import SignContractRequest

router = APIRouter(prefix="/api/contracts", tags=["esign"])

@router.post("/{contract_id}/sign")
def sign_contract(contract_id: str, payload: SignContractRequest):
    if not payload.agreement_confirmed:
        raise HTTPException(status_code=400, detail="Signer must confirm terms agreement")
    
    updated = db.sign(contract_id, payload.model_dump())
    if not updated:
        raise HTTPException(status_code=404, detail="Contract not found")
    
    return {
        "success": True,
        "message": f"Contract successfully signed by {payload.signer_name}",
        "contract": updated
    }

@router.get("/{contract_id}/certificate")
def get_audit_certificate(contract_id: str):
    contract = db.get_by_id(contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    
    return {
        "contract_id": contract["id"],
        "contract_number": contract["contract_number"],
        "title": contract["title"],
        "status": contract["status"],
        "contract_hash": contract.get("contract_hash"),
        "compliance_standard": "U.S. Electronic Signatures in Global and National Commerce Act (E-SIGN) & EU eIDAS",
        "brand_signature": contract.get("brand_signature"),
        "creator_signature": contract.get("creator_signature"),
        "audit_trail": contract.get("audit_trail", [])
    }
