import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Course from "./models/courseModel.js";
import Lecture from "./models/lectureModel.js";
import Review from "./models/reviewModel.js";
import User from "./models/userModel.js";

const sampleVideos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4"
];

const courseDefinitions = [
  {
    title: "Complete MERN Stack Bootcamp: Build 5 Production Apps",
    subTitle: "Master MongoDB, Express.js, React 19, and Node.js from absolute scratch",
    description: "Learn full-stack web development with the most in-demand modern stack. Build real-world production projects including e-commerce, real-time chat, and social networks with authentication, payments, and cloud deployment.",
    category: "Web Development",
    level: "Intermediate",
    price: 999,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Course Roadmap & Full Stack Overview", isPreviewFree: true },
      { lectureTitle: "2. Setting up Node, Express & MongoDB Atlas", isPreviewFree: false },
      { lectureTitle: "3. Building Secure REST APIs with JWT Auth", isPreviewFree: false },
      { lectureTitle: "4. Modern React Frontend with Tailwind & Redux", isPreviewFree: false },
      { lectureTitle: "5. Production Deployment on Vercel & Render", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Hands down the best MERN tutorial! Explanations are crystal clear." },
      { rating: 5, comment: "Built my first full stack project in 2 weeks. Totally worth it." },
      { rating: 4, comment: "Great pace and real-world architecture examples." }
    ]
  },
  {
    title: "Next.js 15 & Server Actions: Modern Full-Stack Masterclass",
    subTitle: "Build ultra-fast web applications with React Server Components, TypeScript & Tailwind",
    description: "Deep dive into Next.js App Router, SSR, SSG, Server Actions, Prisma ORM, and Supabase. Create enterprise-grade full-stack apps with SEO optimization and top-tier performance.",
    category: "Web Development",
    level: "Advanced",
    price: 1299,
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Next.js 15 Architecture & What's New", isPreviewFree: true },
      { lectureTitle: "2. Client vs Server Components Deep Dive", isPreviewFree: false },
      { lectureTitle: "3. Server Actions & Database Mutations", isPreviewFree: false },
      { lectureTitle: "4. Full-Stack SaaS Project: Subscription & Payments", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Next.js concepts are explained in the most intuitive way!" },
      { rating: 5, comment: "The SaaS project alone is worth 10x the price." }
    ]
  },
  {
    title: "Master Modern JavaScript: ES6+ to Advanced Asynchronous JS",
    subTitle: "The definitive guide to JavaScript from variables to closures, event loops & async/await",
    description: "Gain 100% confidence in JavaScript. Understand scopes, closures, prototypes, microtask queue, promises, DOM manipulation, and modern ES2024 features to crack frontend interviews.",
    category: "Web Development",
    level: "Beginner",
    price: 499,
    thumbnail: "https://images.unsplash.com/photo-1579468118864-ddab3a8801b8?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. JavaScript Execution Context & Call Stack", isPreviewFree: true },
      { lectureTitle: "2. Closures, Hoisting & Scopes Explained", isPreviewFree: false },
      { lectureTitle: "3. Promises, Async/Await & Event Loop", isPreviewFree: false },
      { lectureTitle: "4. DOM Projects & Interactive UI Building", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Finally understood how the JS event loop actually works!" },
      { rating: 5, comment: "Helped me crack my junior frontend developer interview." }
    ]
  },
  {
    title: "Full-Stack Backend Engineering with Node.js, Express & Microservices",
    subTitle: "Scalable backend systems, caching with Redis, message queues & API security",
    description: "Learn how senior engineers design robust backend architectures. Master rate limiting, Redis caching, Kafka message streams, Docker containerization, and database indexing.",
    category: "Web Development",
    level: "Advanced",
    price: 1499,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Scalable Backend System Design Principles", isPreviewFree: true },
      { lectureTitle: "2. Advanced MongoDB Aggregations & Indexing", isPreviewFree: false },
      { lectureTitle: "3. Redis Caching & Rate Limiting", isPreviewFree: false },
      { lectureTitle: "4. Microservices Architecture with RabbitMQ", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "High-level concepts made easy. Essential for backend developers." },
      { rating: 4, comment: "Very comprehensive and practical." }
    ]
  },
  {
    title: "Machine Learning & Deep Learning with Python A-Z",
    subTitle: "From Linear Regression to Neural Networks, PyTorch & Scikit-Learn",
    description: "Comprehensive guide to Machine Learning algorithms and Deep Learning architectures. Implement regression, classification, clustering, CNNs, and RNNs with real datasets.",
    category: "AI/ML",
    level: "Intermediate",
    price: 1499,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Introduction to ML Landscape & Python Ecosystem", isPreviewFree: true },
      { lectureTitle: "2. Supervised Learning: Regression & Classification", isPreviewFree: false },
      { lectureTitle: "3. Unsupervised Learning & Dimensionality Reduction", isPreviewFree: false },
      { lectureTitle: "4. Neural Networks Architecture & Backpropagation", isPreviewFree: false },
      { lectureTitle: "5. PyTorch Deep Learning Hands-on Project", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "The math is explained visually before coding. Brilliant course!" },
      { rating: 5, comment: "Best ML course on this platform." }
    ]
  },
  {
    title: "Generative AI & LLMs: LangChain, HuggingFace & Gemini",
    subTitle: "Build real-world AI applications, RAG systems, and autonomous AI agents",
    description: "Harness the power of Large Language Models. Build retrieval-augmented generation (RAG) pipelines, chat with PDFs, vector databases (Pinecone/Chroma), and agentic workflows.",
    category: "AI/ML",
    level: "Advanced",
    price: 1799,
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. The GenAI Revolution & LLM Foundations", isPreviewFree: true },
      { lectureTitle: "2. Prompt Engineering & Vector Embeddings", isPreviewFree: false },
      { lectureTitle: "3. Building Enterprise RAG with LangChain", isPreviewFree: false },
      { lectureTitle: "4. Deploying Autonomous AI Agents", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Up-to-date with 2026 AI industry standards. Super useful!" },
      { rating: 5, comment: "Built my first RAG assistant within 3 days." }
    ]
  },
  {
    title: "Computer Vision with OpenCV and Deep Learning Masterclass",
    subTitle: "Object detection, face recognition, YOLOv8, and real-time video processing",
    description: "Learn how computers see the world. Implement image filtering, feature extraction, edge detection, YOLO real-time object detection, and autonomous vehicle vision systems.",
    category: "AI/ML",
    level: "Intermediate",
    price: 1199,
    thumbnail: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Image Processing Fundamentals with OpenCV", isPreviewFree: true },
      { lectureTitle: "2. Feature Extraction, Contours & Thresholding", isPreviewFree: false },
      { lectureTitle: "3. Real-Time Face Detection & Recognition", isPreviewFree: false },
      { lectureTitle: "4. Custom Object Detection with YOLOv8", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Amazing computer vision course with real live webcam projects!" }
    ]
  },
  {
    title: "Prompt Engineering Mastery: ChatGPT, Claude & Midjourney",
    subTitle: "Supercharge your productivity, writing, coding, and creative workflows with AI",
    description: "Master the art of prompting. Learn zero-shot, few-shot, chain-of-thought, and self-consistency prompting techniques to get 10x better results from AI models.",
    category: "AI Tools",
    level: "Beginner",
    price: 599,
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Principles of Effective Prompt Design", isPreviewFree: true },
      { lectureTitle: "2. Advanced Prompting Techniques & Frameworks", isPreviewFree: false },
      { lectureTitle: "3. AI for Coding, Debugging & Code Generation", isPreviewFree: false },
      { lectureTitle: "4. Creative Image Generation with Midjourney", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "This changed the way I work every day. Super practical tips." },
      { rating: 4, comment: "Very well structured and easy to follow." }
    ]
  },
  {
    title: "AI Automation & No-Code Workflows: Make, Zapier & AI Agents",
    subTitle: "Automate businesses and daily repetitive tasks using no-code AI automations",
    description: "Build automated business pipelines that run 24/7. Connect Webhooks, Google Sheets, WhatsApp APIs, Stripe, and OpenAI/Gemini to automate marketing, sales, and customer support.",
    category: "AI Tools",
    level: "Beginner",
    price: 699,
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Introduction to No-Code Automation Ecosystem", isPreviewFree: true },
      { lectureTitle: "2. Building Complex Workflows in Make.com", isPreviewFree: false },
      { lectureTitle: "3. Integrating AI & Webhooks for Auto-Responses", isPreviewFree: false },
      { lectureTitle: "4. End-to-End Client Lead Generation System", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Helped me automate my freelance business completely!" }
    ]
  },
  {
    title: "Flutter & Dart: The Complete Cross-Platform Mobile App Guide",
    subTitle: "Build stunning iOS and Android apps with a single codebase",
    description: "Master Flutter 3 and Dart from grounds up. Learn state management (Bloc, Provider), clean architecture, Firebase integration, offline SQLite databases, and App Store publishing.",
    category: "App Development",
    level: "Beginner",
    price: 1099,
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Dart Programming Essentials", isPreviewFree: true },
      { lectureTitle: "2. Flutter Widgets, Layouts & Theming", isPreviewFree: false },
      { lectureTitle: "3. State Management with Bloc & Riverpod", isPreviewFree: false },
      { lectureTitle: "4. Building a Full-Featured Food Delivery App", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Hands-on UI building was phenomenal." },
      { rating: 5, comment: "Everything you need to become a job-ready Flutter developer." }
    ]
  },
  {
    title: "React Native & Expo: Build Real-World iOS & Android Apps",
    subTitle: "Leverage your React skills to build native mobile apps with animations and offline sync",
    description: "Step-by-step masterclass in React Native with Expo. Build camera integrations, push notifications, geolocation maps, offline caching, and publish to Google Play & Apple App Store.",
    category: "App Development",
    level: "Intermediate",
    price: 1199,
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Getting Started with React Native & Expo", isPreviewFree: true },
      { lectureTitle: "2. Navigation, Gestures & Smooth Animations", isPreviewFree: false },
      { lectureTitle: "3. Native Device APIs: Camera, GPS & Storage", isPreviewFree: false },
      { lectureTitle: "4. Publishing and Deploying to Stores", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Great bridge from web React to mobile React Native!" }
    ]
  },
  {
    title: "Complete Android App Development with Kotlin & Jetpack Compose",
    subTitle: "Modern declarative Android development following Google's best practices",
    description: "Learn native Android development using Kotlin, Jetpack Compose, Coroutines, Flow, Room DB, Retrofit, and MVVM Clean Architecture. Build modern Android applications.",
    category: "App Development",
    level: "Intermediate",
    price: 1299,
    thumbnail: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Kotlin Fundamentals for Android", isPreviewFree: true },
      { lectureTitle: "2. Declarative UI with Jetpack Compose", isPreviewFree: false },
      { lectureTitle: "3. MVVM Architecture & Retrofit Networking", isPreviewFree: false },
      { lectureTitle: "4. Room Local Database & Offline Caching", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Jetpack Compose is the future of Android, and this course nails it." }
    ]
  },
  {
    title: "Data Science & Machine Learning Bootcamp with Python & Pandas",
    subTitle: "Data manipulation, cleaning, EDA, visualization, and predictive modeling",
    description: "Master NumPy, Pandas, Matplotlib, Seaborn, and Scikit-Learn. Learn how to clean messy data, perform exploratory data analysis, extract insights, and build predictive statistical models.",
    category: "Data Science",
    level: "Beginner",
    price: 999,
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Data Science Workflow & Jupyter Setup", isPreviewFree: true },
      { lectureTitle: "2. High Performance Computing with NumPy", isPreviewFree: false },
      { lectureTitle: "3. Data Wrangling & Cleaning with Pandas", isPreviewFree: false },
      { lectureTitle: "4. Data Storytelling & Beautiful Visualizations", isPreviewFree: false },
      { lectureTitle: "5. Real Estate Price Prediction End-to-End", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Perfect for anyone stepping into the data world." },
      { rating: 5, comment: "Pandas exercises were very challenging and fun." }
    ]
  },
  {
    title: "Applied Statistics & Mathematics for Data Science & AI",
    subTitle: "Master Probability, Hypothesis Testing, Linear Algebra & Calculus for ML",
    description: "Remove the mystery behind Machine Learning algorithms. Understand probability distributions, Bayes theorem, confidence intervals, p-values, eigenvalues, and gradient descent mathematically.",
    category: "Data Science",
    level: "Intermediate",
    price: 899,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Descriptive Statistics & Data Summaries", isPreviewFree: true },
      { lectureTitle: "2. Probability Distributions & Normal Distribution", isPreviewFree: false },
      { lectureTitle: "3. Hypothesis Testing, A/B Testing & p-values", isPreviewFree: false },
      { lectureTitle: "4. Linear Algebra Vectors & Matrix Operations", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Finally statistics that actually makes intuitive sense!" }
    ]
  },
  {
    title: "Power BI & Tableau: Complete Business Intelligence & Dashboards",
    subTitle: "Transform raw corporate data into interactive executive dashboards and reports",
    description: "Learn Power BI and Tableau from scratch. Connect to SQL, Excel, and APIs. Master DAX formulas, data modeling, drill-down charts, storytelling with data, and KPI tracking.",
    category: "Data Analytics",
    level: "Beginner",
    price: 799,
    thumbnail: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Introduction to Business Intelligence & Power BI", isPreviewFree: true },
      { lectureTitle: "2. Power Query Data Transformation & Cleaning", isPreviewFree: false },
      { lectureTitle: "3. Data Modeling & Essential DAX Measures", isPreviewFree: false },
      { lectureTitle: "4. Designing Executive Sales & Revenue Dashboards", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Learned how to create dashboards that look like they belong in Fortune 500 companies." }
    ]
  },
  {
    title: "SQL Mastery for Data Analytics & Big Data Querying",
    subTitle: "From basic SELECT to advanced Window Functions, CTEs & Query Optimization",
    description: "SQL is the #1 skill for data analysts. Master complex JOINs, subqueries, Common Table Expressions (CTEs), window functions, indexing, and performance tuning with PostgreSQL and MySQL.",
    category: "Data Analytics",
    level: "Intermediate",
    price: 699,
    thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Database Fundamentals & Relational Schema", isPreviewFree: true },
      { lectureTitle: "2. Mastering Multi-Table Joins & Grouping", isPreviewFree: false },
      { lectureTitle: "3. Advanced Window Functions & Ranking", isPreviewFree: false },
      { lectureTitle: "4. Query Optimization & Real-World Business Cases", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Window functions were explained brilliantly. 10/10." },
      { rating: 5, comment: "Directly helped me crack an Analyst test." }
    ]
  },
  {
    title: "The Complete Ethical Hacking & Penetration Testing Course",
    subTitle: "Learn ethical hacking from scratch: Kali Linux, Wireshark, Metasploit & Nmap",
    description: "Become a certified ethical hacker. Learn reconnaissance, network scanning, vulnerability analysis, Wi-Fi hacking, password cracking, privilege escalation, and write professional pentest reports.",
    category: "Ethical Hacking",
    level: "Beginner",
    price: 1399,
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Ethical Hacking Lab Setup in VirtualBox", isPreviewFree: true },
      { lectureTitle: "2. Network Reconnaissance & Port Scanning with Nmap", isPreviewFree: false },
      { lectureTitle: "3. Vulnerability Scanning & Metasploit Exploitation", isPreviewFree: false },
      { lectureTitle: "4. Social Engineering & System Defense Best Practices", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Detailed, ethical, and super informative. Lab setups were easy to follow." },
      { rating: 5, comment: "Top notch cybersecurity content." }
    ]
  },
  {
    title: "Web Security & Bug Bounty Hunting: OWASP Top 10 Exploitation",
    subTitle: "Find security vulnerabilities in real web apps: SQLi, XSS, CSRF & SSRF",
    description: "Learn how to find and report high-severity security vulnerabilities on Bugcrowd and HackerOne. Master Burp Suite, SQL injection, Cross-Site Scripting (XSS), IDOR, and authentication bypasses.",
    category: "Ethical Hacking",
    level: "Advanced",
    price: 1599,
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. Web Application Architecture & Attack Surfaces", isPreviewFree: true },
      { lectureTitle: "2. Mastering Burp Suite Proxy & Repeater", isPreviewFree: false },
      { lectureTitle: "3. Hunting IDOR & Broken Access Control", isPreviewFree: false },
      { lectureTitle: "4. SQL Injection & Cross-Site Scripting in Depth", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "I found my first valid bug on HackerOne using techniques from this course!" }
    ]
  },
  {
    title: "Figma UI/UX Design Masterclass: From Wireframes to Design System",
    subTitle: "Learn modern user interface and user experience design with interactive prototypes",
    description: "Design stunning mobile apps and websites using Figma. Master auto-layout, components, variants, design tokens, responsive constraints, user research, wireframing, and interactive micro-animations.",
    category: "UI UX Designing",
    level: "Beginner",
    price: 899,
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. UX Fundamentals & Design Thinking Process", isPreviewFree: true },
      { lectureTitle: "2. Figma Auto-Layout & Component Variants", isPreviewFree: false },
      { lectureTitle: "3. Building a Scalable Design System", isPreviewFree: false },
      { lectureTitle: "4. High-Fidelity Prototyping & Developer Handoff", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "The Figma auto-layout section alone solved all my layout struggles." },
      { rating: 5, comment: "Super sleek modern design aesthetics!" }
    ]
  },
  {
    title: "DevOps & Cloud Engineering: Docker, Kubernetes, CI/CD & AWS",
    subTitle: "Master containerization, container orchestration, GitHub Actions & AWS deployment",
    description: "Learn how to automate software delivery and maintain 99.99% uptime. Master Dockerfiles, multi-stage builds, Kubernetes Pods/Deployments/Services, Terraform Infrastructure as Code, and CI/CD pipelines.",
    category: "Others",
    level: "Advanced",
    price: 1699,
    thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
    lectures: [
      { lectureTitle: "1. DevOps Culture & Modern Cloud Architecture", isPreviewFree: true },
      { lectureTitle: "2. Containerization with Docker & Multi-Stage Builds", isPreviewFree: false },
      { lectureTitle: "3. Kubernetes Cluster Orchestration & Ingress", isPreviewFree: false },
      { lectureTitle: "4. Automated CI/CD Pipelines with GitHub Actions", isPreviewFree: false }
    ],
    reviews: [
      { rating: 5, comment: "Every modern software engineer should take this DevOps course!" }
    ]
  }
];

