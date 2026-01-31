-- ============================================
-- ServiceNest MVP — Database Create + Test Script
-- Purpose: Create database and verify it works
-- Run this entire script in MySQL Workbench
-- ============================================

-- 1) CREATE DATABASE
CREATE DATABASE IF NOT EXISTS servicenest_mvp
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- 2) USE DATABASE
USE servicenest_mvp;

-- 3) VERIFY CURRENT DATABASE
SELECT DATABASE() AS current_database;

-- ============================================
-- 4) CONNECTION TEST TABLE
-- This confirms read/write access is working
-- ============================================

DROP TABLE IF EXISTS connection_test;

CREATE TABLE connection_test (
  id INT AUTO_INCREMENT PRIMARY KEY,
  note VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5) INSERT TEST DATA
INSERT INTO connection_test (note)
VALUES
('Database connected successfully'),
('Write operation working'),
('ServiceNest MVP DB ready');

-- 6) READ TEST DATA
SELECT * FROM connection_test;

-- ============================================
-- 7) OPTIONAL CLEANUP
-- Uncomment if you want to remove test table
-- ============================================

-- DROP TABLE connection_test;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT 'ServiceNest database setup completed successfully!' AS status;
