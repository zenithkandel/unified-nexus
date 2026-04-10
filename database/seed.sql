USE unified_nexus;

INSERT INTO clubs (name, description, theme_motive, president_name, hero_image_path, is_active, display_order)
VALUES
('Music Club', 'A platform to learn, create, and excel through music.', 'Explore musical talent through collaborative learning and performance.', 'TBD', NULL, 1, 1),
('Debate Club', 'For aspiring speakers and critical thinkers.', 'Sharpen voice, strengthen ideas, and lead through dialogue.', 'TBD', NULL, 1, 2),
('Charity Club', 'For volunteers with a heart to serve.', 'Committed to service and meaningful social impact.', 'TBD', NULL, 1, 3),
('Art and Culture Club', 'For artists and cultural enthusiasts.', 'Celebrate creativity, heritage, and expression through art and culture.', 'TBD', NULL, 1, 4),
('Drama Club', 'For expressive actors and creative storytellers.', 'Transform imagination into powerful performance.', 'TBD', NULL, 1, 5),
('Research and Presentation Club', 'For curious minds ready to research, present, and inspire.', 'Turn research into insight and presentations into impact.', 'TBD', NULL, 1, 6),
('Student Council', 'Empowering student voices to lead, represent, and create change.', 'Build student leadership and institutional impact.', 'TBD', NULL, 1, 7),
('Environment Club', 'For eco-conscious minds ready to protect and preserve our planet.', 'Work together for a greener, sustainable tomorrow.', 'TBD', NULL, 1, 8),
('Literature Club', 'For wordsmiths, storytellers, and thoughtful minds.', 'Where words weave worlds and ideas leave lasting echo.', 'TBD', NULL, 1, 9),
('Dance Club', 'For passionate dancers ready to move, express, and inspire.', 'Where elegance meets energy and movement becomes poetry.', 'TBD', NULL, 1, 10)
ON DUPLICATE KEY UPDATE
description = VALUES(description),
theme_motive = VALUES(theme_motive),
display_order = VALUES(display_order);

INSERT INTO executive_members (full_name, role_title, photo_path, display_order, is_active)
VALUES
('Shreyas Poudel', 'President', '', 1, 1),
('Tilashma Neupane', 'Director', '', 2, 1),
('Aakirti Luitel', 'Manager in General', '', 3, 1),
('Bijal Sakhya', 'Secretary', '', 4, 1),
('Soham Gautam', 'Treasurer', '', 5, 1),
('Allan Khanal', 'IT Head', '', 6, 1),
('Arunex Shrestha', 'Head of Operation', '', 7, 1),
('Arushi Shah', 'Head of Discipline and Ethics', '', 8, 1),
('Vaibauh Dahal', 'Club Ambassador', '', 9, 1)
ON DUPLICATE KEY UPDATE
full_name = VALUES(full_name),
role_title = VALUES(role_title),
is_active = VALUES(is_active);

