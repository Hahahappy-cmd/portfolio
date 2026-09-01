// Content sourced directly from Happy Prajapati's resume.
// Links marked TODO are placeholders — swap in real GitHub/GitLab URLs.

export const profile = {
  name: "Happy Prajapati",
  role: "AI/ML Engineer & Full-Stack Developer",
  location: "Calgary, AB",
  phone: "(753) 881-3699",
  email: "happyprajapati100904@gmail.com",
  linkedin: "https://www.linkedin.com/in/happy-prajapati-151999359/",
  github: "https://github.com/Hahahappy-cmd",
  gitlab: "https://csgit.ucalgary.ca/happy.prajapati",
  resumeUrl: "/Happy-Prajapati-Resume.pdf",
};

export const stats = [
  { value: "96.8%", label: "Model accuracy, DANSA Lab CV pipeline" },
  { value: "6", label: "Deep learning architectures benchmarked" },
  { value: "50+", label: "Automated test programs, compiler suite" },
  { value: "5", label: "Engineers led, OMG platform team" },
];

export const skillGroups = [
  {
    label: "Languages & Web",
    icon: "code",
    skills: [
      "Python",
      "SQL",
      "Java",
      "C",
      "JavaScript",
      "TypeScript",
      "HTML/CSS",
      "ReactJS",
      "Next.js",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
    ],
  },
  {
    label: "Machine Learning & AI",
    icon: "brain",
    skills: ["TensorFlow", "PyTorch", "Keras", "CNN", "Computer Vision", "Deep Learning", "Pandas", "NumPy"],
  },
  {
    label: "Backend & Cloud",
    icon: "server",
    skills: ["RESTful APIs", "FastAPI", "PostgreSQL", "MySQL", "AWS Lambda"],
  },
  {
    label: "Tools & DevOps",
    icon: "wrench",
    skills: ["Git", "GitHub", "GitLab", "Linux", "CI/CD Pipeline", "Vercel"],
  },
  {
    label: "Testing & QA",
    icon: "flask",
    skills: ["Pytest", "Integration Testing", "Unit Testing", "SDLC"],
  },
  {
    label: "AI Tools & Development",
    icon: "sparkles",
    skills: ["GitHub Copilot", "ChatGPT", "Claude", "LLMs", "Prompt Engineering", "Generative AI"],
  },
];

export const education = [
  {
    degree: "Bachelor of Science, Computer Science",
    school: "University of Calgary, Alberta",
    dates: "Sept 2024 – Present",
    details: ["Minor in Mathematics", "Science Co-op Program"],
  },
  {
    degree: "Bachelor of Science, Computer Science",
    school: "University of Ottawa, Ontario",
    dates: "Sept 2023 – Apr 2024",
    details: ["First year — transferred to University of Calgary"],
  },
];

export const experience = [
  {
    role: "Undergraduate Researcher",
    org: "DANSA Lab, University of Calgary",
    location: "Calgary, AB",
    dates: "Jan 2026 – Present",
    bullets: [
      "Achieved 96.81% accuracy building and deploying a production-quality Python deep learning pipeline to ingest, process, and classify large-scale unstructured video datasets for real-time anomaly detection.",
      "Benchmarked six deep learning architectures (EfficientNetB0, VGG16, DenseNet121, ResNet50, MobileNetV2, EfficientNetB2L) for video frame image classification and accuracy configurations to identify the optimal model.",
      "Applied an evaluation-driven approach using ROC/PR curves and validation metrics to define benchmarks, identify failure modes, and improve AI pipeline performance across experimental configurations.",
    ],
  },
  
];

