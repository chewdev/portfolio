CREATE TABLE submitted_emails (
ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(255),
email VARCHAR(255),
comments VARCHAR(255),
reason VARCHAR(255),
submitted_at TIMESTAMP DEFAULT NOW()
);