async function seed() {
  try {
    await connectDB();
    console.log("Connected to MongoDB for seeding...");

    // Find or create educator user
    let educator = await User.findOne({ role: "educator" });
    if (!educator) {
      educator = await User.create({
        name: "Shivam Kumar",
        email: "shivam.educator@virtualclasses.com",
        password: "hashedpassword123",
        role: "educator",
        description: "Senior Full Stack Architect & Tech Lead with 8+ years experience training 50,000+ developers worldwide.",
        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
      });
      console.log("Created educator user:", educator.name);
    } else {
      // Update educator profile with nice avatar and bio if empty
      if (!educator.description || !educator.photoUrl) {
        educator.description = "Senior Tech Instructor & Industry Architect with 8+ years building enterprise applications.";
        educator.photoUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
        await educator.save();
      }
    }

    // Find student for reviews
    let student = await User.findOne({ role: "student" });
    if (!student) {
      student = await User.create({
        name: "Aman Verma",
        email: "aman.student@virtualclasses.com",
        password: "hashedpassword123",
        role: "student",
        description: "Passionate learner & aspiring developer"
      });
    }

    console.log(`Starting to seed ${courseDefinitions.length} courses...`);

    let createdCount = 0;
    for (let i = 0; i < courseDefinitions.length; i++) {
      const def = courseDefinitions[i];

      // Check if course already exists by title
      let course = await Course.findOne({ title: def.title });
      if (course) {
        console.log(`Course "${def.title}" already exists, skipping...`);
        continue;
      }

      // Create lectures
      const lectureIds = [];
      for (let j = 0; j < def.lectures.length; j++) {
        const lDef = def.lectures[j];
        const video = sampleVideos[(i + j) % sampleVideos.length];
        const lecture = await Lecture.create({
          lectureTitle: lDef.lectureTitle,
          videoUrl: video,
          isPreviewFree: lDef.isPreviewFree
        });
        lectureIds.push(lecture._id);
      }

      // Create course
      course = await Course.create({
        title: def.title,
        subTitle: def.subTitle,
        description: def.description,
        category: def.category,
        level: def.level,
        price: def.price,
        thumbnail: def.thumbnail,
        creator: educator._id,
        isPublished: true,
        lectures: lectureIds,
        reviews: []
      });

      // Create reviews
      const reviewIds = [];
      for (const r of def.reviews) {
        const review = await Review.create({
          course: course._id,
          user: student._id,
          rating: r.rating,
          comment: r.comment
        });
        reviewIds.push(review._id);
      }

      // Attach reviews to course
      course.reviews = reviewIds;
      await course.save();

      createdCount++;
      console.log(`[${createdCount}/${courseDefinitions.length}] Created: "${course.title}" (${course.category})`);
    }

    console.log(`\n🎉 Successfully seeded ${createdCount} new courses into Virtual Classes!`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seed();
