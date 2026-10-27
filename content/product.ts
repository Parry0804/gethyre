import type { Phase } from "@/content/journey";

export type DemoName = "profile" | "assessment" | "interview" | "report" | "roadmap" | "cv" | "jobready" | "jobs" | "dashboard";

export type Module = {
  id: string;
  phase: Phase | "Track";
  tab: string;
  title: string;
  summary: string;
  demo: DemoName;
  screen?: { src: string; alt: string };
  /** What the student does. */
  youDo: string[];
  /** What they get back. */
  youGet: string[];
};

/** Every part of the app, in journey order. Drives the home product tour and the Product page. */
export const modules: Module[] = [
  {
    id: "profile",
    phase: "Diagnose",
    tab: "Profile",
    title: "Start with the job you want",
    summary: "Tell us your course, graduation year and target role. Everything after this is built for that role.",
    demo: "profile",
    screen: { src: "/screens/basics.webp", alt: "Profile screen asking for name, target role, graduation year and college" },
    youDo: ["Pick a target role from the roles we cover", "Add your college, course and graduation year", "Choose the full journey or go straight to jobs"],
    youGet: ["An assessment set for that role", "A home screen that shows where you are in the journey"],
  },
  {
    id: "assessment",
    phase: "Diagnose",
    tab: "Assessment",
    title: "A skill assessment that shows how you think",
    summary: "Scenario questions set for your target role, not a generic aptitude test. It finds what you can already do and what you can't yet.",
    demo: "assessment",
    screen: { src: "/screens/assessment.webp", alt: "Skill assessment question with four answer options" },
    youDo: ["Answer role-specific, scenario-based questions", "Work through at your own pace, with progress saved", "Retake it later to prove how far you've come"],
    youGet: ["A score for every skill the role needs", "Your gaps, ranked from high to low"],
  },
  {
    id: "interview",
    phase: "Diagnose",
    tab: "Mock interview",
    title: "An AI mock interview that asks follow-ups",
    summary: "A 10-minute practice interview that listens to your answers and digs deeper, the way a real panel does.",
    demo: "interview",
    screen: { src: "/screens/interview.webp", alt: "Practice interview chat with the student typing an answer" },
    youDo: ["Answer questions for your target role", "Handle follow-ups based on what you said", "Practise again to see your answers improve"],
    youGet: ["Feedback on clarity, structure and impact", "Interview skills added to your skill report"],
  },
  {
    id: "report",
    phase: "Diagnose",
    tab: "Skill report",
    title: "One report: your readiness and your gaps",
    summary: "Your assessment and interview become one readiness score, with your biggest gaps first and what the role expects.",
    demo: "report",
    screen: { src: "/screens/report.webp", alt: "Skill report with a readiness score of 75 and skill gaps ranked" },
    youDo: ["Read your readiness score out of 100", "See each gap marked high, medium or low", "Compare yourself with what the role needs"],
    youGet: ["A clear answer to \"where do I stand?\"", "The input for your personal roadmap"],
  },
  {
    id: "roadmap",
    phase: "Train",
    tab: "Roadmap",
    title: "A roadmap built from your gaps",
    summary: "Month-by-month tasks that close your biggest gaps first, with progress you can see and a reassessment at the end.",
    demo: "roadmap",
    screen: { src: "/screens/plan.webp", alt: "Personal plan with a month-by-month breakdown of tasks" },
    youDo: ["Follow weekly tasks and learning picks", "Tick off work as you go", "Retake the assessment when the roadmap is done"],
    youGet: ["Prep time spent only where it matters", "A readiness score that rises as you train"],
  },
  {
    id: "cv",
    phase: "Train",
    tab: "ATS-ready CV",
    title: "An ATS-ready CV, tailored to each job",
    summary: "Your CV is generated from your proven skills and projects, then tuned for each job you apply to.",
    demo: "cv",
    youDo: ["Generate a CV from your profile and roadmap work", "Optionally improve it with suggestions", "Get a tailored version for every matched job"],
    youGet: ["A CV that passes applicant tracking systems", "Keywords that are true to your skills"],
  },
  {
    id: "jobready",
    phase: "Train",
    tab: "Job-ready check",
    title: "A clear job-ready check",
    summary: "Three checks tell you when you're ready: a readiness score of 70 or more, no high gaps left, and an ATS-ready CV.",
    demo: "jobready",
    screen: { src: "/screens/job-ready.webp", alt: "Job-ready screen showing three checks passed" },
    youDo: ["Watch each check turn green as you train", "See exactly what's left before you apply"],
    youGet: ["Matched jobs unlocked", "Confidence that you're ready, not a guess"],
  },
  {
    id: "jobs",
    phase: "Place",
    tab: "Job matches",
    title: "Jobs matched to your skills, not keywords",
    summary: "Jobs are ranked by the skills you proved in your assessment and interview, with a match score and a tailored CV for each.",
    demo: "jobs",
    screen: { src: "/screens/home-place.webp", alt: "Home screen showing 12 jobs that match the student's skills" },
    youDo: ["Browse jobs ranked by your match score", "Apply with a CV tailored to the role", "Get placement support along the way"],
    youGet: ["Fewer, better-fit applications", "Employers who see your assessed skills"],
  },
  {
    id: "dashboard",
    phase: "Track",
    tab: "Dashboard",
    title: "Your whole journey on one dashboard",
    summary: "Readiness over time, gaps closed, roadmap progress, interviews and applications, all in one place.",
    demo: "dashboard",
    youDo: ["Check your readiness trend week by week", "See what to do next, every time you open the app"],
    youGet: ["Proof of progress you can show a recruiter", "No more scattered tools and spreadsheets"],
  },
];

/** The short version used in the home page tour. */
export const tourIds = ["assessment", "interview", "report", "roadmap", "cv", "jobs"] as const;
