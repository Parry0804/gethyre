/**
 * Target roles shown on the home page ("Roles we prepare you for").
 * Keep this list in step with the roles the app's assessment covers.
 * Each role: up to 6 skills assessed and up to 5 tools.
 * To add a role, copy an entry below; the home page updates automatically.
 */
export type Role = {
  id: string;
  name: string;
  field: "Tech" | "Data" | "Design" | "Business";
  summary: string;
  skills: string[];
  tools: string[];
};

export const roles: Role[] = [
  {
    id: "software-developer",
    name: "Software developer",
    field: "Tech",
    summary: "Builds and fixes the code behind apps and services.",
    skills: ["Data structures and algorithms", "Object-oriented programming", "DBMS and SQL", "Operating system and networking basics", "Debugging and testing", "Writing clean, readable code"],
    tools: ["Java", "Python", "C++", "Git", "VS Code"],
  },
  {
    id: "web-developer",
    name: "Full stack developer",
    field: "Tech",
    summary: "Ships complete web features, from the screen to the database.",
    skills: ["HTML, CSS and JavaScript", "Front-end frameworks", "REST APIs and back-end logic", "Databases and data modelling", "Version control", "Deployment basics"],
    tools: ["React", "Node.js", "MongoDB", "PostgreSQL", "Git"],
  },
  {
    id: "data-analyst",
    name: "Data analyst",
    field: "Data",
    summary: "Turns raw data into answers the business can act on.",
    skills: ["SQL querying", "Spreadsheet analysis", "Statistics fundamentals", "Data cleaning", "Dashboards and visualisation", "Explaining insights clearly"],
    tools: ["Excel", "SQL", "Python", "Power BI", "Tableau"],
  },
  {
    id: "data-scientist",
    name: "Data scientist / ML",
    field: "Data",
    summary: "Builds models that predict, classify and recommend.",
    skills: ["Python for data", "Probability and statistics", "Machine learning algorithms", "Feature engineering", "Model evaluation", "Framing business problems"],
    tools: ["Python", "pandas", "scikit-learn", "Jupyter", "SQL"],
  },
  {
    id: "product-designer",
    name: "Product / UX designer",
    field: "Design",
    summary: "Designs products people find easy and useful.",
    skills: ["User research", "Information architecture", "Wireframing and prototyping", "Visual and interaction design", "Usability testing", "Presenting design decisions"],
    tools: ["Figma", "FigJam", "Maze", "Notion"],
  },
  {
    id: "business-analyst",
    name: "Business analyst",
    field: "Business",
    summary: "Connects business needs with the teams that build solutions.",
    skills: ["Requirement gathering", "Process mapping", "Data analysis", "Writing specs and user stories", "Stakeholder communication", "Problem structuring"],
    tools: ["Excel", "SQL", "Jira", "Power BI"],
  },
  {
    id: "digital-marketing",
    name: "Digital marketing",
    field: "Business",
    summary: "Grows audiences and leads across search, social and email.",
    skills: ["SEO and content", "Paid search and social ads", "Social media strategy", "Email marketing", "Campaign analytics", "Copywriting"],
    tools: ["Google Ads", "Meta Ads", "Google Analytics", "Canva"],
  },
  {
    id: "sales-bd",
    name: "Sales / business development",
    field: "Business",
    summary: "Finds new customers and turns conversations into deals.",
    skills: ["Prospecting and lead research", "Discovery calls", "Pitching and objection handling", "Negotiation", "Pipeline management", "Written follow-ups"],
    tools: ["CRM tools", "LinkedIn", "Excel", "Email"],
  },
];

/** Assessed for every role, through the AI mock interview. */
export const commonSkills = ["Communication", "Problem solving", "Interview presence"];
