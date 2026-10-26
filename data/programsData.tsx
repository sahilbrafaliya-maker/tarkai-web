import { FaRobot, FaChartBar, FaLaptopCode, FaLeaf, FaPython, FaDatabase, FaChartLine, FaBrain, FaProjectDiagram } from "react-icons/fa";

export const programs = [
    {
        title: "AI / ML Architect Program",
        slug: "ai-ml-architect-program",
        subtitle: "Full-Stack Artificial Intelligence Engineering",
        duration: "9 Months",
        color: "bg-blue-600",
        image: "/AI_ML.png",
        brochure: "/TarkAI Edtech Brochure.pdf",
        // image: "/AI_ML_Premium_v2.jpg",
        icon: <FaRobot />,
        description: [
            "A flagship 9-month immersion that builds rock-solid data foundations, levels up your model intuition, and ends with production-ready LLM and agentic systems.",
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
        duration: "9 Months",
        color: "bg-teal-600",
        image: "/Data_Science.png",
        brochure: "/TarkAI Edtech Brochure.pdf",
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
        duration: "3 Months",
        color: "bg-purple-600",
        image: "/Future_Founder.png",
        brochure: "/TarkAI Edtech Brochure.pdf",
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
        duration: "3 Months",
        color: "bg-green-600",
        image: "/Climate_Analytics.png",
        brochure: "/TarkAI Edtech Brochure.pdf",
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
    },
    {
        title: "Python Foundation",
        slug: "python-foundation",
        subtitle: "Core Python Programming for Absolute Beginners",
        duration: "1.5 Months",
        level: "Foundation",
        fee: "₹7,000",
        color: "bg-yellow-500",
        image: "/Python Foundation Workspace.png",
        brochure: "/Python Course Brochure.pdf",
        icon: <FaPython />,
        description: [
            "A focused 1.5-month foundation course that takes you from zero to confident Python programmer with hands-on projects.",
            "Master Python syntax, data types, and core concepts through practical exercises and real-world examples.",
            "Build problem-solving skills with control flow, data structures, functions, and object-oriented programming.",
            "Graduate with a working Python application and the confidence to pursue advanced AI, data science, or development paths."
        ],
        benefits: {
            title: "What You'll Gain",
            list: [
                "Solid Python foundations: syntax, variables, data types, and core programming concepts",
                "Hands-on practice with control flow, loops, and decision-making logic",
                "Proficiency in Python's key data structures: lists, tuples, dictionaries, and sets",
                "Ability to write modular, reusable code using functions and modules",
                "File handling and robust exception management skills",
                "Object-oriented design understanding through classes and inheritance",
                "A complete mini project to showcase in your portfolio"
            ]
        },
        roadmap: [
            {
                time: "Module 1",
                phase: "Python Basics",
                desc: "Write basic Python scripts with confidence.",
                topics: [
                    "Installation & Environment Setup",
                    "Variables and Data Types",
                    "Operators (Arithmetic, Comparison, Logical)",
                    "Input and Output (print, input)",
                    "Type Casting and String Formatting"
                ],
                tags: ["Installation", "Variables", "Data Types", "Operators", "I/O"]
            },
            {
                time: "Module 2",
                phase: "Control Flow",
                desc: "Implement decision-making logic in Python programs.",
                topics: [
                    "if, elif, else Statements",
                    "Nested Conditions",
                    "for Loops and while Loops",
                    "break, continue, and pass",
                    "Loop Patterns and Exercises"
                ],
                tags: ["if-else", "Loops", "for/while", "break/continue"]
            },
            {
                time: "Module 3",
                phase: "Data Structures",
                desc: "Manipulate core Python data structures effectively.",
                topics: [
                    "Lists – Creation, Indexing, Slicing, Methods",
                    "Tuples – Immutability and Use Cases",
                    "Dictionaries – Key-Value Pairs, Methods",
                    "Sets – Operations and Membership",
                    "String Handling and Manipulation"
                ],
                tags: ["Lists", "Tuples", "Dictionaries", "Sets", "String Handling"]
            },
            {
                time: "Module 4",
                phase: "Functions & Modules",
                desc: "Write reusable, modular Python code.",
                topics: [
                    "Defining and Calling Functions",
                    "Arguments, Default Parameters, *args / **kwargs",
                    "Scope – Local and Global Variables",
                    "Lambda Functions",
                    "Importing and Using Modules (math, os, random)",
                    "pip and External Packages"
                ],
                tags: ["Functions", "Arguments", "Scope", "Modules", "pip"]
            },
            {
                time: "Module 5",
                phase: "File Handling & Exceptions",
                desc: "Build robust file-based scripts with error management.",
                topics: [
                    "Reading and Writing Text Files",
                    "File Modes (r, w, a, rb, wb)",
                    "Working with CSV Files",
                    "try, except, else, finally",
                    "Raising and Creating Custom Exceptions"
                ],
                tags: ["File I/O", "CSV", "try-except", "Error Handling", "Exceptions"]
            },
            {
                time: "Module 6",
                phase: "OOP Basics",
                desc: "Understand and apply object-oriented design principles.",
                topics: [
                    "Classes and Objects",
                    "Constructors and Instance Methods",
                    "Attributes: Instance vs Class Level",
                    "Inheritance and Method Overriding",
                    "Core OOP Principles: Encapsulation and Abstraction"
                ],
                tags: ["Classes", "Objects", "Inheritance", "OOP", "Encapsulation"]
            },
            {
                time: "Module 7",
                phase: "Mini Project",
                desc: "Deliver a working Python application applying all foundation concepts.",
                topics: [
                    "Capstone project applying all foundation concepts",
                    "Project Planning and Problem Decomposition",
                    "Implementing Core Logic with Functions & OOP",
                    "File I/O Integration",
                    "Testing, Debugging, and Code Review"
                ],
                tags: ["Capstone", "Project", "Real Application", "Debugging"]
            }
        ]
    },
    {
        title: "Advanced Python",
        slug: "advanced-python",
        subtitle: "Production-Grade Engineering, Concurrency & Data Pipelines",
        duration: "3 Months",
        level: "Advanced",
        fee: "₹15,000",
        color: "bg-indigo-600",
        image: "/Advanced Python Workspace.png",
        brochure: "/Python Course Brochure.pdf",
        icon: <FaPython />,
        description: [
            "A comprehensive 3-month advanced Python program designed to elevate your programming to professional, production-grade engineering standards.",
            "Master advanced object-oriented architectures, functional paradigms, custom decorators, and high-performance generators.",
            "Harness NumPy and Pandas for robust data manipulation, integrate REST APIs, and conquer concurrency with multithreading, multiprocessing, and async programming.",
            "Write rock-solid test suites with pytest, connect to SQL databases, and build an end-to-end automation or data pipeline capstone project."
        ],
        benefits: {
            title: "What You'll Gain",
            list: [
                "Advanced OOP mastery: multiple inheritance, MRO, magic methods, and scalable class hierarchies",
                "Functional programming fluency: lambda functions, higher-order functions, custom decorators, and memory-efficient generators",
                "Data handling expertise: professional data cleaning, transformation, and analysis with NumPy and Pandas",
                "API & web integration: consume REST APIs, parse JSON payloads, manage sessions, and handle errors gracefully",
                "Concurrency & async mastery: multithreading, multiprocessing, and asyncio for high-performance applications",
                "Testing & debugging excellence: comprehensive test suites with pytest, mocks, and professional debugging techniques",
                "Database engineering: connect Python to SQL databases with safe parameterized queries and transaction control",
                "Portfolio-ready capstone project: build and showcase an end-to-end automated data pipeline or engineering application"
            ]
        },
        roadmap: [
            {
                time: "Module 1",
                phase: "Advanced OOP",
                desc: "Design scalable, maintainable class hierarchies using enterprise Python object-oriented patterns.",
                topics: [
                    "Inheritance and Polymorphism with Multiple Inheritance and MRO",
                    "Encapsulation, Property Decorators, and Data Protection",
                    "Magic and Special Dunder Methods for Custom Class Behaviors",
                    "Abstract Base Classes, Interfaces, and Subclass Registration",
                    "Enterprise Object-Oriented Design Patterns in Python"
                ],
                tags: ["OOP", "Inheritance", "Magic Methods", "Design Patterns", "Polymorphism"]
            },
            {
                time: "Module 2",
                phase: "Functional Programming",
                desc: "Write clean, modular, and efficient functional-style Python code with advanced constructs.",
                topics: [
                    "Lambda Functions, Anonymous Expressions, and Closures",
                    "Higher-Order Functional Programming: Map, Filter, and Reduce",
                    "Function Decorators, Class Decorators, and Chained Decorators",
                    "Custom Iterators, Protocols, and Iterable Sequences",
                    "Generators, Yield Expressions, and Memory Optimization"
                ],
                tags: ["Functional Programming", "Lambda", "Decorators", "Generators", "Iterators"]
            },
            {
                time: "Module 3",
                phase: "Data Handling Libraries",
                desc: "Manipulate, clean, and analyze high-volume datasets using NumPy and Pandas.",
                topics: [
                    "NumPy Multi-Dimensional Arrays, Vectorization, and Broadcasting",
                    "Pandas Series and DataFrames for Robust Data Ingestion and Export",
                    "Comprehensive Data Cleaning: Handling Nulls, Outliers, and Type Casting",
                    "Advanced Filtering, Slicing, Indexing, and Conditional Queries",
                    "Aggregations with GroupBy, Pivot Tables, Merging, and Joining"
                ],
                tags: ["NumPy", "Pandas", "Data Cleaning", "Data Analysis", "Data Manipulation"]
            },
            {
                time: "Module 4",
                phase: "APIs & Web Requests",
                desc: "Integrate external data sources and communicate seamlessly with modern web services.",
                topics: [
                    "REST Architecture Principles and Core HTTP Methods",
                    "Working with the Requests Library, Headers, and Client Sessions",
                    "JSON Serialization, Deserialization, and Schema Validation",
                    "API Authentication Standards: API Keys, Bearer Tokens, and Basic Auth",
                    "Production Error Handling, Rate Limiting, Timeouts, and Retries"
                ],
                tags: ["REST APIs", "Requests Library", "JSON", "HTTP", "Data Integration"]
            },
            {
                time: "Module 5",
                phase: "Multithreading & Multiprocessing",
                desc: "Build concurrent and high-performance Python programs for I/O-bound and CPU-bound tasks.",
                topics: [
                    "Concurrency vs Parallelism and the Python Global Interpreter Lock",
                    "Multithreading and Thread Pools for Concurrent I/O Operations",
                    "Multiprocessing and Process Pools for Heavy Computational Tasks",
                    "Asynchronous Event-Driven Programming with Asyncio and Coroutines",
                    "Thread Safety, Synchronization Primitives, Locks, and Semaphores"
                ],
                tags: ["Concurrency", "Multithreading", "Multiprocessing", "AsyncIO", "GIL"]
            },
            {
                time: "Module 6",
                phase: "Testing & Debugging",
                desc: "Write reliable, testable, and production-grade code with automated test suites.",
                topics: [
                    "Unit Testing Standards with Python's Built-in Unittest Framework",
                    "Modern Test Automation with Pytest: Fixtures and Parametrization",
                    "Mocking External Dependencies, REST APIs, and Database Calls",
                    "Interactive Debugging with Breakpoints and Diagnostic Profilers",
                    "Static Code Analysis, Type Annotations, and Linting Best Practices"
                ],
                tags: ["Unit Testing", "pytest", "Mocking", "Debugging", "Code Quality"]
            },
            {
                time: "Module 7",
                phase: "Database Connectivity",
                desc: "Connect Python applications to SQL databases to build resilient, data-driven backends.",
                topics: [
                    "Connecting Python to Relational Databases like PostgreSQL, MySQL, and SQLite",
                    "Python Database API Standards and Connection Pool Management",
                    "Executing Secure CRUD Queries with Parameterized SQL",
                    "Transaction Control, Atomic Commits, and Rollback Safety",
                    "Object Relational Mapping Fundamentals with SQLAlchemy"
                ],
                tags: ["SQL", "Database", "PostgreSQL", "SQLite", "SQLAlchemy", "CRUD"]
            },
            {
                time: "Module 8",
                phase: "Capstone Project",
                desc: "Deliver a complete, portfolio-ready end-to-end automation or data pipeline project.",
                topics: [
                    "End-to-End System Design: Automated Extraction to Persistent Storage",
                    "Automated Data Ingestion from Live External REST APIs",
                    "Data Transformation, Validation, and Pipeline Processing with Pandas",
                    "Database Persistence, Query Indexing, and Structured Storage",
                    "Automated Pytest Coverage, Error Logging, and Portfolio Showcase"
                ],
                tags: ["Capstone", "Data Pipeline", "Automation", "Portfolio", "End-to-End"]
            }
        ]
    },
    {
        title: "SQL + DBMS",
        slug: "sql-dbms",
        subtitle: "Relational Database Design, Query Optimization & Data Architecture",
        duration: "1.5 Months",
        level: "Foundation",
        fee: "₹7,000",
        color: "bg-cyan-600",
        image: "/SQL_+_DBMS_Modern_Database_Workspace.png",
        brochure: "/TarkAI Edtech Brochure.pdf",
        icon: <FaDatabase />,
        description: [
            "A practical 1.5-month foundation course designed to turn beginners into confident database designers and SQL query experts.",
            "Understand relational database management systems (RDBMS), relational schemas, primary and foreign keys, and normalization principles.",
            "Write clean, powerful SQL queries—from fundamental SELECT statements and multi-table JOINs to aggregations, subqueries, and views.",
            "Design, populate, and optimize a real-world relational database in an end-to-end mini capstone project."
        ],
        benefits: {
            title: "What You'll Gain",
            list: [
                "Comprehensive DBMS foundation: RDBMS architecture, relational models, primary/foreign keys, and data integrity",
                "Database normalization mastery: normal forms (1NF, 2NF, 3NF) for scalable schema design",
                "Core SQL querying fluency: SELECT, WHERE, ORDER BY, operators, filtering, and sorting",
                "Multi-table relational joins: inner, outer, left, and right joins to connect complex business data",
                "Analytical grouping & aggregations: GROUP BY, HAVING, and essential SQL aggregate functions",
                "Advanced modular queries: subqueries, views, and introduction to Common Table Expressions (CTEs)",
                "End-to-end database mini project: design and implement a complete relational database for your portfolio"
            ]
        },
        roadmap: [
            {
                time: "Module 1",
                phase: "DBMS Fundamentals",
                desc: "Understand database design principles, relational models, and normalization concepts.",
                topics: [
                    "Database Concepts and Architecture: File Systems vs RDBMS",
                    "Relational Model Foundations: Relations, Attributes, and Domains",
                    "Keys in RDBMS: Primary, Foreign, Candidate, and Unique Keys",
                    "Entity-Relationship (ER) Modeling and Schema Diagram Translation",
                    "Database Normalization Principles: 1NF, 2NF, and 3NF Standards"
                ],
                tags: ["DBMS", "RDBMS", "Primary Keys", "Foreign Keys", "Normalization", "ER Modeling"]
            },
            {
                time: "Module 2",
                phase: "SQL Basics",
                desc: "Write clean, foundational SQL queries to retrieve and filter data with precision.",
                topics: [
                    "Data Definition Language (DDL) and Data Manipulation Language (DML)",
                    "Creating, Altering, and Dropping Tables with Constraints",
                    "Data Retrieval with SELECT Statements and Column Aliasing",
                    "Row-Level Filtering using WHERE Clauses and Comparison Operators",
                    "Sorting Results with ORDER BY and Restricting Rows with LIMIT"
                ],
                tags: ["SQL Syntax", "SELECT", "WHERE", "ORDER BY", "Filtering", "DML/DDL"]
            },
            {
                time: "Module 3",
                phase: "Joins & Relationships",
                desc: "Query across multiple relational tables with confidence and accuracy.",
                topics: [
                    "Understanding Table Relationships: One-to-One, One-to-Many, Many-to-Many",
                    "Foreign Key Constraints and Enforcing Referential Integrity",
                    "Inner Joins, Left Outer Joins, and Right Outer Joins",
                    "Full Outer Joins, Cross Joins, and Self Joins for Hierarchical Data",
                    "Multi-Table Query Design Across Complex Business Schemas"
                ],
                tags: ["Joins", "INNER JOIN", "LEFT JOIN", "Foreign Keys", "Multi-Table Queries"]
            },
            {
                time: "Module 4",
                phase: "Aggregation & Grouping",
                desc: "Summarize, aggregate, and extract actionable business insights from dataset rows.",
                topics: [
                    "SQL Aggregate Functions: Count, Sum, Average, Minimum, and Maximum",
                    "Categorical Data Grouping with the GROUP BY Clause",
                    "Post-Aggregation Filtering using HAVING vs Row Filtering with WHERE",
                    "Combining Aggregations with Multi-Table Joins for Analytical Reports",
                    "Handling Null Values and Edge Cases in Analytical Summaries"
                ],
                tags: ["Aggregation", "GROUP BY", "HAVING", "COUNT", "SUM", "AVG"]
            },
            {
                time: "Module 5",
                phase: "Subqueries & Views",
                desc: "Build modular, readable, and reusable complex SQL queries.",
                topics: [
                    "Nested Subqueries in WHERE, FROM, and SELECT Clauses",
                    "Correlated Subqueries and Subquery Operators",
                    "Creating, Updating, and Querying Database Views",
                    "Data Security, Encapsulation, and Query Abstraction via Views",
                    "Introduction to Common Table Expressions for Modular Query Design"
                ],
                tags: ["Subqueries", "Nested Queries", "Views", "CTEs", "Modular SQL"]
            },
            {
                time: "Module 6",
                phase: "Mini Project",
                desc: "Apply DBMS and SQL skills end-to-end by designing and querying a real-world relational database.",
                topics: [
                    "Business Problem Decomposition and Relational Schema Blueprinting",
                    "DDL Implementation with Primary Keys, Foreign Keys, and Constraints",
                    "Realistic Mock Data Seeding and Data Ingestion",
                    "Authoring Analytical Queries with Joins, Grouping, and Views",
                    "Schema Validation, Documentation, and Portfolio Presentation"
                ],
                tags: ["Mini Project", "Schema Design", "Real-World SQL", "Portfolio", "Optimization"]
            }
        ]
    },
    {
        title: "Advanced SQL + DBMS",
        slug: "advanced-sql-dbms",
        subtitle: "Query Optimization, Indexing, Triggers, Enterprise Design & NoSQL",
        duration: "2.5 Months",
        level: "Advanced",
        fee: "₹13,000",
        color: "bg-emerald-600",
        image: "/Advanced SQL Workspace with Database Visuals.png",
        brochure: "/TarkAI Edtech Brochure.pdf",
        icon: <FaDatabase />,
        description: [
            "An intensive 2.5-month advanced curriculum engineered for developers and data professionals looking to master high-performance database engineering.",
            "Conquer complex analytical queries with window functions, Common Table Expressions (CTEs), and recursive queries.",
            "Master database indexing strategies, query execution plans (EXPLAIN ANALYZE), performance tuning, and stored logic with procedures and triggers.",
            "Design enterprise-scale relational schemas, explore modern NoSQL document stores with MongoDB, and deliver a production-ready capstone database project."
        ],
        benefits: {
            title: "What You'll Gain",
            list: [
                "Advanced query mastery: window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG/LEAD), CTEs, and recursive hierarchy queries",
                "Query performance tuning: B-tree indexes, execution plans (EXPLAIN), and query cost reduction",
                "Database automation: robust stored procedures, functions, triggers, and ACID transaction locks",
                "Enterprise database architecture: advanced normalization (BCNF, 4NF), partitioning, and ER modeling",
                "NoSQL & polyglot persistence: MongoDB document storage, indexing, and relational vs non-relational trade-offs",
                "Production-style capstone project: build, tune, and query an enterprise-scale database for your portfolio"
            ]
        },
        roadmap: [
            {
                time: "Module 1",
                phase: "Advanced Query Techniques",
                desc: "Write complex analytical queries using window functions, CTEs, and recursive hierarchy traversal.",
                topics: [
                    "Window Functions Architecture: Partitioning and Ordering Windows",
                    "Ranking Functions: Row Number, Rank, Dense Rank, and Quantiles",
                    "Lead, Lag, First Value, and Running Aggregate Calculations",
                    "Modular Common Table Expressions (CTEs) for Readability",
                    "Recursive Queries for Hierarchical Trees and Organizational Graphs"
                ],
                tags: ["Window Functions", "CTEs", "Recursive Queries", "PARTITION BY", "LAG/LEAD", "Analytics"]
            },
            {
                time: "Module 2",
                phase: "Indexing & Optimization",
                desc: "Analyze query execution plans, design optimal indexes, and eliminate query bottlenecks.",
                topics: [
                    "Internal Database Storage: Pages, Blocks, and Buffer Pools",
                    "B-Tree Indexes, Clustered vs Non-Clustered Indexes, and Composite Keys",
                    "Deciphering Query Execution Plans and Query Cost Estimations",
                    "Diagnosing Full Table Scans and Eliminating Slow Join Strategies",
                    "Covering Indexes, Index SARGability, and Optimizer Statistics"
                ],
                tags: ["Indexing", "Query Optimization", "EXPLAIN ANALYZE", "B-Tree", "Performance Tuning"]
            },
            {
                time: "Module 3",
                phase: "Stored Procedures & Triggers",
                desc: "Automate database business logic, enforce integrity rules, and handle complex transactions.",
                topics: [
                    "Stored Procedures and User-Defined Functions for Encapsulated Logic",
                    "Control Flow, Conditional Branches, and Error Handlers in SQL",
                    "Event-Driven Triggers for Audit Trails and Automated Data Synchronization",
                    "ACID Transactions, Savepoints, and Rollback Protocols",
                    "Locking Mechanisms, Transaction Isolation Levels, and Deadlock Prevention"
                ],
                tags: ["Stored Procedures", "Triggers", "UDFs", "Transactions", "Concurrency", "ACID"]
            },
            {
                time: "Module 4",
                phase: "Database Design",
                desc: "Design production-grade, highly scalable schemas with advanced normalization and modeling.",
                topics: [
                    "Higher Normal Forms: Boyce-Codd Normal Form (BCNF) and Fourth Normal Form",
                    "Strategic Denormalization Patterns for High-Throughput Read Scalability",
                    "Enterprise Entity-Relationship Modeling with Complex Cardinalities",
                    "Horizontal Table Partitioning: Range, List, and Hash Strategies",
                    "Read Replicas, Sharding Architecture, and High Availability Concepts"
                ],
                tags: ["Database Design", "BCNF", "Denormalization", "ER Modeling", "Partitioning", "Schema"]
            },
            {
                time: "Module 5",
                phase: "NoSQL Overview",
                desc: "Compare relational vs non-relational databases and learn document stores with MongoDB.",
                topics: [
                    "Relational vs NoSQL Paradigms: The CAP Theorem and ACID vs BASE",
                    "Document Databases with MongoDB: Collections and BSON Documents",
                    "Flexible Schema Modeling, Document Nesting, and Referencing",
                    "MongoDB Aggregation Pipeline for Multi-Stage Analytical Processing",
                    "Architectural Decision Matrix: Choosing the Right Database for the Job"
                ],
                tags: ["NoSQL", "MongoDB", "Document Store", "Aggregation Framework", "CAP Theorem"]
            },
            {
                time: "Module 6",
                phase: "Capstone Project",
                desc: "Design, optimize, and query a real-world enterprise database end-to-end.",
                topics: [
                    "Enterprise System Architecture and Scalable Schema Blueprint",
                    "Production DDL Implementation with Stored Procedures and Triggers",
                    "Large-Scale Data Seeding and Stress-Testing Queries Under Load",
                    "Query Performance Tuning with Strategic Indexing and Benchmarking",
                    "Comprehensive Architectural Documentation and Portfolio Presentation"
                ],
                tags: ["Capstone", "Enterprise DB", "Query Tuning", "NoSQL Integration", "Portfolio"]
            }
        ]
    },
    {
        title: "Professional Data Analytics",
        slug: "professional-data-analytics",
        subtitle: "Business Intelligence, KPI Strategy, Dashboards & Statistical Decisions",
        duration: "2 Months",
        level: "Professional",
        fee: "₹25,000 – ₹30,000",
        color: "bg-blue-600",
        image: "/Professional Data Analytics Workspace.png",
        brochure: "/Data Analystics Brochure.pdf",
        icon: <FaChartLine />,
        description: [
            "An executive 2-month professional program built to transform you into an indispensable data analyst capable of driving high-impact business decisions.",
            "Frame business problems with clarity, establish north-star KPIs, and translate organizational goals into actionable analytical questions.",
            "Master data wrangling in Pandas & Advanced Excel, explore dataset distributions with EDA, and validate hypotheses with rigorous statistical testing.",
            "Build interactive, C-suite ready dashboards in Power BI and Tableau, culminating in an end-to-end business analytics capstone presentation."
        ],
        benefits: {
            title: "What You'll Gain",
            list: [
                "Business acumen & KPI formulation: define north-star metrics, understand the analytics lifecycle, and align analysis with business ROI",
                "Production data wrangling: clean messy datasets, handle missing values, and transform complex schemas with Pandas & Excel",
                "Insightful Exploratory Data Analysis (EDA): detect trends, correlations, outliers, and hidden customer behaviors",
                "Executive dashboard design: build interactive dashboards and automated reports in Power BI, Tableau, and Matplotlib",
                "Statistical reasoning: conduct hypothesis testing, analyze probability distributions, and design A/B test experiments",
                "Portfolio-ready business capstone: deliver an end-to-end data-driven business report and presentation ready for stakeholders"
            ]
        },
        roadmap: [
            {
                time: "Module 1",
                phase: "Analytics Foundations",
                desc: "Frame business problems analytically, map the data analytics lifecycle, and define key performance indicators.",
                topics: [
                    "The End-to-End Data Analytics Lifecycle from Problem to Impact",
                    "Formulating Business KPIs: Acquisition, Retention, Churn, and Lifetime Value",
                    "Descriptive, Diagnostic, Predictive, and Prescriptive Frameworks",
                    "Translating Business Goals into Structured Analytical Questions",
                    "Data Governance, Compliance, and Professional Ethics"
                ],
                tags: ["Analytics Lifecycle", "KPIs", "Business Metrics", "Problem Framing", "Strategy"]
            },
            {
                time: "Module 2",
                phase: "Data Wrangling",
                desc: "Clean, transform, and prepare messy real-world datasets for downstream analytics using Pandas and Excel.",
                topics: [
                    "Advanced Excel Workflows: Power Query, Lookups, and Pivot Models",
                    "Data Cleaning with Pandas: Handling Missing Values and Anomalies",
                    "Data Parsing, Type Casting, and DateTime Manipulation",
                    "Dataset Reshaping: Pivoting, Melting, and Multi-Index Grouping",
                    "Automated Data Cleaning Scripts and Quality Assurance Checks"
                ],
                tags: ["Data Wrangling", "Pandas", "Advanced Excel", "Data Cleaning", "Power Query"]
            },
            {
                time: "Module 3",
                phase: "Exploratory Data Analysis",
                desc: "Extract actionable insights, unearth hidden correlations, and summarize data patterns with EDA techniques.",
                topics: [
                    "Univariate and Multivariate Descriptive Statistics",
                    "Correlation Analysis, Heatmap Matrices, and Feature Relationships",
                    "Outlier Detection and Statistical Distribution Profiling",
                    "Cohort Analysis, Retention Trends, and Customer Segmentation",
                    "Translating Data Distributions into Actionable Business Observations"
                ],
                tags: ["EDA", "Correlation", "Outliers", "Cohort Analysis", "Statistical Summaries"]
            },
            {
                time: "Module 4",
                phase: "Data Visualization",
                desc: "Design intuitive, interactive dashboards and compelling visual reports using Power BI, Tableau, and Matplotlib.",
                topics: [
                    "Visual Storytelling, Color Psychology, and Dashboard User Experience",
                    "Power BI Data Modeling: Star Schemas, Relationships, and DAX Measures",
                    "Tableau Visualizations: Calculated Fields, Level of Detail, and Interactive Filters",
                    "Custom Python Charting with Matplotlib and Seaborn",
                    "Automated Reporting Workflows and Executive Performance Summaries"
                ],
                tags: ["Power BI", "Tableau", "DAX", "Data Visualization", "Dashboards", "Matplotlib"]
            },
            {
                time: "Module 5",
                phase: "Statistics for Analytics",
                desc: "Apply statistical rigor to business data, validate assumptions, and make data-backed recommendations.",
                topics: [
                    "Probability Distributions and the Central Limit Theorem in Practice",
                    "Hypothesis Testing: Formulating Hypotheses, Significance, and Confidence Intervals",
                    "Parametric and Non-Parametric Significance Tests (T-Test, ANOVA, Chi-Square)",
                    "A/B Testing Methodology: Sample Sizing, Control Groups, and Statistical Lift",
                    "Avoiding Common Pitfalls: Confounding Factors and Sampling Biases"
                ],
                tags: ["Statistics", "Hypothesis Testing", "A/B Testing", "Probability Distributions", "p-Values"]
            },
            {
                time: "Module 6",
                phase: "Capstone Project",
                desc: "Deliver and present a comprehensive end-to-end data-driven business report addressing real market challenges.",
                topics: [
                    "Comprehensive Business Case Study Across Finance, E-Commerce, or SaaS",
                    "End-to-End Pipeline: Ingestion, Cleaning, and Statistical Validation",
                    "In-Depth Exploratory Insights and Trend Synthesis",
                    "Interactive Executive Power BI / Tableau Dashboard Creation",
                    "Strategic Presentation Deck with Actionable Business Recommendations"
                ],
                tags: ["Capstone", "Business Analytics", "Executive Deck", "Portfolio", "Case Study"]
            }
        ]
    },
    {
        title: "Generative AI & LLMs",
        slug: "generative-ai-llms",
        subtitle: "Transformers, Prompt Engineering, RAG Pipelines & Multi-Modal Models",
        duration: "2–3 Months",
        level: "Advanced AI",
        fee: "₹30,000 – ₹45,000",
        color: "bg-purple-600",
        image: "/Generative_AI_&_LLMs_Workspace.png",
        brochure: "/TarkAI Edtech Brochure.pdf",
        icon: <FaBrain />,
        description: [
            "An elite 2–3 month immersion into cutting-edge Generative AI, foundational Large Language Models (LLMs), and agentic product engineering.",
            "Dive deep into the Transformer architecture, multi-head self-attention mechanisms, and the mathematical mechanics driving modern LLMs.",
            "Master production-grade prompt engineering, vector embeddings, semantic search, and state-of-the-art Retrieval-Augmented Generation (RAG) pipelines.",
            "Fine-tune models with LoRA/QLoRA, integrate multi-modal diffusion engines (image/audio), and ship a deployable GenAI application."
        ],
        benefits: {
            title: "What You'll Gain",
            list: [
                "Generative AI foundations: understand generative vs discriminative architectures and the evolving GenAI ecosystem",
                "Deep Transformer mastery: decode multi-head self-attention, positional encoding, and transformer internals from scratch",
                "LLM application engineering: master prompt design, function calling, tool use, and OpenAI/Anthropic SDKs",
                "Production RAG architectures: vector databases (Pinecone, Chroma), chunking strategies, and hybrid semantic retrieval",
                "Fine-tuning expertise: parameter-efficient fine-tuning (PEFT, LoRA, QLoRA) on custom domain datasets",
                "Multi-modal generative AI: explore Stable Diffusion, latent diffusion models, and audio generation pipelines",
                "Deployable capstone product: engineer and deploy a production-ready, full-stack Generative AI application"
            ]
        },
        roadmap: [
            {
                time: "Module 1",
                phase: "Foundations of Generative AI",
                desc: "Understand GenAI fundamentals, contrasting generative and discriminative paradigms and navigating the model landscape.",
                topics: [
                    "Generative vs Discriminative AI: Probability Models and Sampling",
                    "Evolution of NLP: From N-Grams and Recurrent Networks to LLMs",
                    "The Open-Source and Proprietary Foundation Model Ecosystem",
                    "Evaluating Generative Models: Benchmark Metrics and Human Feedback (RLHF)",
                    "AI Safety, Guardrails, and Responsible Model Deployment Standards"
                ],
                tags: ["Generative AI", "Foundation Models", "LLM Landscape", "RLHF", "Model Evaluation"]
            },
            {
                time: "Module 2",
                phase: "Transformer Architecture",
                desc: "Understand how LLMs work internally by dissecting the attention mechanism and transformer mechanics.",
                topics: [
                    "Intuition and Mathematics of Scaled Dot-Product Self-Attention",
                    "Multi-Head Attention Mechanisms and Feed-Forward Neural Blocks",
                    "Positional Encodings: Sinusoidal, Rotary Position Embeddings (RoPE), and Context Scaling",
                    "Architectural Archetypes: Encoders, Decoders, and Encoder-Decoder Hybrids",
                    "Subword Tokenization Algorithms and Vocabulary Management"
                ],
                tags: ["Transformers", "Self-Attention", "RoPE", "Tokenization", "Architecture"]
            },
            {
                time: "Module 3",
                phase: "Working with LLMs",
                desc: "Build LLM-powered applications using advanced prompting, API orchestration, and vector embeddings.",
                topics: [
                    "Advanced Prompt Engineering: Few-Shot, Chain-of-Thought, and ReAct Patterns",
                    "API Integration with Frontier Models like OpenAI, Anthropic, and Groq",
                    "Function Calling, Structured JSON Outputs, and Tool Orchestration",
                    "Vector Embeddings: High-Dimensional Geometry and Similarity Metrics",
                    "Application Frameworks: LangChain and LlamaIndex for LLM Workflows"
                ],
                tags: ["Prompt Engineering", "OpenAI API", "Vector Embeddings", "LangChain", "Tool Calling"]
            },
            {
                time: "Module 4",
                phase: "Fine-tuning & RAG",
                desc: "Customize LLMs for domain-specific tasks using Retrieval-Augmented Generation and parameter-efficient fine-tuning.",
                topics: [
                    "Retrieval-Augmented Generation (RAG) Architecture and Vector Database Setup",
                    "Document Chunking Strategies, Semantic Indexing, and Re-Ranking",
                    "Decision Matrix: When to Prompt, When to RAG, and When to Fine-Tune",
                    "Supervised Fine-Tuning and Domain Instruction Datasets",
                    "Parameter-Efficient Fine-Tuning with LoRA and QLoRA on Modern GPUs"
                ],
                tags: ["RAG", "Vector Databases", "Fine-Tuning", "LoRA", "QLoRA", "Embeddings"]
            },
            {
                time: "Module 5",
                phase: "Image & Audio Generation",
                desc: "Explore multi-modal generative AI, including diffusion models, text-to-image, and audio synthesis.",
                topics: [
                    "Multi-Modal AI Architecture: Vision-Language Models and Cross-Attention",
                    "Diffusion Model Foundations: Forward Noise and Reverse Denoising Dynamics",
                    "Latent Diffusion Architectures and Image Generation Workflows",
                    "Audio Synthesis and Speech-to-Text Transcription with Whisper",
                    "Multi-Modal Agent Pipelines Combining Vision, Audio, and Text"
                ],
                tags: ["Diffusion Models", "Stable Diffusion", "Multi-Modal AI", "Voice AI", "Whisper"]
            },
            {
                time: "Module 6",
                phase: "Capstone Project",
                desc: "Build, package, and deliver a deployable, production-ready GenAI product.",
                topics: [
                    "End-to-End GenAI Product Scoping and Architectural Design",
                    "Implementing an Enterprise RAG Engine or Domain Assistant",
                    "Security Layers: Prompt Injection Defense and Response Guardrails",
                    "FastAPI Backend and Modern Web Interface Deployment",
                    "Full-Stack Deployment, Cloud Hosting, and Project Portfolio Showcase"
                ],
                tags: ["Capstone", "Production GenAI", "Guardrails", "FastAPI", "Full-Stack AI", "Portfolio"]
            }
        ]
    },
    {
        title: "AI Agents & Automation",
        slug: "ai-agents-automation",
        subtitle: "Autonomous Agents, LangGraph, Multi-Agent Swarms & Enterprise Automation",
        duration: "2–3 Months",
        level: "Advanced AI",
        fee: "₹30,000 – ₹45,000",
        color: "bg-teal-600",
        image: "/AI_Agents_&_Automation_Workspace.png",
        brochure: "/TarkAI Edtech Brochure.pdf",
        icon: <FaProjectDiagram />,
        description: [
            "An elite 2–3 month advanced specialization in autonomous AI agents, tool orchestration, and multi-agent workflow automation.",
            "Move beyond basic chatbots—build cognitive AI agents capable of planning, goal decomposition, reflection, and taking real-world actions.",
            "Master industry-standard agent frameworks including LangGraph, AutoGen, and CrewAI for complex stateful workflows.",
            "Connect agents to live APIs, databases, and enterprise automation pipelines, deploying an autonomous multi-agent capstone solution."
        ],
        benefits: {
            title: "What You'll Gain",
            list: [
                "Agentic AI foundations: distinguish cognitive agents from passive LLMs, understand the ReAct framework, and identify high-value enterprise use cases",
                "Modern agent framework mastery: build robust single-purpose and cyclic agents using LangChain, LangGraph, and AutoGen",
                "Action & tool execution: connect agents to REST APIs, SQL databases, file systems, and web scrapers with function calling",
                "Multi-agent system design: orchestrate specialized agent swarms with shared memory, role delegation, and consensus mechanisms",
                "Enterprise workflow automation: embed autonomous agents into business pipelines (CRMs, ERPs, customer support, and code review)",
                "Autonomous capstone deployment: engineer and deploy an end-to-end multi-agent automation platform"
            ]
        },
        roadmap: [
            {
                time: "Module 1",
                phase: "Agentic AI Foundations",
                desc: "Understand agentic AI concepts, reasoning loops, and what separates autonomous agents from traditional chatbots.",
                topics: [
                    "Foundations of Autonomous Agents: Perception, Planning, Memory, and Action",
                    "Contrasting Passive Language Models, Workflows, and Autonomous Agents",
                    "Cognitive Reasoning Loops: ReAct, Plan-and-Solve, and Self-Reflection",
                    "High-Impact Commercial Use Cases in Research, Code Generation, and Support",
                    "Agent Guardrails, Safety Boundaries, and Human-in-the-Loop Controls"
                ],
                tags: ["Agentic AI", "Cognitive Architecture", "ReAct Framework", "Autonomy", "HITL"]
            },
            {
                time: "Module 2",
                phase: "Agent Frameworks",
                desc: "Build single-purpose and cyclical agents using leading frameworks: LangChain, LangGraph, and AutoGen.",
                topics: [
                    "The Agent Framework Ecosystem: LangGraph, AutoGen, and CrewAI",
                    "LangGraph Architecture: State Graphs, Nodes, Edges, and Router Conditions",
                    "Cyclical Problem Solving: Handling Multi-Step Loops and Error Recovery",
                    "State Checkpointing and Long-Term Memory Persistence",
                    "Building and Unit-Testing Your First Autonomous Single-Purpose Agent"
                ],
                tags: ["LangGraph", "LangChain", "AutoGen", "State Graphs", "Memory Management"]
            },
            {
                time: "Module 3",
                phase: "Tool Use & Function Calling",
                desc: "Enable agents to execute real-world actions by connecting them to external APIs, databases, and custom tools.",
                topics: [
                    "Tool Use Architecture: Function Calling and Pydantic Schema Definitions",
                    "Connecting Agents to External Web APIs and Business Services",
                    "Database Agents: Text-to-SQL Generation and Safe Query Execution",
                    "Safe Sandboxes for Code Execution, File Manipulation, and Web Browsing",
                    "Structured Response Validation, Error Handling, and Retry Fallbacks"
                ],
                tags: ["Tool Use", "Function Calling", "Text-to-SQL", "API Integration", "Sandboxes"]
            },
            {
                time: "Module 4",
                phase: "Multi-Agent Systems",
                desc: "Design multi-agent collaborative workflows with orchestration, shared memory, and task delegation.",
                topics: [
                    "Multi-Agent Design Patterns: Hierarchical Teams and Peer Networks",
                    "Role Specialization, System Prompts, and Agent Personas",
                    "Inter-Agent Communication and Structured Message Passing",
                    "Dynamic Task Decomposition and Collaborative Consensus Protocols",
                    "Shared Knowledge Graphs and Synchronized Working Memory"
                ],
                tags: ["Multi-Agent Systems", "Swarm Intelligence", "Orchestration", "Task Delegation", "Consensus"]
            },
            {
                time: "Module 5",
                phase: "Automation Pipelines",
                desc: "Automate complex business tasks by integrating intelligent agents directly into corporate processes.",
                topics: [
                    "Event-Driven Agentic Automation Architecture",
                    "Integrating Agents into Enterprise Ecosystems (Slack, Notion, CRMs, Email)",
                    "Webhook Listeners, Asynchronous Workers, and Background Processing",
                    "Cost Optimization, Token Budgeting, and Latency Tuning",
                    "Observability, Trace Analysis, and Performance Monitoring with LangSmith"
                ],
                tags: ["Workflow Automation", "Enterprise Pipelines", "Webhooks", "LangSmith", "Cost Tuning"]
            },
            {
                time: "Module 6",
                phase: "Capstone Project",
                desc: "Build, test, and deploy an autonomous, end-to-end agent-based system for a real-world enterprise challenge.",
                topics: [
                    "Autonomous Multi-Agent Architecture and Problem Blueprint",
                    "Multi-Agent Collaboration Implementation with LangGraph or CrewAI",
                    "Live Tool Integration: Web Services, Databases, and File Parsers",
                    "Enterprise Security Protocols, Guardrails, and Execution Tracing",
                    "Containerized Cloud Deployment, Live Demo, and Portfolio Showcase"
                ],
                tags: ["Capstone", "Autonomous Agents", "LangGraph", "Docker", "Production Deployment", "Portfolio"]
            }
        ]
    }
];  