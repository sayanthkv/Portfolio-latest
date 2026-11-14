// All portfolio content lives here, separate from the UI components.
// Configured for Sayanth KV — MERN Stack Developer

export const profile = {
  name: "Sayanth KV",
  wordmark: "SAYANTH.KV",
  role: "MERN Stack Developer",
  status: "BCA Graduate | MERN Stack Developer | Fresher",
  careerObjective:
    "Seeking MERN Stack Developer opportunities, including junior developer positions and internships.",
  location: "Kannur, Kerala, India",
  email: "Sayanthsajeev363@gmail.com",
  phone: "+91 8592098078",
  phoneHref: "tel:+918592098078",
  linkedin: "https://www.linkedin.com/in/sayanth-thedeveloper",
  github: "https://github.com/sayanthkv",
  resumePdf: "/Sayanth_KV_Resume.pdf",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export type ProjectLink = {
  label: string;
  href: string;
  isExternal?: boolean;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  type: string;
  overview: string;
  description: string;
  technologies: string[];
  portals?: { name: string; features: string[] }[];
  features: string[];
  engineeringHighlights: string[];
  links: ProjectLink[];
  flagship?: boolean;
  deploymentNote?: string;
};

export const projects: Project[] = [
  {
    id: "parkora",
    number: "01",
    title: "Parkora",
    category: "Full-Stack MERN Application",
    subtitle: "Smart Urban Parking Management Platform.",
    type: "Smart Urban Parking Management Platform",
    overview:
      "Parkora is a smart urban parking management platform modeled around Kannur, Kerala. The platform helps drivers discover parking facilities, check parking availability, view pricing and reserve parking slots for selected time intervals.",
    description:
      "A complete smart parking solution designed around three dedicated user experiences: Customer Portal, Staff Portal, and Admin Dashboard. Implements MongoDB atomic transactions to prevent double bookings during concurrent reservation requests, alongside QR ticket verification and JWT-based role access control.",
    technologies: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express 5",
      "MongoDB Atlas",
      "Mongoose",
      "Recharts",
      "Lucide React",
    ],
    portals: [
      {
        name: "Customer Portal",
        features: [
          "Discover nearby parking facilities in Kannur",
          "Real-time parking availability & dynamic hourly pricing",
          "Reserve parking slots for selected time intervals",
          "Digital booking tickets with QR verification",
          "Profile and vehicle management",
          "Paginated booking and payment history",
        ],
      },
      {
        name: "Staff Portal",
        features: [
          "QR ticket scanner and verification",
          "Gate check-in and check-out workflows",
          "Walk-in spot bookings management",
          "Assigned facility bay monitoring",
          "Duty shift status and activity updates",
        ],
      },
      {
        name: "Admin Dashboard",
        features: [
          "Live facility occupancy and revenue analytics",
          "Interactive revenue charts and usage metrics",
          "Parking facility, floor, and bay management",
          "Staff management and shift assignments",
          "Comprehensive system activity logs",
        ],
      },
    ],
    features: [
      "Multi-portal architecture (Customer, Staff, Admin)",
      "Real-time parking slot discovery & reservation",
      "MongoDB transactions preventing race conditions & double bookings",
      "Digital booking tickets with QR verification",
      "Gate check-in/out workflows for staff",
      "Admin occupancy and revenue analytics charts",
      "JWT authentication and Role-Based Access Control (RBAC)",
      "Full-stack cloud deployment on Vercel and Render",
    ],
    engineeringHighlights: [
      "Atomic MongoDB Transactions: Enforces isolated session transactions during slot reservation to eliminate race conditions and double bookings under concurrent traffic.",
      "Role-Based Access Control (RBAC): Strict middleware layer distinguishing customer, staff, and admin privileges with signed JWT tokens.",
      "Multi-Experience Architecture: Tailored user interfaces optimized for customer convenience, fast staff scanning, and detailed administrative oversight.",
      "Resilient REST API: Modular Express 5 backend with input validation, error handling, and MongoDB Atlas database connection pooling.",
    ],
    links: [
      { label: "Live Demo", href: "https://parkora-kannur.vercel.app/", isExternal: true },
      { label: "Backend API", href: "https://parkora-61zo.onrender.com/", isExternal: true },
      { label: "GitHub Profile", href: "https://github.com/sayanthkv", isExternal: true },
    ],
    flagship: true,
  },
  {
    id: "hirezone",
    number: "02",
    title: "HireZone",
    category: "Full-Stack MERN Application",
    subtitle: "Full-Stack Job Portal.",
    type: "Job Portal Platform",
    overview:
      "HireZone is a full-stack job portal connecting students and recruiters. It provides separate experiences for students and recruiters with authentication, job management and application workflows.",
    description:
      "Engineered with custom authentication middleware and role-based route protection. Students can search, filter, and apply for roles with enforced application uniqueness, while recruiters manage listings and review candidate submissions.",
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "REST APIs",
    ],
    features: [
      "Student and recruiter registration & profiles",
      "JWT-based authentication with protected routes",
      "Role-based authorization (Student / Recruiter)",
      "Recruiter job posting, editing, and listing management",
      "Real-time job search and multi-criteria filtering",
      "Student job application workflow",
      "Recruiter ownership validation for postings",
      "Application uniqueness enforcement per candidate",
    ],
    engineeringHighlights: [
      "Custom Auth Middleware: Validates JWT tokens and injects verified user identity into request pipelines.",
      "Role-Based Route Protection: Shields student application routes and recruiter management panels independently.",
      "Data Integrity: Enforces unique compound indexes on applications to prevent duplicate submissions.",
      "Server-Side Validation: Validates incoming payloads to ensure consistent job post and profile schemas.",
    ],
    links: [
      { label: "GitHub Profile", href: "https://github.com/sayanthkv", isExternal: true },
    ],
    deploymentNote: "Deployed on Vercel (Frontend) & Render (Backend). Repository link available on request.",
  },
  {
    id: "fragranzia",
    number: "03",
    title: "Fragranzia",
    category: "Full-Stack E-commerce Application",
    subtitle: "Perfume E-commerce Platform.",
    type: "Perfume Shopping Platform",
    overview:
      "Fragranzia is a perfume shopping platform built to provide a modern, seamless product browsing and e-commerce shopping experience.",
    description:
      "Built with a responsive React frontend and REST API integration. Features comprehensive product catalogs, category filtering, persistent shopping cart, wishlist functionality, user authentication, and address management.",
    technologies: [
      "React",
      "JavaScript",
      "Bootstrap",
      "REST APIs",
      "JWT Authentication",
    ],
    features: [
      "Curated product catalog & fragrance collections",
      "Category-based filtering and search",
      "Interactive wishlist management",
      "Persistent shopping cart workflow",
      "User authentication and session security",
      "User profile and saved shipping addresses",
      "Clean REST API integration",
    ],
    engineeringHighlights: [
      "Client State Management: Smooth cart and wishlist interactions with immediate UI feedback.",
      "RESTful API Integration: Efficient communication with product and user management backend services.",
      "Responsive Catalog Design: Clean editorial product showcase optimized across desktop and mobile devices.",
    ],
    links: [
      { label: "GitHub Profile", href: "https://github.com/sayanthkv", isExternal: true },
    ],
    deploymentNote: "Deployed on cloud hosting. Repository and live preview available on request.",
  },
];

