import { FaRobot, FaChartBar, FaLaptopCode, FaLeaf } from "react-icons/fa";

export const programs = [
    {
        title: "AI / ML Architect Program",
        slug: "ai-ml-architect-program",
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
        slug: "data-science-strategic-analytics",
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
        slug: "future-founders-ai-foundation",
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
        slug: "green-intelligence-climate-analytics",
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