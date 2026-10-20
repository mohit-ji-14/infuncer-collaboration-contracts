from typing import List, Dict, Any

STANDARD_CLAUSES = [
    {
        "id": "cl-ftc",
        "key": "ftc_disclosure",
        "title": "FTC & Regulatory Advertising Compliance",
        "summary": "You must clearly mark content with #ad or #sponsored above the fold. No hidden tags allowed.",
        "content": "The Creator agrees to strictly adhere to all applicable Federal Trade Commission (FTC) Endorsement Guides, European ASA regulations, and equivalent local commercial guidelines. Every promotional deliverable must prominently feature clear and conspicuous disclosure markers (e.g., '#ad', '#sponsored', or platform-native 'Paid Partnership' toggles) prior to video/post expansion.",
        "risk_level": "standard",
        "is_mandatory": True
    },
    {
        "id": "cl-usage",
        "key": "usage_rights",
        "title": "Content Intellectual Property & Paid Whitelisting",
        "summary": "The brand gets rights to run paid ads using your content for 90 days. You retain your personal portfolio rights.",
        "content": "Creator grants Company an irrevocable, non-transferable, non-exclusive license to utilize, reproduce, and amplify the delivered content across digital paid channels (including Meta Spark Ads, TikTok Dark Posts, YouTube Shorts Ads) for a period of ninety (90) calendar days from the publication date. Creator retains core moral ownership and the right to permanently archive the content on their native organic feed.",
        "risk_level": "standard",
        "is_mandatory": True
    },
    {
        "id": "cl-exclusivity",
        "key": "exclusivity",
        "title": "Category Exclusivity & Competitive Lockout",
        "summary": "You agree not to endorse direct competitors in this category during the campaign plus 30 days following completion.",
        "content": "During the term of this Agreement and for thirty (30) days following the final approved deliverable publication, Creator shall not enter into any sponsored partnership, endorsement, public promotion, or unboxing with direct commercial competitors defined in Schedule A (e.g., competing direct market brands in the identical primary vertical).",
        "risk_level": "standard",
        "is_mandatory": False
    },
    {
        "id": "cl-revisions",
        "key": "revisions",
        "title": "Deliverable Review, Approvals & Revision Quota",
        "summary": "Brand has 48 hours to review draft content. Up to two reasonable revision rounds are included without extra fees.",
        "content": "Brand shall have forty-eight (48) business hours following Creator's draft upload to review and provide consolidated actionable feedback. Creator agrees to perform up to two (2) rounds of reasonable creative revisions aligning with the initial campaign brief. Subsequent substantial scope alterations or script pivots shall incur an agreed hourly or milestone surcharge.",
        "risk_level": "standard",
        "is_mandatory": True
    },
    {
        "id": "cl-payment",
        "key": "payment_terms",
        "title": "Milestone Escrow & Payment Settlement",
        "summary": "40% upfront deposit secured upon signing; 60% remaining balance released within 5 days of content approval.",
        "content": "Total compensation shall be remitted via automated escrow disbursement schedule: Forty percent (40%) upon mutual digital execution of this Agreement; Sixty percent (60%) upon verified publishing and brand verification of all contractual deliverables. Payments shall be disbursed via Stripe/ACH within five (5) business days.",
        "risk_level": "standard",
        "is_mandatory": True
    },
    {
        "id": "cl-morality",
        "key": "morality",
        "title": "Brand Safety & Mutual Morality Clause",
        "summary": "Both parties agree to uphold public standards and avoid defamatory, hate-speech, or illegal conduct.",
        "content": "If either party commits any act or becomes involved in any situation or occurrence tending to bring that party into public disrepute, contempt, scandal, or ridicule, or which reflects unfavorably upon the reputation of the Brand or Creator, the aggrieved party may immediately terminate this Agreement with pro-rated accounting for completed verified deliverables.",
        "risk_level": "standard",
        "is_mandatory": True
    }
]

