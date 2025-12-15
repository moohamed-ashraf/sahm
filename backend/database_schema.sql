-- ZFunds Database Schema
-- Database: Sahm (sahm_platform)

-- Drop existing tables if they exist (in correct order to respect foreign keys)
DROP TABLE IF EXISTS Investment;
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Project;
DROP TABLE IF EXISTS Plans;
DROP TABLE IF EXISTS Company;
DROP TABLE IF EXISTS User;

-- ============================================
-- User Table
-- ============================================
CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(255),
  user_email VARCHAR(255) UNIQUE,
  user_role VARCHAR(100) COMMENT 'investor, entrepreneur, admin',
  is_admin ENUM('yes', 'no') DEFAULT 'no',
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Company Table
-- ============================================
CREATE TABLE Company (
  company_id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  company_description TEXT,
  company_location VARCHAR(255),
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE
);

-- ============================================
-- Project Table
-- ============================================
CREATE TABLE Project (
  project_id INT AUTO_INCREMENT PRIMARY KEY,
  project_title VARCHAR(255) NOT NULL,
  project_category VARCHAR(255),
  project_description TEXT,
  goal_amount DECIMAL(15, 2) NOT NULL,
  raised_amount DECIMAL(15, 2) DEFAULT 0.00,
  start_date DATE,
  end_date DATE,
  project_status ENUM('pending', 'active', 'completed', 'cancelled') DEFAULT 'pending',
  company_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE
);

-- ============================================
-- Investment Table
-- ============================================
CREATE TABLE Investment (
  investment_id INT AUTO_INCREMENT PRIMARY KEY,
  investment_amount DECIMAL(15, 2) NOT NULL,
  investment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  company_id INT NOT NULL,
  user_id INT NOT NULL,
  project_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES Company(company_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES Project(project_id) ON DELETE SET NULL
);

-- ============================================
-- Payment Table
-- ============================================
CREATE TABLE Payment (
  payment_id INT AUTO_INCREMENT PRIMARY KEY,
  payment_amount DECIMAL(15, 2) NOT NULL,
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  payment_method VARCHAR(100) COMMENT 'credit_card, bank_transfer, paypal, etc.',
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  user_id INT NOT NULL,
  investment_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
  FOREIGN KEY (investment_id) REFERENCES Investment(investment_id) ON DELETE SET NULL
);

-- ============================================
-- Plans Table (Subscription/Membership Plans)
-- ============================================
CREATE TABLE Plans (
  plan_id INT AUTO_INCREMENT PRIMARY KEY,
  plan_name VARCHAR(255) NOT NULL,
  plan_description TEXT,
  plan_price DECIMAL(10, 2) NOT NULL,
  plan_duration INT COMMENT 'Duration in days',
  plan_features TEXT COMMENT 'JSON or comma-separated features',
  is_active ENUM('yes', 'no') DEFAULT 'yes',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Indexes for Performance
-- ============================================

-- User indexes
CREATE INDEX idx_user_email ON User(user_email);
CREATE INDEX idx_user_role ON User(user_role);

-- Company indexes
CREATE INDEX idx_company_user ON Company(user_id);
CREATE INDEX idx_company_industry ON Company(industry);

-- Project indexes
CREATE INDEX idx_project_company ON Project(company_id);
CREATE INDEX idx_project_status ON Project(project_status);
CREATE INDEX idx_project_dates ON Project(start_date, end_date);

-- Investment indexes
CREATE INDEX idx_investment_user ON Investment(user_id);
CREATE INDEX idx_investment_company ON Investment(company_id);
CREATE INDEX idx_investment_project ON Investment(project_id);
CREATE INDEX idx_investment_date ON Investment(investment_date);

-- Payment indexes
CREATE INDEX idx_payment_user ON Payment(user_id);
CREATE INDEX idx_payment_investment ON Payment(investment_id);
CREATE INDEX idx_payment_status ON Payment(payment_status);

-- ============================================
-- Sample Data (Optional - Uncomment to use)
-- ============================================

-- Sample Admin User
-- INSERT INTO User (user_name, user_email, user_role, is_admin, password)
-- VALUES ('Admin User', 'admin@zfunds.com', 'admin', 'yes', '$2a$10$hashedpasswordhere');

-- Sample Investor
-- INSERT INTO User (user_name, user_email, user_role, password)
-- VALUES ('John Investor', 'john@example.com', 'investor', '$2a$10$hashedpasswordhere');

-- Sample Company Owner
-- INSERT INTO User (user_name, user_email, user_role, password)
-- VALUES ('Jane Company', 'jane@example.com', 'company', '$2a$10$hashedpasswordhere');

-- Sample Company
-- INSERT INTO Company (company_name, industry, company_description, company_location, user_id)
-- VALUES ('Tech Startup Inc', 'Technology', 'An innovative tech company', 'New York, USA', 3);

-- Sample Project
-- INSERT INTO Project (project_title, project_category, project_description, goal_amount, start_date, end_date, project_status, company_id)
-- VALUES ('AI-Powered App', 'Software Development', 'Building an AI-powered mobile application', 50000.00, '2025-12-01', '2026-06-01', 'active', 1);

-- ============================================
-- Useful Queries
-- ============================================

-- Get all active projects with company info
-- SELECT p.*, c.company_name, c.industry 
-- FROM Project p 
-- JOIN Company c ON p.company_id = c.company_id 
-- WHERE p.project_status = 'active';

-- Get user's total investments
-- SELECT u.user_name, SUM(i.investment_amount) as total_invested
-- FROM User u
-- LEFT JOIN Investment i ON u.user_id = i.user_id
-- GROUP BY u.user_id, u.user_name;

-- Get project funding progress
-- SELECT 
--   p.project_title,
--   p.goal_amount,
--   p.raised_amount,
--   ROUND((p.raised_amount / p.goal_amount) * 100, 2) as funding_percentage
-- FROM Project p
-- WHERE p.project_status = 'active';

-- Get company's total funding received
-- SELECT 
--   c.company_name,
--   COUNT(DISTINCT p.project_id) as total_projects,
--   SUM(p.raised_amount) as total_funding
-- FROM Company c
-- LEFT JOIN Project p ON c.company_id = p.company_id
-- GROUP BY c.company_id, c.company_name;

