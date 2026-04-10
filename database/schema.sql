CREATE DATABASE IF NOT EXISTS unified_nexus CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE unified_nexus;

CREATE TABLE IF NOT EXISTS clubs (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(120) NOT NULL UNIQUE,
	description TEXT NOT NULL,
	theme_motive TEXT NOT NULL,
	president_name VARCHAR(120) NOT NULL,
	hero_image_path VARCHAR(255) NULL,
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	display_order INT NOT NULL DEFAULT 0,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	INDEX idx_clubs_display_order (display_order)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS executive_members (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(120) NOT NULL,
	role_title VARCHAR(150) NOT NULL,
	photo_path VARCHAR(255) NOT NULL,
	display_order INT NOT NULL,
	is_active TINYINT(1) NOT NULL DEFAULT 1,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	UNIQUE KEY uniq_executive_display_order (display_order),
	INDEX idx_executive_display_order (display_order)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS applications (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	applicant_name VARCHAR(120) NOT NULL,
	contact_email VARCHAR(150) NOT NULL,
	contact_phone VARCHAR(30) NULL,
	selected_club_id INT UNSIGNED NOT NULL,
	message TEXT NOT NULL,
	status ENUM('new', 'reviewed', 'archived') NOT NULL DEFAULT 'new',
	submitted_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	ip_hash CHAR(64) NULL,
	INDEX idx_applications_submitted_at (submitted_at),
	CONSTRAINT fk_applications_club
		FOREIGN KEY (selected_club_id)
		REFERENCES clubs(id)
		ON UPDATE CASCADE
		ON DELETE RESTRICT
) ENGINE=InnoDB;