CONTRACT_TEMPLATES: List[Dict[str, Any]] = [
    {
        "id": "tpl-tier1-social",
        "name": "MNC Tier-1 Social Sponsorship (Reels & Shorts)",
        "category": "High-Impact Product Launch",
        "description": "Standard multi-platform endorsement agreement covering Instagram Reels, TikTok, and YouTube Shorts with paid amplification rights.",
        "default_compensation": 12500,
        "default_deliverables": [
            {
                "id": "del-1",
                "title": "1x Dedicated Instagram 60s Reel",
                "platform": "instagram",
                "format": "Reel",
                "specs": "1080x1920 vertical format, high-energy hook in first 3s, product in active use, tag @brand in caption and collaborator tag.",
                "due_date": "2026-11-05",
                "status": "pending"
            },
            {
                "id": "del-2",
                "title": "1x TikTok Sound & Feature Video",
                "platform": "tiktok",
                "format": "Short",
                "specs": "Trending audio integration, clear CTA to visit link in bio, #BrandLaunch in caption with official campaign hashtag.",
                "due_date": "2026-11-08",
                "status": "pending"
            },
            {
                "id": "del-3",
                "title": "3x Instagram Story Sequence with Link Sticker",
                "platform": "instagram",
                "format": "Story",
                "specs": "Behind-the-scenes narrative, direct swipe-up/sticker link with UTM tracking parameters, highlight saved for 14 days.",
                "due_date": "2026-11-12",
                "status": "pending"
            }
        ],
        "default_milestones": [
            {
                "id": "ms-1",
                "name": "Campaign Initiation Deposit (40%)",
                "amount": 5000,
                "percentage": 40,
                "status": "in_escrow",
                "due_trigger": "Upon mutual signing of contract"
            },
            {
                "id": "ms-2",
                "name": "Deliverables Completion & Verification (60%)",
                "amount": 7500,
                "percentage": 60,
                "status": "pending",
                "due_trigger": "Upon final post verification and engagement metrics check"
            }
        ],
        "clauses": STANDARD_CLAUSES
    },
    {
        "id": "tpl-ambassador",
        "name": "Global Brand Ambassador Agreement (Quarterly / Annual)",
        "category": "Long-Term Endorsement",
        "description": "Long-term partnership with recurring monthly retainers, quarterly flagship activations, and VIP product exclusives.",
        "default_compensation": 36000,
        "default_deliverables": [
            {
                "id": "del-1",
                "title": "Monthly Dedicated YouTube Integration (60-90s mid-roll)",
                "platform": "youtube",
                "format": "Dedicated Video",
                "specs": "Detailed product walkthrough, dedicated affiliate discount code prominently displayed on-screen and in top pinned comment.",
                "due_date": "2026-11-20",
                "status": "pending"
            },
            {
                "id": "del-2",
                "title": "Bi-Weekly Community Q&A Livestream Feature",
                "platform": "twitch",
                "format": "Livestream",
                "specs": "Brand banner overlay during stream, verbal shoutout and chatbot recurring link posting.",
                "due_date": "2026-11-28",
                "status": "pending"
            }
        ],
        "default_milestones": [
            {
                "id": "ms-1",
                "name": "Quarter 1 Retainer Advance (50%)",
                "amount": 18000,
                "percentage": 50,
                "status": "in_escrow",
                "due_trigger": "Execution of ambassador agreement"
            },
            {
                "id": "ms-2",
                "name": "Mid-Term Milestone (25%)",
                "amount": 9000,
                "percentage": 25,
                "status": "pending",
                "due_trigger": "Successful completion of Month 2 deliverables"
            },
            {
                "id": "ms-3",
                "name": "Final Campaign Wrap & Performance Bonus (25%)",
                "amount": 9000,
                "percentage": 25,
                "status": "pending",
                "due_trigger": "Year-end review and analytics audit"
            }
        ],
        "clauses": STANDARD_CLAUSES
    },
    {
        "id": "tpl-whitelisting",
        "name": "Exclusive Content Licensing & Paid Ad Whitelisting",
        "category": "Paid Media Rights",
        "description": "Permits agency/brand to run Meta Spark Ads and TikTok Dark Posts directly through the creator's social handles.",
        "default_compensation": 8000,
        "default_deliverables": [
            {
                "id": "del-1",
                "title": "3x Raw UGC Ad Variation Hooks (No edits, 4K)",
                "platform": "tiktok",
                "format": "Raw UGC",
                "specs": "Clean voiceover, clear problem-solution-action narrative, vertical 9:16, supplied in Google Drive folder.",
                "due_date": "2026-11-02",
                "status": "pending"
            }
        ],
        "default_milestones": [
            {
                "id": "ms-1",
                "name": "Asset Delivery & Ad Account Grant (50%)",
                "amount": 4000,
                "percentage": 50,
                "status": "in_escrow",
                "due_trigger": "Raw footage upload & Spark Code generation"
            },
            {
                "id": "ms-2",
                "name": "Whitelisting Run Duration Balance (50%)",
                "amount": 4000,
                "percentage": 50,
                "status": "pending",
                "due_trigger": "End of 60-day paid media amplification cycle"
            }
        ],
        "clauses": STANDARD_CLAUSES
    }
]
