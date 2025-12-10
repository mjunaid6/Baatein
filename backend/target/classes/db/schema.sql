-- schema_mysql.sql
CREATE DATABASE IF NOT EXISTS baatein
  CHARACTER SET = 'utf8mb4'
  COLLATE = 'utf8mb4_unicode_ci';
USE baatein;

-- users table: internal_id must be PRIMARY KEY (AUTO_INCREMENT)
CREATE TABLE IF NOT EXISTS users (
  internal_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_code CHAR(6) NOT NULL,
  username VARCHAR(100) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  role VARCHAR(20),
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen DATETIME,
  PRIMARY KEY (internal_id),
  UNIQUE KEY uk_public_code (public_code),
  UNIQUE KEY uk_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- friend_requests table: requester_id/receiver_id must match type (BIGINT UNSIGNED)
CREATE TABLE IF NOT EXISTS friend_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  requester_id BIGINT UNSIGNED NOT NULL,
  receiver_id BIGINT UNSIGNED NOT NULL,
  status VARCHAR(20) DEFAULT 'PENDING',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  responded_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX idx_receiver (receiver_id),
  INDEX idx_requester (requester_id),
  CONSTRAINT fk_fr_requester FOREIGN KEY (requester_id) REFERENCES users (internal_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_fr_receiver FOREIGN KEY (receiver_id) REFERENCES users (internal_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- friendships table: keep ordering (store smaller id in user1)
CREATE TABLE IF NOT EXISTS friendships (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user1 BIGINT UNSIGNED NOT NULL,
  user2 BIGINT UNSIGNED NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uk_pair (user1, user2),
  CONSTRAINT fk_friend_user1 FOREIGN KEY (user1) REFERENCES users (internal_id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_friend_user2 FOREIGN KEY (user2) REFERENCES users (internal_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- messages table
CREATE TABLE IF NOT EXISTS messages (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  conversation_id BIGINT UNSIGNED NULL,
  sender_id BIGINT UNSIGNED,
  receiver_id BIGINT UNSIGNED,
  content TEXT,
  content_type VARCHAR(20) DEFAULT 'TEXT',
  status VARCHAR(20) DEFAULT 'SENT',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_conv (conversation_id),
  INDEX idx_sender (sender_id),
  INDEX idx_receiver (receiver_id),
  CONSTRAINT fk_msg_sender FOREIGN KEY (sender_id) REFERENCES users (internal_id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_msg_receiver FOREIGN KEY (receiver_id) REFERENCES users (internal_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
