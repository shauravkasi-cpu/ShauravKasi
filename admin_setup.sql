-- ============================================================
-- Shaurav's Portfolio — Admin Setup Script
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ============================================================

-- 1. CREATE EDUCATION TABLE
CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL means "Present"
  grade TEXT,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- ALLOW PUBLIC READ ACCESS
CREATE POLICY "Allow public read access on education"
  ON education FOR SELECT
  TO anon
  USING (true);

-- 2. CREATE ADMIN POLICIES (AUTHENTICATED USERS)
-- Allows any logged-in user to perform INSERT, UPDATE, DELETE on the tables

-- Experience
CREATE POLICY "Allow all actions for authenticated users on experience"
  ON experience FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Projects
CREATE POLICY "Allow all actions for authenticated users on projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Achievements
CREATE POLICY "Allow all actions for authenticated users on achievements"
  ON achievements FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Hobbies
CREATE POLICY "Allow all actions for authenticated users on hobbies"
  ON hobbies FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Education
CREATE POLICY "Allow all actions for authenticated users on education"
  ON education FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contact Messages (If admins want to read/delete them)
CREATE POLICY "Allow all actions for authenticated users on contact_messages"
  ON contact_messages FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
