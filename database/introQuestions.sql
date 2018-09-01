CREATE TABLE intro_questions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) UNIQUE,
    answer TEXT,
    search_terms VARCHAR(255)
);