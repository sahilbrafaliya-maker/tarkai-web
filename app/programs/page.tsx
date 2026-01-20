"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FaRobot, FaChartBar, FaLaptopCode, FaLeaf } from "react-icons/fa";

function RoadmapViewer({ roadmap, benefits }: { roadmap: any[], benefits?: any }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 border border-gray-100 gsap-stagger transition-all duration-300">
            <h4 className="text-2xl font-bold text-brand-darkest mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-brand-darkest text-white flex items-center justify-center text-sm mr-3">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 01-1.447-.894L15 7m0 13V7" /></svg>
                </span>
                Program Roadmap
            </h4>

            {isOpen ? (
                <div className="animate-fade-in">
                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 mt-8">
                        {roadmap.map((step, i) => (
                            <div key={i} className="relative pl-12 group">
                                <div className="absolute left-0 top-1.5 w-10 h-10 bg-white border-2 border-brand-accent rounded-full flex items-center justify-center text-brand-accent text-xs font-bold z-10 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-300">
                                    {i + 1}
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-brand-accent uppercase tracking-wider mb-1 block">
                                        {step.time}
                                    </span>
                                    <h5 className="text-xl font-bold text-brand-darkest mb-2">{step.phase}</h5>
                                    <p className="text-gray-600 mb-4">{step.desc}</p>

                                    {(step as any).topics && (
                                        <ul className="list-disc list-inside mb-4 text-gray-600 space-y-1">
                                            {(step as any).topics.map((topic: string, k: number) => (
                                                <li key={k} className="text-sm">{topic}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {step.tags.map((tag: string, t: number) => (
                                            <span key={t} className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-semibold text-gray-500">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Benefits Section Inside Roadmap */}
                    {benefits && (
                        <div className="bg-brand-lightest/30 rounded-2xl p-6 lg:p-8 border border-brand-accent/20 mt-12 mb-4">
                            <h4 className="text-2xl font-bold text-brand-darkest mb-6 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center text-sm mr-3">
                                    ★
                                </span>
                                {benefits.title}
                            </h4>
                            <div className="grid grid-cols-1 gap-4">
                                {benefits.list.map((benefit: string, b: number) => (
                                    <div key={b} className="flex items-start">
                                        <span className="text-brand-accent mr-3 mt-1">✓</span>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            <span className="font-semibold text-brand-darkest">
                                                {benefit.split(':')[0]}:
                                            </span>
                                            {benefit.split(':')[1]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full py-3 mt-8 border-2 border-brand-accent/20 rounded-xl text-brand-accent font-bold hover:bg-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Hide Detailed Roadmap <span className="transform rotate-180">▼</span>
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full py-3 mt-2 border-2 border-brand-accent/20 rounded-xl text-brand-accent font-bold hover:bg-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                    View Detailed Roadmap
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            )}
        </div>
    );
}

export default function ProgramsPage() {
    const programs = [
        {
            title: "AI / ML Architect Program",
            subtitle: "Full-Stack Artificial Intelligence Engineering",
            duration: "12 Modules",
            color: "bg-blue-600",
            icon: <FaRobot />,
            description: [
                "A flagship 6-month immersion that builds rock-solid data foundations, levels up your model intuition, and ends with production-ready LLM and agentic systems.",
                "Design resilient data backbones with relational, NoSQL, and optimized SQL workflows.",
                "Build, evaluate, and tune machine learning systems that hold up in real-world product sprints.",
                "Fine-tune large language models and orchestrate agentic AI experiences ready for deployment."
            ],
            benefits: {
                title: "1 Month Placement Ready Program",
                list: [
                    "ATS-Friendly Resume Building: Resume optimized for MNCs & startups, Keyword-based, HR-approved formats",
                    "Mock Interviews (Technical + HR): Real interview environment, Personalized feedback & improvement plan",
                    "Industry Expert Mentorship: Guidance from professionals working in the same field, Insights on hiring trends & expectations",
                    "Portfolio Building: Project-based portfolio, GitHub + live project review",
                    "LinkedIn Profile Optimization: Recruiter-friendly headline & summary, Job-search & networking strategy",
                    "Placement Readiness Support: Interview question bank, Salary negotiation tips, Confidence & communication grooming"
                ]
            },
            roadmap: [
                {
                    time: "Module 1",
                    phase: "Database Management Systems",
                    desc: "Learners will design efficient databases and write optimized SQL queries.",
                    topics: [
                        "Introduction to DBMS and Data Models",
                        "DBMS Architecture (1-tier, 2-tier, 3-tier)",
                        "Entity Relationship (ER) Modeling",
                        "Relational Model and Keys",
                        "SQL Fundamentals (CRUD Operations)",
                        "Joins, Subqueries, Aggregations",
                        "Normalization (1NF, 2NF, 3NF, BCNF)",
                        "Transactions and ACID Properties",
                        "Indexing and Query Optimization",
                        "Introduction to NoSQL Databases"
                    ],
                    tags: ["DBMS Architecture", "ER Modeling", "SQL Fundamentals", "Normalization"]
                },
                {
                    time: "Module 2",
                    phase: "Python Programming for AI",
                    desc: "Students gain strong Python foundations for data analysis and ML workflows.",
                    topics: [
                        "Python Syntax and Core Concepts",
                        "Data Structures (List, Tuple, Set, Dictionary)",
                        "Control Flow and Functions",
                        "Object-Oriented Programming (OOP)",
                        "File Handling and Exception Handling",
                        "NumPy for Numerical Computing",
                        "Pandas for Data Analysis",
                        "Data Visualization (Matplotlib, Seaborn)",
                        "Introduction to Scikit-Learn"
                    ],
                    tags: ["Python Syntax", "Data Structures", "Pandas & NumPy", "Data Visualization"]
                },
                {
                    time: "Module 3",
                    phase: "Mathematics & Statistics for AI",
                    desc: "Learners build mathematical intuition required to understand ML algorithms.",
                    topics: [
                        "Linear Algebra (Vectors, Matrices, Dot Products)",
                        "Matrix Operations and Intuition",
                        "Probability Fundamentals",
                        "Random Variables and Distributions",
                        "Mean, Variance, Standard Deviation",
                        "Correlation and Covariance",
                        "Bayes Theorem",
                        "Statistical Intuition for ML Models"
                    ],
                    tags: ["Linear Algebra", "Probability", "Bayes Theorem", "Statistics"]
                },
                {
                    time: "Module 4",
                    phase: "Machine Learning",
                    desc: "Students build end-to-end ML pipelines and evaluate models effectively.",
                    topics: [
                        "Types of ML (Supervised, Unsupervised, Reinforcement)",
                        "Bias-Variance Tradeoff, Overfitting",
                        "Regression & Classification Algorithms",
                        "K-Nearest Neighbors (KNN), Naive Bayes",
                        "Decision Trees and Random Forest",
                        "Gradient Boosting & XGBoost",
                        "Clustering (K-Means, Hierarchical)",
                        "Dimensionality Reduction (PCA)",
                        "Model Evaluation Metrics"
                    ],
                    tags: ["Supervised Learning", "Regression & Classification", "Random Forest", "XGBoost"]
                },
                {
                    time: "Module 5",
                    phase: "Deep Learning",
                    desc: "Learners understand and implement deep learning models for vision and sequence data.",
                    topics: [
                        "Artificial Neural Networks (ANN)",
                        "Activation Functions and Loss Functions",
                        "Gradient Descent and Backpropagation",
                        "Optimization (SGD, Adam) & Regularization",
                        "Convolutional Neural Networks (CNN)",
                        "CNN Architectures (LeNet, VGG, ResNet)",
                        "Recurrent Neural Networks (RNN)",
                        "LSTM, GRU, and Sequence Modeling"
                    ],
                    tags: ["ANN", "CNN & RNN", "Backpropagation", "Sequence Modeling"]
                },
                {
                    time: "Module 6",
                    phase: "Computer Vision & NLP",
                    desc: "Students gain exposure to both vision and language-based AI systems.",
                    topics: [
                        "CV: Image Representation & Preprocessing",
                        "CV: Feature Extraction",
                        "CV: CNN-based Vision Pipelines",
                        "NLP: Text Preprocessing, Tokenization",
                        "NLP: Bag of Words, TF-IDF",
                        "NLP: Word Embeddings",
                        "NLP: Introduction to Transformers"
                    ],
                    tags: ["CNN Pipelines", "Text Preprocessing", "Word Embeddings", "Transformers"]
                },
                {
                    time: "Module 7",
                    phase: "LLMs – From Scratch",
                    desc: "Learners deeply understand how modern LLMs like GPT work internally.",
                    topics: [
                        "Evolution of Language Models",
                        "Transformer Architecture & Self-Attention",
                        "Positional Encoding & Decoder-Only Models (GPT)",
                        "Tokenization Techniques (BPE)",
                        "LLM Training Pipeline (Conceptual)"
                    ],
                    tags: ["Transformer Architecture", "Self-Attention", "GPT Models", "LLM Training"]
                },
                {
                    time: "Module 8",
                    phase: "Fine -Tuning LLMs",
                    desc: "Students can fine-tune open-source LLMs for custom use cases.",
                    topics: [
                        "Pre-training vs Fine-Tuning",
                        "Instruction Tuning",
                        "Parameter-Efficient Fine-Tuning (PEFT)",
                        "LoRA and QLoRA",
                        "Dataset Preparation, Evaluation and Inference"
                    ],
                    tags: ["Instruction Tuning", "PEFT", "LoRA & QLoRA", "Inference"]
                },
                {
                    time: "Module 9",
                    phase: "Agentic AI",
                    desc: "Learners design AI agents capable of decision-making and tool interaction.",
                    topics: [
                        "Introduction to Agentic AI",
                        "Tool-Using AI Agents",
                        "Planning and Reasoning",
                        "Memory-Enabled Agents",
                        "ReAct Framework & Multi-Agent Systems"
                    ],
                    tags: ["Agentic AI", "Tool Use", "ReAct", "Multi-Agent Systems"]
                },
                {
                    time: "Module 10",
                    phase: "Cloud Computing",
                    desc: "Students understand how AI systems are deployed and scaled in the cloud.",
                    topics: [
                        "Service Models (IaaS, PaaS, SaaS)",
                        "AWS Core Services (EC2, S3, IAM)",
                        "VMs vs Containers",
                        "Docker Fundamentals"
                    ],
                    tags: ["AWS", "Docker", "Cloud Deployment", "Scaling"]
                },
                {
                    time: "Module 11",
                    phase: "Big Data & MLOps",
                    desc: "Learners build production-ready, maintainable ML systems.",
                    topics: [
                        "Big Data Concepts & Hadoop/Spark Overview",
                        "End-to-End ML Lifecycle",
                        "Experiment Tracking & Model Versioning",
                        "MLOps Tools (MLflow, DVC, Git)"
                    ],
                    tags: ["MLOps", "Big Data", "Spark", "MLflow"]
                },
                {
                    time: "Module 12",
                    phase: "Industry Case Studies",
                    desc: "Students develop interview-ready explanations and problem-solving skills.",
                    topics: [
                        "Recommendation Systems",
                        "Fraud Detection Systems",
                        "ChatGPT-Style AI Systems",
                        "Healthcare AI Applications",
                        "Autonomous Driving (Perception Layer)"
                    ],
                    tags: ["Case Studies", "System Design", "Real-world AI", "Interviews"]
                }
            ]
        },
        {
            title: "Data Science & Strategic Analytics",
            subtitle: "From Raw Data to Business Intelligence",
            duration: "12 Modules",
            color: "bg-purple-600",
            icon: <FaChartBar />,
            description: [
                "Transform into the data partner every leadership team craves—tell compelling stories with data, automate insight pipelines, and launch ML-powered decisions.",
                "Command Python, SQL, and data tooling to cleanse, enrich, and activate information fast.",
                "Explain statistical evidence with clarity so stakeholders trust every recommendation.",
                "Ship dashboards and predictive models that move business metrics and answer “what happens next?”."
            ],
            benefits: {
                title: "1 Month Placement Ready Program",
                list: [
                    "ATS-Friendly Resume Building: Resume optimized for MNCs & startups, Keyword-based, HR-approved formats",
                    "Mock Interviews (Technical + HR): Real interview environment, Personalized feedback & improvement plan",
                    "Industry Expert Mentorship: Guidance from professionals working in the same field, Insights on hiring trends & expectations",
                    "Portfolio Building: Project-based portfolio, GitHub + live project review",
                    "LinkedIn Profile Optimization: Recruiter-friendly headline & summary, Job-search & networking strategy",
                    "Placement Readiness Support: Interview question bank, Salary negotiation tips, Confidence & communication grooming"
                ]
            },
            roadmap: [
                {
                    time: "Module 1",
                    phase: "Python for Data Science",
                    desc: "Master Python basics for data analysis.",
                    topics: [
                        "Python Syntax and Core Concepts",
                        "Data Structures (List, Tuple, Set, Dictionary)",
                        "Control Flow and Functions",
                        "NumPy for Numerical Computing",
                        "Pandas for Data Manipulation"
                    ],
                    tags: ["Python", "NumPy", "Pandas", "Data Cleaning"]
                },
                {
                    time: "Module 2",
                    phase: "Database Management & SQL",
                    desc: "Learners can extract and manipulate data using SQL.",
                    topics: [
                        "DBMS Intro, Relational databases, ER diagrams",
                        "SQL (SELECT, Joins, Subqueries, GROUP BY)",
                        "Constraints & Indexes",
                        "Intro to NoSQL (MongoDB basics)"
                    ],
                    tags: ["SQL", "DBMS", "NoSQL", "ER Diagrams"]
                },
                {
                    time: "Module 3",
                    phase: "Mathematics for Data Science",
                    desc: "Learners understand math behind models and metrics.",
                    topics: [
                        "Linear Algebra (Vectors & matrices)",
                        "Calculus (Derivatives, Gradient)",
                        "Distance measures"
                    ],
                    tags: ["Linear Algebra", "Calculus", "Math for ML"]
                },
                {
                    time: "Module 4",
                    phase: "Statistics & Probability",
                    desc: "Learners can validate insights statistically.",
                    topics: [
                        "Descriptive statistics & Probability theory",
                        "Random variables & Distributions",
                        "Bayes’ theorem & Sampling techniques",
                        "Hypothesis testing (Z-test, T-test, Chi-square)",
                        "A/B testing"
                    ],
                    tags: ["Statistics", "Probability", "Hypothesis Testing", "A/B Testing"]
                },
                {
                    time: "Module 5",
                    phase: "Exploratory Data Analysis (EDA)",
                    desc: "Master data exploration techniques.",
                    topics: [
                        "Data cleaning strategies",
                        "Handling missing values",
                        "Outlier detection",
                        "Correlation analysis & Pattern identification"
                    ],
                    tags: ["EDA", "Data Cleaning", "Feature Engineering"]
                },
                {
                    time: "Module 6",
                    phase: "Data Visualization & BI Tools",
                    desc: "Learners can present business insights clearly.",
                    topics: [
                        "Storytelling with data",
                        "Dashboards & reports",
                        "Power BI / Tableau",
                        "KPI & metric design"
                    ],
                    tags: ["Data Viz", "Power BI", "Tableau", "Storytelling"]
                },
                {
                    time: "Module 7",
                    phase: "Machine Learning Fundamentals",
                    desc: "Build foundational ML models.",
                    topics: [
                        "ML workflow & Preprocessing",
                        "Feature engineering",
                        "Linear Regression & Logistic Regression",
                        "KNN & Naive Bayes",
                        "Model evaluation metrics"
                    ],
                    tags: ["ML Basics", "Regression", "Classification", "Evaluation"]
                },
                {
                    time: "Module 8",
                    phase: "Advanced ML Models",
                    desc: "End-to-end ML predictive model project.",
                    topics: [
                        "Decision Trees & Random Forest",
                        "Gradient Boosting & XGBoost",
                        "Model tuning (Grid Search, Cross-validation)"
                    ],
                    tags: ["Advanced ML", "Trees", "XGBoost", "Model Tuning"]
                },
                {
                    time: "Module 9",
                    phase: "Big Data Analytics",
                    desc: "Handle large-scale datasets.",
                    topics: [
                        "Big Data concepts (5Vs)",
                        "Hadoop ecosystem",
                        "Apache Spark basics (DataFrames, SQL)"
                    ],
                    tags: ["Big Data", "Hadoop", "Spark"]
                },
                {
                    time: "Module 10",
                    phase: "Cloud & MLOps for Data Science",
                    desc: "Deploy and manage ML models.",
                    topics: [
                        "AWS basics (S3, EC2)",
                        "Docker basics",
                        "ML lifecycle & Version control (Git)",
                        "Intro to MLflow & DVC"
                    ],
                    tags: ["Cloud", "AWS", "MLOps", "Docker"]
                },
                {
                    time: "Modules 11 & 12",
                    phase: "Case Studies & Capstone",
                    desc: "Solve real-world business problems.",
                    topics: [
                        "Customer churn analysis",
                        "Sales forecasting",
                        "Fraud detection",
                        "Capstone: End-to-end project (Business problem -> ML model -> Dashboard)"
                    ],
                    tags: ["Capstone", "Case Studies", "Real-world Projects"]
                }
            ]
        },
        {
            title: "Future Founders – AI Foundation",
            subtitle: "Digital Literacy & Coding for the Next Generation",
            duration: "8 Modules",
            color: "bg-orange-500",
            icon: <FaLaptopCode />,
            description: [
                "A playful-yet-powerful launchpad for teens and first-time builders—learn digital fluency, code creatively, and demo AI ideas with confidence.",
                "Think like a problem solver using algorithms, flowcharts, and structured creativity.",
                "Code in Scratch and Python to turn ideas into interactive projects and data explorations.",
                "Understand AI ethics, real-world careers, and present a mini product with flair."
            ],
            roadmap: [
                {
                    time: "Module 1",
                    phase: "Digital Literacy & Data Basics",
                    desc: "Understand data types and AI vs Human thinking.",
                    topics: [
                        "Types of data (numbers, text, images)",
                        "Data in daily life",
                        "AI vs Human thinking"
                    ],
                    tags: ["Google Sheets", "ChatGPT", "Data Basics"]
                },
                {
                    time: "Module 2",
                    phase: "Logical Thinking & Algorithms",
                    desc: "Master logic, algorithms, and decision making.",
                    topics: [
                        "Logic & Step-by-step thinking",
                        "Algorithms (no code)",
                        "Flowcharts & Decision making"
                    ],
                    tags: ["Draw.io", "Scratch", "Algorithms", "Logic"]
                },
                {
                    time: "Module 3",
                    phase: "Introduction to Coding",
                    desc: "Learn variables, conditions, and loops.",
                    topics: [
                        "Variables & values",
                        "Conditions (if–else)",
                        "Loops (repeat)"
                    ],
                    tags: ["Scratch (Block)", "Python Basics", "Coding"]
                },
                {
                    time: "Module 4",
                    phase: "Python & Data Handling",
                    desc: "Work with lists and simple datasets in Python.",
                    topics: [
                        "Python basics",
                        "Working with lists",
                        "Reading simple datasets"
                    ],
                    tags: ["Google Colab", "Excel/Sheets", "Python", "Lists"]
                },
                {
                    time: "Module 5",
                    phase: "Data Analysis & Visualization",
                    desc: "Analyze and visualize data with Pandas and Matplotlib.",
                    topics: [
                        "Tables, Mean/Max/Min",
                        "Bar charts, Line charts",
                        "Why visualization matters"
                    ],
                    tags: ["Pandas", "Matplotlib", "Data Viz"]
                },
                {
                    time: "Module 6",
                    phase: "Intro to AI & ML",
                    desc: "Understand Machine Learning concepts and training.",
                    topics: [
                        "What is Machine Learning?",
                        "Training vs Testing",
                        "Prediction concept"
                    ],
                    tags: ["Teachable Machine", "Scikit-learn", "ML Concepts"]
                },
                {
                    time: "Module 7",
                    phase: "AI Tools, Ethics & Careers",
                    desc: "Explore responsible AI usage and career paths.",
                    topics: [
                        "Responsible AI usage",
                        "Bias & fairness",
                        "Career paths in AI/Data"
                    ],
                    tags: ["Canva", "ChatGPT", "AI Ethics", "Careers"]
                },
                {
                    time: "Module 8",
                    phase: "Mini Project",
                    desc: "Apply learning to analyze data and build AI demos.",
                    topics: [
                        "Student marks analysis",
                        "Survey data insights",
                        "AI image classification demo"
                    ],
                    tags: ["Project", "Analysis", "AI Demo"]
                }
            ]
        },
        {
            title: "Green Intelligence – Climate Analytics",
            subtitle: "Specialization in Carbon Markets & ESG Data",
            duration: "8 Modules",
            color: "bg-green-600",
            icon: <FaLeaf />,
            description: [
                "Blend climate science with data craftsmanship to decode carbon markets, verify emissions, and advise on ESG action plans.",
                "Interpret climate indicators and emission datasets to surface risk and opportunity signals.",
                "Model carbon accounting scenarios and simplify complex regulatory frameworks for stakeholders.",
                "Deliver analytics and dashboards that guide climate-positive investments and policy."
            ],
            roadmap: [
                {
                    time: "Module 1",
                    phase: "Climate Science Essentials",
                    desc: "Understand climate indicators that directly affect carbon markets.",
                    topics: [
                        "Weather vs Climate (data view)",
                        "Climate system & carbon cycle",
                        "Greenhouse gases (CO2, CH4, N2O)",
                        "Global warming potential (GWP)",
                        "Climate indicators"
                    ],
                    tags: ["Climate Science", "Carbon Cycle", "GHG", "Global Warming"]
                },
                {
                    time: "Module 2",
                    phase: "Climate & Emissions Data",
                    desc: "Learn where emissions and climate data comes from.",
                    topics: [
                        "Time-series, Country-level, Sector-wise data",
                        "Sources: IPCC, UNFCCC, World Bank",
                        "Formats: CSV, NetCDF (concept)"
                    ],
                    tags: ["IPCC", "UNFCCC", "World Bank", "Data Sources"]
                },
                {
                    time: "Module 3",
                    phase: "Data Processing",
                    desc: "Clean and preprocess emissions data.",
                    topics: [
                        "Cleaning emissions data",
                        "Handling missing reporting",
                        "Aggregation & Normalization",
                        "Hands-on: CO2 emissions preprocessing"
                    ],
                    tags: ["Data Cleaning", "Preprocessing", "Aggregation", "Normalization"]
                },
                {
                    time: "Module 4",
                    phase: "Trends & Analysis",
                    desc: "Analyze emissions trends and correlations using Python tools.",
                    topics: [
                        "Time-series analysis",
                        "Emissions growth vs reduction trends",
                        "Correlation (GDP vs emissions)",
                        "Anomaly detection"
                    ],
                    tags: ["Matplotlib", "Seaborn", "Time-series", "Analysis"]
                },
                {
                    time: "Module 5",
                    phase: "Introduction to Carbon Markets",
                    desc: "Understand carbon credits, trading, and pricing mechanisms.",
                    topics: [
                        "Carbon credits vs offsets",
                        "Compliance vs Voluntary markets",
                        "Cap-and-trade (EU ETS)",
                        "India Carbon Market (ICM)",
                        "Carbon pricing & Allowance allocation"
                    ],
                    tags: ["Carbon Markets", "EU ETS", "ICM", "Carbon Credits"]
                },
                {
                    time: "Module 6",
                    phase: "Carbon Accounting",
                    desc: "Calculate Scope 1, 2, and 3 emissions.",
                    topics: [
                        "Scope 1, Scope 2, Scope 3 emissions",
                        "Emission factors",
                        "Corporate GHG inventories & ESG reporting",
                        "Hands-on: Calculate emissions using activity data"
                    ],
                    tags: ["Scope 1-3", "GHG Inventory", "ESG Reporting", "Accounting"]
                },
                {
                    time: "Module 7",
                    phase: "MRV Systems",
                    desc: "Learn Measurement, Reporting, and Verification standards.",
                    topics: [
                        "Measurement, Reporting & Verification (MRV)",
                        "GHG Protocol & ISO 14064",
                        "Verification process & Audit trails",
                        "Baseline vs project emissions"
                    ],
                    tags: ["MRV", "GHG Protocol", "ISO 14064", "Audit"]
                },
                {
                    time: "Module 8",
                    phase: "Capstone Project",
                    desc: "Apply data science frameworks to solve real carbon market problems.",
                    topics: [
                        "Country-wise carbon allowance gap analysis",
                        "Carbon price trend analysis",
                        "Corporate Scope 1–2 emissions dashboard"
                    ],
                    tags: ["Capstone", "Carbon Analysis", "Dashboard", "Project"]
                }
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen pt-28">
            <div className="bg-brand-lightest py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-darkest mb-6 gsap-fade-up">AI Education Programs for Career Growth</h1>
                    <p className="text-xl text-brand-dark max-w-3xl mx-auto gsap-fade-up">
                        Choose from a wide range of industry-aligned courses designed to launch your career.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-20 lg:space-y-32">
                {programs.map((program, index) => (
                    <div
                        key={index}
                        className={`flex flex-col lg:flex-row gap-8 lg:gap-20 relative ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                    >
                        {/* Content Side */}
                        <div className="flex-1 space-y-12">
                            {/* Header Info (Visible on mobile, but redundant if image side is visible? Keeping it here for flow) */}
                            <div className="gsap-fade-up">
                                <span className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold tracking-wider mb-4 ${program.color}`}>
                                    {program.duration}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-brand-darkest mb-2">{program.title}</h2>
                                <h3 className="text-xl text-brand-accent font-medium mb-6">{program.subtitle}</h3>
                                <div className="space-y-4">
                                    {program.description.map((desc, i) => (
                                        <p key={i} className="text-gray-600 text-lg leading-relaxed border-l-4 border-gray-100 pl-4">
                                            {desc}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            {/* Roadmap */}
                            {/* Roadmap and Benefits */}
                            <RoadmapViewer roadmap={program.roadmap} benefits={(program as any).benefits} />

                            <Link
                                href="/contact"
                                className="inline-block w-full text-center bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-brand-accent hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                            >
                                Apply for {program.title}
                            </Link>
                        </div>

                        {/* Sticky Image Side */}
                        <div className="hidden lg:block lg:w-5/12 relative">
                            <div className="sticky top-32 h-[calc(100vh-160px)] min-h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                                {/* Visual Representation */}
                                <div className={`absolute inset-0 ${program.color} opacity-90 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100`}></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-darkest/50 to-transparent"></div>

                                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
                                    <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-7xl mb-8 border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                        {program.icon}
                                    </div>
                                    <h2 className="text-4xl font-black mb-4 leading-tight">{program.title}</h2>
                                    <div className="w-20 h-1 bg-white/50 rounded-full mb-6"></div>
                                    <p className="text-lg text-white/90 font-medium max-w-xs leading-relaxed">
                                        {program.subtitle}
                                    </p>


                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
