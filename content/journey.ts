export type Phase = "Diagnose" | "Train" | "Place";

export type JourneyStep = {
  n: number;
  phase: Phase;
  title: string;
  description: string;
  screen: string;
  alt: string;
};

export const phaseNotes: Record<Phase, string> = {
  Diagnose: "Find your gaps",
  Train: "Close them",
  Place: "Get hired",
};

/** The Diagnose → Train → Place journey, with the real app screen for each step. */
export const journey: JourneyStep[] = [
  {
    n: 1,
    phase: "Diagnose",
    title: "Profile and target role",
    description: "Pick the role you want. Your assessment and roadmap are built for it.",
    screen: "/screens/basics.webp",
    alt: "App screen asking for name, target role, graduation year and college",
  },
  {
    n: 2,
    phase: "Diagnose",
    title: "Skill assessment",
    description: "Role-specific, scenario-based questions that show how you think.",
    screen: "/screens/assessment.webp",
    alt: "Skill assessment question with four answer options",
  },
  {
    n: 3,
    phase: "Diagnose",
    title: "AI mock interview",
    description: "A 10-minute practice interview that asks follow-ups, like a real panel.",
    screen: "/screens/interview.webp",
    alt: "Practice interview chat with the student typing an answer",
  },
  {
    n: 4,
    phase: "Diagnose",
    title: "Your skill report",
    description: "A readiness score, your biggest gaps first, and what the role needs.",
    screen: "/screens/report.webp",
    alt: "Skill report with a readiness score of 75 and skill gaps ranked",
  },
  {
    n: 5,
    phase: "Train",
    title: "A roadmap built from your gaps",
    description: "Month-by-month tasks, progress tracking and a second assessment.",
    screen: "/screens/plan.webp",
    alt: "Personal plan with a month-by-month breakdown of tasks",
  },
  {
    n: 6,
    phase: "Train",
    title: "Job-ready check",
    description: "Readiness, no high gaps left and an ATS-ready CV unlock your jobs.",
    screen: "/screens/job-ready.webp",
    alt: "Job-ready screen showing three checks passed",
  },
  {
    n: 7,
    phase: "Place",
    title: "Matched jobs",
    description: "Jobs ranked by your assessed skills, each with a CV tailored to the role.",
    screen: "/screens/home-place.webp",
    alt: "Home screen showing 12 jobs that match the student's skills",
  },
];

export const faqs = [
  {
    q: "When does GetHyre.ai launch?",
    a: "We're piloting with partner colleges first. Join early access and you'll hear the moment it opens.",
  },
  {
    q: "Which roles does GetHyre.ai cover?",
    a: "[List the target roles and courses covered at launch.]",
  },
  {
    q: "Is this a job guarantee?",
    a: "No. We help you find and close your gaps and connect you with matched roles; the offer is yours to win.",
  },
  {
    q: "How can my college join?",
    a: "Book a call from the Colleges page and we'll walk your placement team through a pilot.",
  },
  {
    q: "Is my data safe?",
    a: "We only use your data to run your journey and never sell it. Details are in our privacy policy.",
  },
];
