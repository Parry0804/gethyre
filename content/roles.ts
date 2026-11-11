/**
 * Target roles shown in the moving role bar on the home page.
 * Keep this list in step with the roles the app's assessment covers.
 * Add or remove a line and the home page updates automatically; rows split evenly.
 */
export const industries = {
  Tech: "bg-primary",
  "Data & AI": "bg-[#7c3aed]",
  Design: "bg-[#db2777]",
  Business: "bg-[#0891b2]",
  "Marketing & Sales": "bg-amber",
  Finance: "bg-success",
  "Core Engineering": "bg-[#ea580c]",
  "Healthcare & Pharma": "bg-[#dc2626]",
} as const;

export type Industry = keyof typeof industries;

export const roles: { name: string; industry: Industry }[] = [
  // Tech
  { name: "Software developer", industry: "Tech" },
  { name: "Full stack developer", industry: "Tech" },
  { name: "Mobile app developer", industry: "Tech" },
  { name: "QA / test engineer", industry: "Tech" },
  { name: "Cloud & DevOps engineer", industry: "Tech" },
  { name: "Cybersecurity analyst", industry: "Tech" },
  // Data & AI
  { name: "Data analyst", industry: "Data & AI" },
  { name: "Data scientist", industry: "Data & AI" },
  { name: "Machine learning engineer", industry: "Data & AI" },
  { name: "Business intelligence analyst", industry: "Data & AI" },
  // Design
  { name: "Product / UX designer", industry: "Design" },
  { name: "Graphic designer", industry: "Design" },
  { name: "Motion designer", industry: "Design" },
  // Business
  { name: "Business analyst", industry: "Business" },
  { name: "Product manager", industry: "Business" },
  { name: "Management trainee", industry: "Business" },
  { name: "Operations executive", industry: "Business" },
  { name: "Supply chain analyst", industry: "Business" },
  { name: "HR & talent acquisition", industry: "Business" },
  // Marketing & Sales
  { name: "Digital marketing executive", industry: "Marketing & Sales" },
  { name: "Content writer", industry: "Marketing & Sales" },
  { name: "Social media manager", industry: "Marketing & Sales" },
  { name: "Sales & business development", industry: "Marketing & Sales" },
  { name: "Customer success executive", industry: "Marketing & Sales" },
  // Finance
  { name: "Financial analyst", industry: "Finance" },
  { name: "Investment banking analyst", industry: "Finance" },
  { name: "Accounts executive", industry: "Finance" },
  { name: "Credit analyst", industry: "Finance" },
  // Core Engineering
  { name: "Mechanical design engineer", industry: "Core Engineering" },
  { name: "Civil site engineer", industry: "Core Engineering" },
  { name: "Electrical engineer", industry: "Core Engineering" },
  { name: "Production engineer", industry: "Core Engineering" },
  // Healthcare & Pharma
  { name: "Clinical research associate", industry: "Healthcare & Pharma" },
  { name: "Medical coder", industry: "Healthcare & Pharma" },
];
