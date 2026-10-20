import io
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_contract_pdf(contract: dict) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'ContractTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'ContractSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        textColor=colors.HexColor('#64748B'),
        spaceAfter=15
    )

    h2_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=12,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'ContractBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6
    )

    legal_style = ParagraphStyle(
        'LegalText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#475569')
    )

    elements = []

    # Header
    elements.append(Paragraph(f"INFLUENCER COLLABORATION AGREEMENT", title_style))
    elements.append(Paragraph(f"Contract #{contract.get('contract_number', 'N/A')}  |  Campaign: {contract.get('campaign_name', '')}  |  Generated on {datetime.now().strftime('%B %d, %Y')}", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#2563EB'), spaceAfter=14))

    # Parties Summary Table
    parties_data = [
        [
            Paragraph("<b>SPONSORING BRAND / AGENCY:</b>", body_style),
            Paragraph("<b>INFLUENCER / CREATOR:</b>", body_style)
        ],
        [
            Paragraph(f"<b>{contract.get('brand_name', '')}</b><br/>Contact: {contract.get('brand_contact', '')}<br/>Email: {contract.get('brand_email', '')}", body_style),
            Paragraph(f"<b>{contract.get('creator_name', '')}</b> ({contract.get('creator_handle', '')})<br/>Email: {contract.get('creator_email', '')}<br/>Vertical: {contract.get('category', 'General')}", body_style)
        ],
        [
            Paragraph(f"<b>Effective Period:</b> {contract.get('start_date', '')} to {contract.get('end_date', '')}", body_style),
            Paragraph(f"<b>Total Consideration:</b> ${contract.get('total_compensation', 0):,.2f} {contract.get('currency', 'USD')}", body_style)
        ]
    ]

    t_parties = Table(parties_data, colWidths=[260, 260])
    t_parties.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#E2E8F0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    elements.append(t_parties)
    elements.append(Spacer(1, 14))

    # Section 1: Deliverables
    elements.append(Paragraph("1. SCOPE OF WORK & DELIVERABLES", h2_style))
    deliv_rows = [[
        Paragraph("<b>Title / Format</b>", body_style),
        Paragraph("<b>Platform</b>", body_style),
        Paragraph("<b>Due Date</b>", body_style),
        Paragraph("<b>Status</b>", body_style)
    ]]
    for d in contract.get('deliverables', []):
        deliv_rows.append([
            Paragraph(f"<b>{d.get('title', '')}</b><br/><font size=8 color='#64748B'>{d.get('specs', '')}</font>", body_style),
            Paragraph(d.get('platform', '').upper(), body_style),
            Paragraph(d.get('due_date', ''), body_style),
            Paragraph(d.get('status', '').upper(), body_style)
        ])
    t_deliv = Table(deliv_rows, colWidths=[230, 80, 100, 110])
    t_deliv.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    elements.append(t_deliv)
    elements.append(Spacer(1, 14))

    # Section 2: Compensation & Milestones
    elements.append(Paragraph("2. COMPENSATION & MILESTONE ESCROW", h2_style))
    ms_rows = [[
        Paragraph("<b>Milestone Description</b>", body_style),
        Paragraph("<b>Trigger Event</b>", body_style),
        Paragraph("<b>Allocation</b>", body_style),
        Paragraph("<b>Amount</b>", body_style),
        Paragraph("<b>Status</b>", body_style)
    ]]
    for m in contract.get('milestones', []):
        ms_rows.append([
            Paragraph(m.get('name', ''), body_style),
            Paragraph(m.get('due_trigger', ''), body_style),
            Paragraph(f"{m.get('percentage', 0)}%", body_style),
            Paragraph(f"${m.get('amount', 0):,.2f}", body_style),
            Paragraph(m.get('status', '').upper(), body_style)
        ])
    t_ms = Table(ms_rows, colWidths=[150, 150, 60, 80, 80])
    t_ms.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#F1F5F9')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    elements.append(t_ms)
    elements.append(Spacer(1, 14))

    # Section 3: Legal Terms & Clauses
    elements.append(Paragraph("3. LEGAL TERMS & STANDARD PROVISIONS", h2_style))
    for i, c in enumerate(contract.get('clauses', []), 1):
        elements.append(Paragraph(f"<b>3.{i} {c.get('title', '')}</b>", body_style))
        elements.append(Paragraph(c.get('content', ''), legal_style))
        elements.append(Spacer(1, 6))

    elements.append(Spacer(1, 10))

    # Section 4: Execution & Signatures
    elements.append(Paragraph("4. EXECUTION & DIGITAL SIGNATURES", h2_style))
    creator_sig = contract.get('creator_signature', {})
    brand_sig = contract.get('brand_signature', {})

    c_sig_text = f"<b>STATUS: SIGNED</b><br/>Name: {creator_sig.get('signer_name', 'N/A')}<br/>Date: {creator_sig.get('timestamp', 'N/A')}<br/>IP: {creator_sig.get('ip_address', 'Verified')}" if creator_sig.get('signed') else "<b>STATUS: PENDING SIGNATURE</b>"
    b_sig_text = f"<b>STATUS: SIGNED</b><br/>Name: {brand_sig.get('signer_name', 'N/A')}<br/>Date: {brand_sig.get('timestamp', 'N/A')}<br/>IP: {brand_sig.get('ip_address', 'Verified')}" if brand_sig.get('signed') else "<b>STATUS: PENDING SIGNATURE</b>"

    sig_data = [
        [Paragraph("<b>FOR BRAND / SPONSOR:</b>", body_style), Paragraph("<b>FOR CREATOR / INFLUENCER:</b>", body_style)],
        [Paragraph(b_sig_text, body_style), Paragraph(c_sig_text, body_style)]
    ]
    t_sig = Table(sig_data, colWidths=[260, 260])
    t_sig.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    elements.append(t_sig)

    # Cryptographic Hash Stamp
    elements.append(Spacer(1, 12))
    hash_str = contract.get('contract_hash', 'SHA256-PENDING')
    elements.append(Paragraph(f"<font size=8 color='#64748B'>Cryptographic Security Hash: <b>{hash_str}</b> | Compliant with Electronic Signatures in Global and National Commerce Act (E-SIGN).</font>", body_style))

    doc.build(elements)
    buffer.seek(0)
    return buffer.getvalue()