export const skillGroups = [
  {
    label: "Frontend Development",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Bootstrap", "Tailwind CSS"],
  },
  {
    label: "Backend Development",
    items: ["Node.js", "Express.js", "REST API Development", "API Integration"],
  },
  {
    label: "Database",
    items: ["MongoDB", "Mongoose"],
  },
  {
    label: "Authentication & Concepts",
    items: [
      "JWT Authentication",
      "Role-Based Access Control (RBAC)",
      "CRUD Operations",
      "Database Transactions",
      "Protected Routes",
      "Authorization",
    ],
  },
  {
    label: "Development Tools",
    items: ["Git", "GitHub", "Postman", "Vercel", "Render", "Figma"],
  },
];

export type ArchitecturePractice = {
  number: string;
  domain: string;
  title: string;
  summary: string;
  highlights: string[];
};

export const architecturePractices: ArchitecturePractice[] = [
  {
    number: "01",
    domain: "Concurrency & Integrity",
    title: "Atomic Transactions & Race Condition Handling",
    summary:
      "Preventing double-booking and data collision during concurrent user actions through isolated MongoDB multi-document session transactions.",
    highlights: ["MongoDB Session Transactions", "ACID Guarantees", "Conflict Resolution"],
  },
  {
    number: "02",
    domain: "Security & Access",
    title: "Role-Based Access Control (RBAC) & Route Guards",
    summary:
      "Custom authentication middleware validating signed JWT payloads to strictly partition customer, staff, and admin privileges across endpoints.",
    highlights: ["JWT Token Verification", "Custom Auth Middleware", "Protected API Routes"],
  },
  {
    number: "03",
    domain: "System Architecture",
    title: "Multi-Portal Workflows & Domain Separation",
    summary:
      "Decoupling distinct user experiences—customer self-service, real-time gate staff scanning, and administrative analytics—over a shared, unified backend.",
    highlights: ["Role Separation", "Unified Database Schema", "Targeted Portals"],
  },
  {
    number: "04",
    domain: "API Engineering",
    title: "Modular REST APIs & Centralized Error Handling",
    summary:
      "Structured Express 5 controller pipelines with server-side validation, deterministic HTTP status codes, and centralized error handling middleware.",
    highlights: ["Modular Route Architecture", "Error Boundary Middleware", "Clean Response Schemas"],
  },
  {
    number: "05",
    domain: "Database Modeling",
    title: "Mongoose Schema Design & Query Indexing",
    summary:
      "Designing relational integrity in document collections, leveraging compound indexes for fast search and paginated data retrieval.",
    highlights: ["Compound Indexing", "Data Relationships", "Paginated Queries"],
  },
  {
    number: "06",
    domain: "Cloud Delivery",
    title: "Full-Stack Deployment & Production Pipelines",
    summary:
      "Configuring automated continuous deployment environments across Vercel for client applications and Render for backend web services.",
    highlights: ["Vercel SPA Hosting", "Render Backend Services", "Atlas Cloud Clustering"],
  },
];

