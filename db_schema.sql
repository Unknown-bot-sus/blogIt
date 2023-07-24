
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS testUsers (
    test_user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS testUserRecords (
    test_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_record_value TEXT NOT NULL,
    test_user_id  INT, --the user that the record belongs to
    FOREIGN KEY (test_user_id) REFERENCES testUsers(test_user_id)
);

CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title  TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    publication_date DATETIME DEFAULT NULL,
    authorId INT NOT NULL,
    FOREIGN KEY(authorId) REFERENCES Authors(id)
);

CREATE TRIGGER IF NOT EXISTS UpdateedAtArticles
AFTER UPDATE On Articles
BEGIN
   UPDATE Articles SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TABLE IF NOT EXISTS Likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INT NOT NULL,
    articleId INT NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(articleId) REFERENCES Articles(id)
);

CREATE TABLE IF NOT EXISTS Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INT,
    articleId INT,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(articleId) REFERENCES Articles(id)
);




--insert default data (if necessary here)

INSERT INTO Users ("name", "password") VALUES ("Thar Lin", "password123"),("Bacus", "password123");

INSERT INTO Authors ("title", "subtitle", "userId") VALUES ("Lorem ipsum", "subtitle", 1);

INSERT INTO Articles (
    "title",
    "subtitle",
    "content",
    "authorId"
) VALUES (
    "Hello world",
    "Sub  title",
    "Content",
    1
);

INSERT INTO Articles (
    "title",
    "subtitle",
    "content",
    "publication_date",
    "authorId"
) VALUES (
    "Hello world 2",
    "Sub  title",
    "Content",
    CURRENT_TIMESTAMP,
    1
);

INSERT INTO Comments (
    "userId",
    "articleId",
    "comment"
) VALUES (
    2,
    1,
    "Text Comment"
), (1, 2, "Text Comment");

INSERT INTO Likes ("articleId", "userId") VALUES (1, 1), (1, 2), (2, 1), (2, 2);

COMMIT;