// Applied software engineering — distinct from the research/publications section below.
// Ordered newest → oldest by start date.
export const projects = [
  {
    id: "mindmate",
    number: "01",
    name: "MindMate — AI-Powered Mental Wellness Journal",
    course: "Personal Project",
    dates: "Nov 2025 - Present",
    team: "Solo project",
    tags: [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "RQ",
      "Hugging Face",
      "PyTorch",
      "SQLAlchemy",
      "Alembic",
      "Pytest"
    ],
    summary:
      "A privacy-focused AI journaling platform that analyzes journal entries using sentiment analysis, transformer-based emotion classification, and semantic theme detection to surface long-term emotional patterns and weekly insights.",
    architecture: [
      "FastAPI backend with PostgreSQL persistence, Alembic migrations, JWT authentication, refresh-token rotation, CSRF protection, and user-scoped journal CRUD.",
      "Asynchronous AI pipeline using Redis and RQ workers to run TextBlob sentiment analysis, a multi-label RoBERTa GoEmotions classifier, and MiniLM semantic embeddings outside the request cycle.",
      "Long-term analytics layer that aggregates sentiment, emotion trends, recurring themes, rolling averages, and period-over-period comparisons for dashboard and weekly insight views.",
    ],
    metrics: [
      { value: "0.864", label: "micro F1 on emotion-model evaluation fixture" },
      { value: "56", label: "automated tests passing" },
      { value: "3", label: "AI/NLP analysis layers: sentiment, emotion & themes" },
    ],
    links: {
      repo: { label: "GitHub", url: "https://github.com/Hahahappy-cmd/MindMate" }, 
    },
  },

  {
    id: "portfolio",
    number: "01",
    name: "This Portfolio",
    course: "Personal Project",
    dates: "Aug 2026",
    team: "Solo project",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
    summary:
      "This site — a Next.js portfolio with a single content-driven data file, scroll-triggered animation, and a from-scratch reload sequence, built to be easy to extend as new projects and research come in.",
    architecture: [
      "Next.js App Router site with all content sourced from one data file, so sections update without touching component code.",
      "GSAP ScrollTrigger reveals, a custom cursor, and a canvas-based starfield background, each gated behind prefers-reduced-motion checks.",
      "Horizontal scroll-snap project carousel built to scale as more case studies get added.",
    ],
    metrics: [
      { value: "Next.js 15", label: "App Router + TypeScript" },
      { value: "0", label: "ESLint / build errors at ship time" },
    ],
    links: {
      repo: { label: "GitHub", url: "https://github.com/Hahahappy-cmd/portfolio" },
      live: "https://www.happyprajapati.space/",
    },
  },
  {
    id: "compiler",
    number: "02",
    name: "Python-to-MIPS Compiler",
    course: "CPSC 411",
    dates: "Jan 2026 – Apr 2026",
    team: "Solo project",
    tags: ["Python", "Compiler Design", "MIPS Assembly", "Pytest"],
    summary:
      "A from-scratch compiler translating a Python-like source language down to MIPS assembly, covering the full pipeline from lexical analysis through low-level code generation.",
    architecture: [
      "Lexical analysis and parsing to build an AST from source input.",
      "Semantic analysis and type checking passes to catch errors before code generation.",
      "Lowering from the AST to MIPS assembly output.",
    ],
    metrics: [
      { value: "50+", label: "programs validated via automated Pytest suite" },
      { value: "MIPS", label: "target instruction set architecture" },
    ],
    links: {
      repo: { label: "GitLab", url: "https://csgit.ucalgary.ca/happy.prajapati/cpsc-411-term-project" },
    },
  },
  {
    id: "libratech",
    number: "03",
    name: "LibraTech — Library Management System",
    course: "Team Project",
    dates: "Nov 2025 – Dec 2025",
    team: "Small team",
    tags: ["HTML", "CSS", "JavaScript"],
    summary:
      "A library management system built with vanilla HTML, CSS, and JavaScript, giving readers a searchable catalog with checkout tracking and giving librarians an admin dashboard to manage inventory and due dates.",
    architecture: [
      "Catalog browsing and search interface for readers to find and check out titles.",
      "Checkout tracking to keep book availability and due dates current.",
      "Admin dashboard for librarians to manage inventory and monitor due dates.",
    ],
    metrics: [{ value: "2 views", label: "reader catalog + librarian admin dashboard" }],
    links: {
      repo: { label: "GitLab", url: "https://csgit.ucalgary.ca/princepareshbhai.pat/libra-tech" },
      live: "https://library-management-syste-b6d0e.web.app/",
    },
  },
  {
    id: "omg",
    number: "04",
    name: "OMG — Online Multiplayer Game Platform",
    course: "Team Initiative",
    dates: "March 2025 – Apr 2025",
    team: "Led a 5-person unit within a 25-student initiative",
    tags: ["Java", "Maven", "Real-time Systems", "Integration Testing"],
    summary:
      "Real-time Java components for multiplayer game-state management, matchmaking, and live leaderboard processing, built as part of a larger cross-team initiative spanning three shared games.",
    architecture: [
      "Java software components built with Maven for game-state management and matchmaking.",
      "Live leaderboard processing shared across three games developed by the wider initiative.",
      "Cross-team requirements gathering to keep shared systems compatible across game teams.",
    ],
    metrics: [
      { value: "5", label: "engineers led directly" },
      { value: "3", label: "shared games integrated" },
      { value: "25", label: "students across the initiative" },
    ],
    links: {
      repo: { label: "GitLab", url: "https://csgit.ucalgary.ca/hardik.mehta2/seng300-w25-project" },
    },
  },
  {
    id: "trustbuy",
    number: "05",
    name: "TrustBuy — Online Marketplace",
    course: "Full-Stack Application",
    dates: "Jan 2025 – Apr 2025",
    team: "Team project",
    tags: ["Django REST Framework", "MySQL", "ReactJS"],
    summary:
      "A full-stack marketplace application integrating a Django REST API backend, MySQL persistence, and a ReactJS frontend into scalable, production-ready user workflows.",
    architecture: [
      "Django REST APIs for backend logic, connected to a MySQL data layer.",
      "Functional specifications translated into reusable React components for maintainable frontend features.",
      "Refactored REST APIs and database schema to improve data transformation, scalability, and reliability.",
    ],
    metrics: [{ value: "Full-stack", label: "backend, frontend & API ownership" }],
    links: {
      repo: { label: "GitHub", url: "#" }, // TODO: add real link
    },
  },
];

// Academic research — kept visually distinct from applied engineering projects.
export const publications = [
  {
    id: "dansa-cv",
    title:
      "Suspicious Activity Identification from Video Surveillance Data using Fine-tuned Convolutional Neural Networks and EfficientNetB0",
    status: "Manuscript in preparation — under publication",
    venue: "DANSA Lab, University of Calgary",
    dates: "Jan 2026 – Present",
    summary:
      "Research building a production-quality deep learning pipeline that ingests, processes, and classifies large-scale unstructured video datasets for real-time anomaly detection, benchmarking six CNN architectures and using ROC/PR analysis to define evaluation criteria.",
    metrics: [
      { value: "96.8%", label: "peak classification accuracy" },
      { value: "6", label: "architectures benchmarked: EfficientNetB0, VGG16, DenseNet121, ResNet50, MobileNetV2, EfficientNetB2L" },
      { value: "ROC / PR", label: "evaluation methodology" },
    ],
    links: { paper: undefined as string | undefined }, // TODO: add preprint/DOI once available
  },
];

export const achievements = [
  { title: "Dean's List Recipient", org: "University of Calgary", year: "2026" },
  { title: "International Student Scholarship", org: "University of Calgary", year: "2026" },
];
