-- ============================================================
-- Shaurav's Portfolio — Supabase Setup Script
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- ============================================================
-- 1. CREATE TABLES
-- ============================================================

-- Experience (work history, internships, research roles)
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL means "Present"
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Projects (SDE and ML project showcase)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  demo_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Achievements (competitions, certifications, publications, etc.)
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE,
  category TEXT NOT NULL DEFAULT 'General',
  link TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Hobbies
CREATE TABLE IF NOT EXISTS hobbies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- icon name from react-icons (e.g. "FaGuitar")
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact Messages (visitor submissions)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ============================================================
-- 2. ENABLE ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- 3. RLS POLICIES
-- ============================================================

-- Experience: public read
CREATE POLICY "Allow public read access on experience"
  ON experience FOR SELECT
  TO anon
  USING (true);

-- Projects: public read
CREATE POLICY "Allow public read access on projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

-- Achievements: public read
CREATE POLICY "Allow public read access on achievements"
  ON achievements FOR SELECT
  TO anon
  USING (true);

-- Hobbies: public read
CREATE POLICY "Allow public read access on hobbies"
  ON hobbies FOR SELECT
  TO anon
  USING (true);

-- Contact Messages: public INSERT only (no SELECT for anon)
CREATE POLICY "Allow public insert on contact_messages"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);


-- ============================================================
-- 4. SEED DATA (sample entries for demo)
-- ============================================================

-- Sample Experience
INSERT INTO experience (title, company, start_date, end_date, description, tags, sort_order) VALUES
(
  'Machine Learning Engineer Intern',
  'Google DeepMind',
  '2025-05-01',
  '2025-08-31',
  'Developed novel transformer architectures for multi-modal learning. Built scalable training pipelines using JAX/Flax on TPU pods. Published internal research paper on attention mechanism improvements.',
  ARRAY['Python', 'JAX', 'Flax', 'TPU', 'Transformers', 'ML Research'],
  1
),
(
  'Software Development Engineer Intern',
  'Amazon Web Services',
  '2024-05-01',
  '2024-08-31',
  'Built microservices for real-time data processing pipelines handling 1M+ events/sec. Designed and implemented RESTful APIs with comprehensive test coverage. Reduced latency by 40% through caching optimizations.',
  ARRAY['Java', 'AWS Lambda', 'DynamoDB', 'API Gateway', 'Microservices'],
  2
),
(
  'Research Assistant — NLP Lab',
  'Stanford University',
  '2024-01-01',
  '2024-12-31',
  'Conducted research on large language model alignment and safety. Fine-tuned LLMs using RLHF techniques. Co-authored paper accepted at ACL 2025.',
  ARRAY['Python', 'PyTorch', 'HuggingFace', 'NLP', 'RLHF', 'Research'],
  3
),
(
  'Full-Stack Developer Intern',
  'Stripe',
  '2023-06-01',
  '2023-08-31',
  'Developed React-based dashboard components for merchant analytics. Implemented server-side rendering optimizations reducing page load time by 60%. Contributed to the design system component library.',
  ARRAY['React', 'TypeScript', 'Ruby', 'PostgreSQL', 'GraphQL'],
  4
);

