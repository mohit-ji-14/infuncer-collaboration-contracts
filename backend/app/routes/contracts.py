from fastapi import APIRouter, HTTPException, Query, Response
from typing import Optional, List
from app.database import db
from app.models.schemas import ContractCreateRequest
from app.services.templates import CONTRACT_TEMPLATES, STANDARD_CLAUSES
from app.services.pdf_service import generate_contract_pdf

router = APIRouter(prefix="/api", tags=["contracts"])

@router.get("/templates")
def get_templates():
    return CONTRACT_TEMPLATES

@router.get("/clauses")
def get_clauses():
    return STANDARD_CLAUSES

@router.get("/contracts")
def list_contracts(
    status: Optional[str] = Query(None),
    role: Optional[str] = Query(None),
    search: Optional[str] = Query(None)
):
    return db.get_all(status=status, role=role, search=search)

@router.get("/contracts/{contract_id}")
def get_contract(contract_id: str):
    contract = db.get_by_id(contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    return contract

@router.post("/contracts")
def create_contract(payload: ContractCreateRequest):
    new_contract = db.create(payload.model_dump())
    return new_contract

@router.get("/contracts/{contract_id}/pdf")
def download_pdf(contract_id: str):
    contract = db.get_by_id(contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    pdf_bytes = generate_contract_pdf(contract)
    filename = f"Contract_{contract.get('contract_number', 'CollabSign')}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

@router.delete("/contracts/{contract_id}")
def delete_contract(contract_id: str):
    if contract_id in db.contracts:
        del db.contracts[contract_id]
        return {"success": True, "message": "Contract deleted"}
    raise HTTPException(status_code=404, detail="Contract not found")