export const engineeringAreas = [
  { title: "Frontend Engineering", tech: ["React.js", "Tailwind CSS", "Bootstrap", "JavaScript (ES6+)"] },
  { title: "Backend Architecture", tech: ["Node.js", "Express.js", "REST APIs", "Middleware"] },
  { title: "Database Systems", tech: ["MongoDB", "Mongoose", "Transactions", "Schemas"] },
  { title: "Authentication & Security", tech: ["JWT Auth", "RBAC", "Protected Routes", "Authorization"] },
  { title: "API Integration & Design", tech: ["RESTful Endpoints", "Postman", "CRUD Workflows"] },
  { title: "Deployment & Versioning", tech: ["Vercel", "Render", "Git", "GitHub"] },
];

export const journey = [
  {
    kind: "Internship",
    title: "MERN Stack Developer Intern",
    place: "Softroniics",
    location: "Calicut, Kerala",
    period: "Internship",
    description:
      "Gained hands-on experience developing full-stack web applications using the MERN stack. Worked with React frontends, Express.js REST APIs, MongoDB database schemas, authentication workflows, and practical application features.",
  },
  {
    kind: "Education",
    title: "Bachelor of Computer Applications (BCA)",
    place: "Yenepoya (Deemed to be) University",
    location: "Graduated (2023–2026)",
    period: "2023–2026",
    description:
      "Graduated with a solid foundation in computer science, software development, data structures, and web technologies.",
  },
];

export const philosophyQuote = {
  quote:
    "I believe good software is more than making something work. It's about understanding the problem, designing the right solution, and building something reliable.",
  interests: [
    "Building full-stack applications",
    "Understanding backend architecture",
    "Designing practical application workflows",
    "Working with databases and APIs",
    "Solving implementation problems",
    "Learning new development technologies",
  ],
};

export const aboutContent = {
  headline: [
    "I don't just build applications.",
    "I build systems that solve",
    "real problems.",
  ],
  foundation: [
    "I'm Sayanth KV, a BCA graduate and MERN Stack Developer from Kerala, India.",
    "I enjoy building full-stack web applications and transforming practical ideas into functional digital products.",
    "My development experience includes working with React, JavaScript, Node.js, Express.js and MongoDB, along with implementing REST APIs, authentication, authorization and database operations.",
    "I've worked on projects involving real-world workflows, multiple user roles, application architecture and deployment.",
    "I'm continuously improving my development skills and looking for opportunities where I can contribute, learn from experienced developers and grow as a software engineer.",
  ],
};

export const stackMarquee = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Tailwind CSS",
  "JWT Auth",
  "REST APIs",
  "Mongoose",
  "Vercel",
  "Render",
  "Git & GitHub",
  "Postman",
];
