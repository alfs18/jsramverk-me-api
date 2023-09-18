DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reports;

CREATE TABLE users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(60),
    year INTEGER,
    month INTEGER,
    day INTEGER,
    UNIQUE(email)
);

-- CREATE TABLE reports (
--     id INT AUTO_INCREMENT NOT NULL,
--     report TEXT NOT NULL,
--     PRIMARY KEY(id)
-- );

CREATE TABLE reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	title CHAR(6),
    report TEXT NOT NULL
);