-- Sample Projects
INSERT INTO projects (title, description, tech_stack, github_url, demo_url, image_url, featured, sort_order) VALUES
(
  'NeuralSearch — Semantic Search Engine',
  'A full-stack semantic search engine powered by sentence transformers and FAISS. Supports multi-language queries, real-time indexing, and a beautiful React UI with instant results. Handles 10K+ documents with sub-100ms query latency.',
  ARRAY['Python', 'FastAPI', 'React', 'FAISS', 'Sentence Transformers', 'Docker'],
  'https://github.com/shaurav/neuralsearch',
  'https://neuralsearch-demo.vercel.app',
  NULL,
  true,
  1
),
(
  'DeepVision — Real-Time Object Detection',
  'End-to-end object detection system using YOLOv8 with a custom-trained model on domain-specific data. Features a Streamlit dashboard for real-time webcam inference and batch processing of video files.',
  ARRAY['Python', 'PyTorch', 'YOLOv8', 'Streamlit', 'OpenCV', 'ONNX'],
  'https://github.com/shaurav/deepvision',
  NULL,
  NULL,
  true,
  2
),
(
  'CloudScale — Distributed Task Queue',
  'A distributed task queue system inspired by Celery, built from scratch. Features automatic retries, dead letter queues, priority scheduling, and a web-based monitoring dashboard.',
  ARRAY['Go', 'Redis', 'gRPC', 'React', 'Docker', 'Kubernetes'],
  'https://github.com/shaurav/cloudscale',
  NULL,
  NULL,
  false,
  3
),
(
  'LLM-Playground — Chat with Multiple LLMs',
  'A unified interface to chat with GPT-4, Claude, Gemini, and open-source models side by side. Compare responses, adjust parameters, and export conversations. Built with Next.js and streaming APIs.',
  ARRAY['Next.js', 'TypeScript', 'OpenAI API', 'Anthropic API', 'Tailwind CSS'],
  'https://github.com/shaurav/llm-playground',
  'https://llm-playground.vercel.app',
  NULL,
  true,
  4
),
(
  'FinTrack — Personal Finance Dashboard',
  'A sleek personal finance tracker with Plaid integration for bank account syncing. Features spending analytics, budget forecasting using linear regression, and automated categorization.',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Plaid API', 'Chart.js', 'Tailwind CSS'],
  'https://github.com/shaurav/fintrack',
  NULL,
  NULL,
  false,
  5
),
(
  'PaperDigest — Research Paper Summarizer',
  'An AI-powered tool that summarizes arXiv papers using fine-tuned BART models. Extracts key findings, methodologies, and generates structured summaries with citation graphs.',
  ARRAY['Python', 'HuggingFace', 'BART', 'FastAPI', 'React', 'Neo4j'],
  'https://github.com/shaurav/paperdigest',
  'https://paperdigest.vercel.app',
  NULL,
  false,
  6
);

-- Sample Achievements
INSERT INTO achievements (title, description, date, category, link, sort_order) VALUES
(
  'ACL 2025 — Paper Accepted',
  'Co-authored "Efficient Alignment of Large Language Models via Contrastive Preference Optimization" — accepted at the main conference.',
  '2025-07-01',
  'Publications',
  'https://arxiv.org/abs/example',
  1
),
(
  'Kaggle Competition — Gold Medal',
  'Achieved Gold Medal (Top 1%) in the Google AI4Code competition. Developed an ensemble approach combining code embeddings with graph neural networks.',
  '2024-11-15',
  'Competitions',
  'https://kaggle.com/shaurav',
  2
),
(
  'ICPC Regional Finalist',
  'Advanced to ICPC North America Regional Finals. Solved 8/12 problems in the qualifying round.',
  '2024-03-10',
  'Competitions',
  NULL,
  3
),
(
  'AWS Solutions Architect — Associate',
  'Earned AWS Solutions Architect Associate certification, demonstrating proficiency in designing distributed systems on AWS.',
  '2024-06-20',
  'Certifications',
  'https://aws.amazon.com/certification/',
  4
),
(
  'Google Summer of Code',
  'Selected as a GSoC contributor for TensorFlow. Implemented custom gradient checkpointing for memory-efficient training of large models.',
  '2023-09-01',
  'Open Source',
  'https://summerofcode.withgoogle.com/',
  5
),
(
  'Kaggle — Competitions Expert',
  'Achieved Competitions Expert rank on Kaggle with 2 Gold and 5 Silver medals across NLP and Computer Vision competitions.',
  '2024-08-01',
  'Competitions',
  'https://kaggle.com/shaurav',
  6
),
(
  'Deep Learning Specialization — Coursera',
  'Completed the 5-course Deep Learning Specialization by Andrew Ng with distinction.',
  '2023-05-15',
  'Certifications',
  'https://coursera.org/verify/specialization/example',
  7
);

-- Sample Hobbies
INSERT INTO hobbies (title, description, icon, sort_order) VALUES
('Chess', 'Rated 1800+ on Chess.com. Love studying openings and endgame theory.', 'FaChess', 1),
('Photography', 'Street and landscape photography enthusiast. Shoot on a Sony A7III.', 'FaCamera', 2),
('Hiking', 'Exploring trails across national parks. Completed 15+ major trails.', 'FaMountain', 3),
('Open Source', 'Active contributor to ML/AI open source projects on GitHub.', 'FaCode', 4),
('Reading', 'Sci-fi and non-fiction. Favorites: Dune, Sapiens, Gödel Escher Bach.', 'FaBook', 5),
('Music', 'Guitar player and lo-fi beats producer in spare time.', 'FaMusic', 6);
