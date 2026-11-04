/* ==========================================================================
   Novexia product catalog — the single place to add or change products.

   To add a product family or SKU:
   1. Copy one of the objects below and give it a unique `id`.
   2. Set `audience` to "pro" (licensed/wholesale), "consumer", or "pipeline".
   3. Optional: `image`, `specs` (rows for a table), `documents` (labels/PDFs).
   It then appears on products.html and at product.html?id=<id> automatically.

   Compliance: the public site lists product FAMILIES only. Do not add
   individual peptide names, strengths or pricing here — those are shared with
   verified accounts. Have all claims reviewed before publishing.
   ========================================================================== */
window.NOVEXIA_PRODUCTS = [
  {
    id: "glp1-metabolic",
    name: "GLP-1 & Metabolic Peptides",
    family: "Novexia Peptides",
    audience: "pro",
    status: "Available to qualified accounts",
    icon: "molecule",
    summary:
      "Incretin-class and related metabolic peptides supplied in multi-dose vials across a range of strengths.",
    overview: [
      "Novexia's metabolic peptide line covers GLP-1 receptor agonists, dual and triple agonists, and amylin-analog combinations, supplied in 3 mL, 5 mL and 10 mL vial formats.",
      "This line is offered only to licensed pharmacies, outsourcing facilities and qualified healthcare organizations. It is not sold to consumers."
    ],
    highlights: [
      "Single-agent and combination presentations",
      "Multiple strengths and vial volumes",
      "Lot documentation and certificates of analysis on request",
      "Full SKU list shared after account verification"
    ],
    formats: ["3 mL vial", "5 mL vial", "10 mL vial"]
  },
  {
    id: "peptides-wellness",
    name: "Peptides & Wellness",
    family: "Novexia Peptides",
    audience: "pro",
    status: "Available to qualified accounts",
    icon: "flask",
    summary:
      "A broad research and wellness peptide library spanning recovery, longevity, dermatology and neuro-peptide categories.",
    overview: [
      "Our largest peptide family includes injectable and non-injectable peptides used across recovery, metabolic, dermatologic, sleep and cognitive research and practice settings.",
      "Availability, permitted uses and regulatory status vary by product and by purchaser. Eligibility is confirmed before any product information or ordering access is provided."
    ],
    highlights: [
      "Wide range of single peptides and strengths",
      "Bacteriostatic water available",
      "Technical documentation on request",
      "Full SKU list shared after account verification"
    ],
    formats: ["3 mL vial", "5 mL vial", "10 mL vial", "30 mL vial"]
  },
  {
    id: "blends",
    name: "Blends & Combinations",
    family: "Novexia Peptides",
    audience: "pro",
    status: "Available to qualified accounts",
    icon: "layers",
    summary:
      "Pre-formulated multi-peptide combinations in fixed ratios, supplied in single vials.",
    overview: [
      "Combination presentations pair complementary peptides in fixed ratios to simplify inventory and dispensing for qualified professional accounts.",
      "Composition sheets and labeling are provided to verified accounts."
    ],
    highlights: [
      "Two-, three- and four-component blends",
      "Consistent fixed-ratio formulations",
      "3 mL and 5 mL vial formats",
      "Full SKU list shared after account verification"
    ],
    formats: ["3 mL vial", "5 mL vial"]
  },
  {
    id: "reborn-hearing-glasses",
    name: "REBORN Hearing Aid Glasses",
    family: "REBORN",
    audience: "consumer",
    status: "Available",
    icon: "glasses",
    image: "assets/img/reborn-glasses",
    link: "reborn.html",
    summary:
      "Open-ear, bone-conduction hearing assistance built into an adjustable eyeglass frame.",
    overview: [
      "REBORN Hearing Aid Glasses combine an adjustable-temple eyeglass frame with open-ear, bone-conduction hearing assistance. They run on replaceable hearing-aid batteries, so there is no charging cable.",
      "Available in matte black and matte light gray. Wholesale and retail-partner inquiries are welcome."
    ],
    highlights: [
      "Automatic noise reduction and feedback suppression",
      "Binaural listening with automatic gain control",
      "Scroll-wheel volume adjustment",
      "Replaceable batteries, no charging cable"
    ],
    formats: ["Matte black", "Matte light gray"]
  },
  {
    id: "reborn-pain-relief",
    name: "REBORN Topical Pain Relief",
    family: "REBORN",
    audience: "pipeline",
    status: "In development",
    icon: "drop",
    summary:
      "A topical analgesic cream being developed for the OTC market under the REBORN brand.",
    overview: [
      "Novexia is developing a topical pain-relief cream intended to be marketed as an OTC drug product under the REBORN brand.",
      "Active ingredients, strengths, Drug Facts labeling and availability will be published here once finalized and reviewed."
    ],
    highlights: [
      "Planned OTC topical analgesic",
      "Labeling under review",
      "Join the list for launch updates"
    ],
    formats: ["Details to follow"]
  },
  {
    id: "rx-otc-pipeline",
    name: "Rx & OTC Pipeline",
    family: "Novexia Biopharma",
    audience: "pipeline",
    status: "Under evaluation",
    icon: "pipeline",
    summary:
      "Manufacturer-partner and private-label prescription, OTC and medical-device products under evaluation for domestic trade.",
    overview: [
      "Novexia is evaluating additional prescription, OTC and medical-device products through manufacturer and private-label partnerships for domestic distribution.",
      "Pipeline products are not approved or launched Novexia products. Novexia does not plan to carry controlled substances."
    ],
    highlights: [
      "Prescription and OTC drug lines",
      "Medical devices",
      "No controlled substances planned",
      "Manufacturer partnership inquiries welcome"
    ],
    formats: ["Details to follow"]
  }
];
