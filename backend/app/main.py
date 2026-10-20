from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.contracts import router as contracts_router
from app.routes.esign import router as esign_router
from app.routes.deliverables import router as deliverables_router
from app.routes.analytics import router as analytics_router

app = FastAPI(
    title="CollabSign Enterprise CLM API",
    description="Enterprise Influencer Collaboration Contracts & Digital Signature API",
    version="1.0.0"
)

# Enable CORS for local and network clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(contracts_router)
app.include_router(esign_router)
app.include_router(deliverables_router)
app.include_router(analytics_router)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CollabSign Enterprise API",
        "version": "1.0.0",
        "environment": "production"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
