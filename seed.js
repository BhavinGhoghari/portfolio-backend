require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");
const Profile = require("./models/Profile");
const Project = require("./models/Project");
const Skill = require("./models/Skill");
const Experience = require("./models/Experience");

async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      family: 4,
    });
    console.log("✅ Connected\n");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Promise.all([
      Admin.deleteMany({}),
      Profile.deleteMany({}),
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Experience.deleteMany({}),
    ]);
    console.log("✅ Data cleared");

    // ── Admin ─────────────────────────────────────────────────
    const hash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "Admin@123",
      10,
    );
    await Admin.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL || "admin@portfolio.com",
      password: hash,
    });
    console.log("👤 Admin created");

    // ── Profile ───────────────────────────────────────────────
    await Profile.create({
      name: "Bhavin Ghoghari",
      tagline: "MERN Stack Developer",
      bio: "Frontend-focused MERN Stack Developer from Surat, Gujarat. I build fast, accessible, pixel-perfect web apps with React, Node.js & MongoDB — backed by 6 months of real-world remote internship experience.",
      location: "Surat, Gujarat, India-395004",
      email: "bhavinrghoghari@gmail.com",
      github: "https://github.com/BhavinGhoghari",
      linkedin: "https://www.linkedin.com/in/bhavin-ghoghari-1a3b29249/",
      resume:
        "https://drive.google.com/file/d/1-UZcAnF_Qaui6hbEqh0dGl3vJKBogu9l/view",
      avatarUrl: "",
      available: true,
    });
    console.log("📋 Profile created");

    // ── Skills ────────────────────────────────────────────────
    const skills = [
      // Frontend
      {
        name: "React.js",
        category: "frontend",
        level: 85,
        color: "#61dafb",
        order: 1,
      },
      {
        name: "Next.js",
        category: "frontend",
        level: 72,
        color: "#ffffff",
        order: 2,
      },
      {
        name: "JavaScript",
        category: "frontend",
        level: 88,
        color: "#facc15",
        order: 3,
      },
      {
        name: "HTML & CSS",
        category: "frontend",
        level: 92,
        color: "#f87171",
        order: 4,
      },
      {
        name: "Tailwind CSS",
        category: "frontend",
        level: 85,
        color: "#38bdf8",
        order: 5,
      },
      {
        name: "Ant Design",
        category: "frontend",
        level: 80,
        color: "#1677ff",
        order: 6,
      },
      {
        name: "Redux Toolkit",
        category: "frontend",
        level: 70,
        color: "#a78bfa",
        order: 7,
      },
      // Backend
      {
        name: "Node.js",
        category: "backend",
        level: 72,
        color: "#84cc16",
        order: 1,
      },
      {
        name: "Express.js",
        category: "backend",
        level: 70,
        color: "#68d391",
        order: 2,
      },
      {
        name: "REST APIs",
        category: "backend",
        level: 78,
        color: "#34d399",
        order: 3,
      },
      {
        name: "JWT Auth",
        category: "backend",
        level: 72,
        color: "#fbbf24",
        order: 4,
      },
      // Database
      {
        name: "MongoDB",
        category: "database",
        level: 68,
        color: "#4ade80",
        order: 1,
      },
      {
        name: "Mongoose",
        category: "database",
        level: 68,
        color: "#68d391",
        order: 2,
      },
      // Tools
      {
        name: "Git & GitHub",
        category: "tools",
        level: 82,
        color: "#f87171",
        order: 1,
      },
      {
        name: "VS Code",
        category: "tools",
        level: 90,
        color: "#38bdf8",
        order: 2,
      },
      {
        name: "Postman",
        category: "tools",
        level: 78,
        color: "#fb923c",
        order: 3,
      },
      {
        name: "Figma",
        category: "tools",
        level: 60,
        color: "#e879f9",
        order: 4,
      },
      {
        name: "Vercel",
        category: "tools",
        level: 75,
        color: "#ffffff",
        order: 5,
      },
    ];

    // await Skill.insertMany(skills);
    // console.log(`🔧 ${skills.length} skills created`);
    for (const skill of skills) {
      await Skill.create(skill);
    }
    console.log(`🔧 ${skills.length} skills created`);

    // ── Experience ────────────────────────────────────────────
    const experiences = [
      {
        role: "Frontend Developer Intern",
        company: "Bits and Volts Pvt Ltd.",
        type: "internship",
        location: "Remote",
        remote: true,
        startDate: new Date("2025-09-01"),
        endDate: new Date("2026-03-02"),
        current: false,
        description:
          "Worked as part of a cross-functional product team building and maintaining a React-based web application. Collaborated with backend developers to integrate REST APIs, participated in daily standups, and shipped production features.",
        highlights: [
          "Built a reusable React component library used across 5+ pages",
          "Integrated 10+ REST API endpoints (GET, POST, PUT, DELETE)",
          "Improved page load performance by ~30% through code splitting",
          "Resolved 20+ UI bugs reported from production",
          "Worked in 2-week Agile sprints with daily standups",
          "Collaborated async with a remote team across time zones",
        ],
        order: 1,
      },
      {
        role: "Freelance Web Developer",
        company: "Self-employed",
        type: "freelance",
        location: "Surat, Gujarat",
        remote: false,
        startDate: new Date("2026-03-01"),
        current: true,
        description:
          "Building landing pages, portfolios, and small-business websites for local clients in Surat. Handle full delivery from design to deployment.",
        highlights: [
          "Delivered 1+ client projects end-to-end",
          "Built with React Js, Next Js, Tailwind CSS, and Ant Design",
        ],
        order: 2,
      },
    ];
    for (const exp of experiences) {
      await Experience.create(exp);
    }
    // await Experience.insertMany(experiences);
    console.log("💼 Experience created");

    // ── Projects ──────────────────────────────────────────────

    const projects = [
      {
        title: "ShopWise — E-Commerce App",
        description:
          "Full-stack MERN e-commerce platform with JWT auth, product listing, cart, orders, and an admin dashboard. Integrated Razorpay for payments.",
        longDesc:
          "Built a complete e-commerce solution from scratch using the MERN stack. Features include user authentication with JWT, product catalog with filters, shopping cart, order management, and a full admin panel for managing products and orders. Integrated Razorpay payment gateway for real transactions.",
        tags: [
          "React.js",
          "Node.js",
          "Express",
          "MongoDB",
          "Razorpay",
          "Ant Design",
          "JWT",
        ],
        liveUrl: "https://shopwise.vercel.app",
        githubUrl: "https://github.com/yourname/shopwise",
        featured: true,
        status: "live",
        order: 1,
      },
      {
        title: "ConnectMe — Social Media App",
        description:
          "Social platform with posts, likes, comments, follow system, and real-time notifications via Socket.io. Image uploads via Cloudinary.",
        longDesc:
          "A full-featured social media application where users can create posts, like and comment, follow each other, and receive real-time notifications. Built with React on the frontend, Node.js/Express backend, MongoDB for data, and Socket.io for real-time features.",
        tags: [
          "React",
          "Socket.io",
          "Cloudinary",
          "MongoDB",
          "Node.js",
          "Express",
        ],
        liveUrl: "https://connectme.vercel.app",
        githubUrl: "https://github.com/yourname/connectme",
        featured: false,
        status: "live",
        order: 2,
      },
      {
        title: "DashFlow — Admin Dashboard",
        description:
          "React admin dashboard with dynamic Recharts charts, data tables, role-based access control, and a full Express + MongoDB REST API backend.",
        longDesc:
          "A comprehensive admin dashboard built for managing business data. Includes interactive charts (line, bar, pie), sortable/filterable data tables, role-based access control (Admin/Manager/Viewer), dark mode, and a fully RESTful backend.",
        tags: [
          "React",
          "Recharts",
          "Redux",
          "Ant Design",
          "Express",
          "MongoDB",
          "RBAC",
        ],
        liveUrl: "",
        githubUrl: "https://github.com/yourname/dashflow",
        featured: false,
        status: "wip",
        order: 3,
      },
      {
        title: "BlogStack — Dev Blog Platform",
        description:
          "Full-stack blogging platform with rich text editor (React Quill), categories, tags, search, comments, and an author dashboard.",
        longDesc:
          "A developer-focused blogging platform with a rich text editor powered by React Quill. Authors can publish posts with categories and tags, readers can search and comment, and there's a full author dashboard for managing content. Deployed on Railway (backend) and Vercel (frontend).",
        tags: ["React", "Express", "MongoDB", "React Quill", "Node.js"],
        liveUrl: "https://blogstack.vercel.app",
        githubUrl: "https://github.com/yourname/blogstack",
        featured: false,
        status: "live",
        order: 4,
      },
      {
        title: "TaskFlow — Project Manager",
        description:
          "Kanban-style task management app with drag-and-drop, team collaboration, deadlines, and email notifications.",
        tags: ["React", "Node.js", "MongoDB", "React DnD", "Nodemailer"],
        liveUrl: "",
        githubUrl: "https://github.com/yourname/taskflow",
        featured: false,
        status: "wip",
        order: 5,
      },
    ];
    for (const proj of projects) {
      await Project.create(proj);
    }
    // await Project.insertMany(projects);
    console.log("🚀 Projects created");

    console.log("\n✅ Seed complete! You can now login at /admin/login");
    console.log(
      `   Email: ${process.env.ADMIN_EMAIL || "admin@portfolio.com"}`,
    );
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || "Admin@123"}`);
  } catch (error) {
    console.error("❌ Critical Seed Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connection closed");
    process.exit(0);
  }
}

seed();
