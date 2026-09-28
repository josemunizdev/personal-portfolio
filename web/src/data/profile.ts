// Single source of truth for site content. Edit this file to update the site;
// components only handle layout.

export type Link = { label: string; href: string };

export type Metric = { value: string; label: string; detail: string };

export type Role = {
  title: string;
  org: string;
  location: string;
  start: string;
  end: string;
  groups: { heading?: string; points: string[] }[];
};

export type SkillGroup = { name: string; items: string[] };

export type Project = {
  name: string;
  summary: string;
  stack: string[];
  context: string;
  year: string;
  repo?: string;
  note?: string;
};

export const profile = {
  name: "José R. Muñiz",
  shortName: "José Muñiz",
  headline: "Enterprise Integration Developer",
  subhead:
    "MuleSoft, PeopleSoft Campus Solutions, Oracle Fusion Cloud, and Salesforce. I build the APIs and pipelines that keep a university's systems talking to each other.",
  location: "Milwaukee, WI / Chicago, IL",
  email: "jobs@josemuniz.dev",
  links: {
    github: { label: "GitHub", href: "https://github.com/josemunizdev" },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jose-r-muniz",
    },
  },
  badge: "Salesforce Certified MuleSoft Developer II",

  about: [
    "I own MuleSoft delivery end to end at DePaul University: API design and naming standards, DataWeave transformation, CI/CD across Dev, UAT, and Production, and production support for the integrations connecting PeopleSoft Campus Solutions, Oracle Fusion Cloud HCM, Salesforce, and third-party SaaS.",
    "I work directly with registrar, financial aid, HR, student financial services, and public safety staff to turn business requirements into integrations that someone else can support at 2 a.m. I was the first person at the university to earn MuleSoft Developer II, and I'm working toward MuleSoft Platform Integration Architect.",
    "Outside of work I'm finishing a graduate degree in software engineering with a focus on AI, which is where the MLOps projects below come from. I grew up in Guadalajara and work fluently in Spanish and English.",
  ],

  metrics: <Metric[]>[
    {
      value: "1,810 → 27",
      label: "Federal reporting errors",
      detail:
        "Rebuilt National Student Clearinghouse enrollment reporting; manual correction dropped from ~35 hours per cycle to 1.",
    },
    {
      value: "44",
      label: "APIs on my CI/CD pipeline",
      detail:
        "GitHub Actions template now used by three university teams, with MUnit tests on every build.",
    },
    {
      value: "3 h → 2 m",
      label: "Emergency alert query",
      detail:
        "Rewrote the population query behind the Everbridge mass-notification integration (98.7% faster).",
    },
    {
      value: "13 APIs",
      label: "Website launch integration layer",
      detail:
        "Primary technical owner for a presidential-priority go-live syncing ~70,000 contact records.",
    },
  ],

  experience: <Role[]>[
    {
      title: "ERP Developer / Business Analyst",
      org: "DePaul University",
      location: "Chicago, IL",
      start: "Jul 2022",
      end: "Present",
      groups: [
        {
          heading: "API platform and CI/CD",
          points: [
            "Designed, built, and own the MuleSoft CI/CD pipeline that promotes 44 production APIs across Dev, UAT, and Production with automated MUnit testing, replacing a 3 to 5 hour manual debugging cycle per release.",
            "Packaged it as a GitHub Actions template repository adopted by Student Systems, Administrative Systems, and Advancement: JDK provisioning, dependency caching, Azure Key Vault auth, environment resolution, Exchange publication, and CloudHub deployment.",
            "Implemented dynamic API autodiscovery across Mule 4 applications so every deployed service is registered and governed in API Manager without manual per-environment setup.",
            "Instrumented MuleSoft applications with Azure Log Analytics for production monitoring and incident triage.",
          ],
        },
        {
          heading: "Enterprise website integration launch",
          points: [
            "Primary technical owner of the 13-API MuleSoft layer connecting the new university website to Salesforce and PeopleSoft. Defined API naming conventions and served as principal technical liaison to Deloitte and Cloud4Good.",
            "Carried go-live and nine days of hypercare, including overnight monitoring, with no integration-related disruption.",
          ],
        },
        {
          heading: "Student data, reporting, and campus systems",
          points: [
            "Rebuilt National Student Clearinghouse enrollment reporting over seven months, cutting validation exceptions from 1,810 to 27 across populations of 8,200 to 25,000+ students.",
            "Built a Python validation framework that maps reported errors to exact fields and byte positions, then transferred it to five teammates.",
            "Own or support eight production integrations, plus three .NET integrations moving payroll and HR data from PeopleSoft into Oracle Fusion Cloud HCM.",
          ],
        },
        {
          heading: "Leadership",
          points: [
            "Mentor senior developers across teams on MuleSoft development, deployment, and troubleshooting.",
            "Primary contributor to the Information Services AI working group on responsible adoption and governance. Member of the HEUG Institutions on the Cloud user group.",
          ],
        },
      ],
    },
    {
      title: "Service Desk Specialist",
      org: "DePaul University",
      location: "Chicago, IL",
      start: "Mar 2021",
      end: "Jul 2022",
      groups: [
        {
          points: [
            "Supported a community of 225,000+ students, faculty, staff, and alumni; routed escalations through ServiceNow and served as the sole Spanish-language technical contact for an international student cohort.",
          ],
        },
      ],
    },
    {
      title: "IT Support Specialist / Relationship Manager",
      org: "Digital Currency Systems",
      location: "Northbrook, IL",
      start: "Sep 2020",
      end: "Mar 2021",
      groups: [],
    },
    {
      title: "Software Developer in Test",
      org: "Beulah Inc.",
      location: "Hammond, IN",
      start: "Jan 2019",
      end: "May 2019",
      groups: [
        {
          points: [
            "Built UML design specifications and managed source control through Git and Atlassian tooling.",
          ],
        },
      ],
    },
  ],

  skills: <SkillGroup[]>[
    {
      name: "Integration platform",
      items: [
        "MuleSoft Anypoint Platform",
        "Mule 4",
        "DataWeave",
        "RAML",
        "API Manager",
        "Anypoint Exchange",
        "CloudHub 2.0",
        "MUnit",
      ],
    },
    {
      name: "Enterprise systems",
      items: [
        "PeopleSoft Campus Solutions",
        "Oracle Fusion Cloud HCM",
        "Salesforce",
        "Ellucian Banner",
      ],
    },
    {
      name: "CI/CD and cloud",
      items: [
        "GitHub Actions",
        "Azure Key Vault",
        "Azure Log Analytics",
        "Azure DevOps",
        "Maven",
        "Git",
      ],
    },
    {
      name: "Languages",
      items: [
        "Python",
        "SQL (Oracle)",
        "C# / .NET",
        "DataWeave",
        "PeopleCode",
        "SQR",
        "JavaScript / TypeScript",
      ],
    },
    {
      name: "ML and data",
      items: ["scikit-learn", "MLflow", "DVC", "FastAPI", "Docker", "Jupyter", "R"],
    },
    {
      name: "Patterns and practice",
      items: [
        "REST and SOAP",
        "Hybrid cloud integration",
        "Error handling design",
        "Environment promotion",
        "Root cause analysis",
        "Technical documentation",
      ],
    },
  ],

  projects: <Project[]>[
    {
      name: "MuleSoft CI/CD Template",
      summary:
        "Reusable GitHub Actions pipeline that builds, tests, publishes, and deploys Mule 4 applications to CloudHub 2.0, with secrets pulled from Azure Key Vault at run time.",
      stack: ["GitHub Actions", "Maven", "MUnit", "Azure Key Vault", "CloudHub 2.0"],
      context: "DePaul University",
      year: "Current",
      note: "Internal to DePaul. Code not public.",
    },
    {
      name: "Food on the Fly",
      summary:
        "End-to-end MLOps project predicting food delivery times from ~45,000 Zomato orders, with DVC-tracked data, MLflow experiment tracking, and a FastAPI inference endpoint.",
      stack: ["Python", "scikit-learn", "DVC", "MLflow", "FastAPI", "Docker"],
      context: "Graduate team project",
      year: "2026",
      repo: "https://github.com/josemunizdev/food_on_the_fly",
    },
    {
      name: "Face Recognition Brain",
      summary:
        "Full-stack app that detects faces in submitted images through the Clarifai API, with user accounts, hashed passwords, and a per-user submission count.",
      stack: ["React", "Node.js", "Express", "PostgreSQL", "Knex", "bcrypt"],
      context: "Personal project",
      year: "2020",
      repo: "https://github.com/josemunizdev/face-recognition-brain",
    },
    {
      name: "Face Recognition Brain API",
      summary:
        "Express and PostgreSQL back end for Face Recognition Brain: sign-in, registration, profile lookup, and a proxy to the Clarifai face detection model.",
      stack: ["Node.js", "Express", "PostgreSQL", "Knex"],
      context: "Personal project",
      year: "2020",
      repo: "https://github.com/josemunizdev/face-recognition-brain-api",
    },
    {
      name: "Neural Networks vs. Algorithms for Face Tracking",
      summary:
        "CS420 project benchmarking a Caffe CNN face detector against trained Haar cascade classifiers on images, video, and a Raspberry Pi camera, with timing logs for each approach.",
      stack: ["Python", "OpenCV", "Caffe", "Raspberry Pi"],
      context: "Undergraduate coursework",
      year: "2020",
      repo: "https://github.com/josemunizdev/Performance-between-Neural-Networks-and-Algorithmns-with-face-tracking",
    },
    {
      name: "Data Mining in R",
      summary:
        "Labs and assignments covering regression, subset selection, and Box-Cox transformations on classic datasets (Auto MPG, Iris, Wisconsin breast cancer).",
      stack: ["R"],
      context: "Purdue University Northwest",
      year: "2019",
      repo: "https://github.com/josemunizdev/DataMining_Rcode",
    },
    {
      name: "RoboFriends",
      summary:
        "React and Redux app with live search filtering, an error boundary, and a scrollable card grid.",
      stack: ["React", "Redux", "JavaScript"],
      context: "Personal project",
      year: "2020",
      repo: "https://github.com/josemunizdev/RoboFriends",
    },
    {
      name: "CS180 Project 4 Server",
      summary:
        "Multithreaded socket server for a multiplayer quiz game: user logins, game sessions, and question rotation. Co-written for Purdue CS180.",
      stack: ["Java"],
      context: "Coursework",
      year: "2016",
      repo: "https://github.com/josemunizdev/Project-4---Server",
    },
  ],

  certifications: [
    { name: "Salesforce Certified MuleSoft Developer II", status: "Earned" },
    { name: "Salesforce Certified MuleSoft Developer I", status: "Earned" },
    {
      name: "Salesforce Certified MuleSoft Platform Integration Architect",
      status: "In progress",
    },
    { name: "Google IT Support Professional Certificate", status: "Earned" },
  ],

  education: [
    {
      degree: "M.S. Software Engineering, AI in Software Engineering concentration",
      school: "DePaul University, Jarvis College of Computing and Digital Media",
      year: "In progress",
    },
    {
      degree: "B.S. Computer Science, minors in Applied Mathematics and Spanish",
      school: "Purdue University Northwest",
      year: "2020",
    },
  ],

  languages: ["Spanish (native)", "English (fluent)"],
} as const;
