
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
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title  TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    publication_date DATETIME DEFAULT NULL
);

CREATE TRIGGER UpdateedAtArticles
AFTER UPDATE On Articles
BEGIN
   UPDATE Articles SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;


CREATE TABLE IF NOT EXISTS Contributors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    authorId INT NOT NULL,
    articleId INT NOT NULL,
    FOREIGN KEY(authorId) REFERENCES Users(id),
    FOREIGN KEY(articleId) REFERENCES Articles(id)
);

CREATE TABLE IF NOT EXISTS Likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INT NOT NULL,
    articleId INT NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(articleId) REFERENCES Articles(id)
);

CREATE TABLE IF NOT EXISTS Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INT NOT NULL,
    articleId INT NOT NULL,
    comment TEXT NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(articleId) REFERENCES Articles(id)
);

CREATE TABLE IF NOT EXISTS CommentLikes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INT NOT NULL,
    commentId INT NOT NULL,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(commentId) REFERENCES Comments(id)
);

CREATE TABLE IF NOT EXISTS Replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commentId INT NOT NULL,
    replyId INT NOT NULL,
    FOREIGN KEY(commentId) REFERENCES Comments(id)
    FOREIGN KEY(replyId) REFERENCES Comments(id)
);



--insert default data (if necessary here)

INSERT INTO testUsers ("test_name") VALUES ("Simon Star");
INSERT INTO testUserRecords ("test_record_value", "test_user_id") VALUES( "Lorem ipsum dolor sit amet", 1); --try changing the test_user_id to a different number and you will get an error

INSERT INTO Users ("name", "password", "title", "subtitle") VALUES ("Thar Lin", "password123", "Lorem Ipsum", "subtitle");
INSERT INTO Users ("name", "password", "title", "subtitle") VALUES ("Bacus", "password123", "Lorem Ipsum", "subtitle");

INSERT INTO Articles (
    "title",
    "subtitle",
    "content"
) VALUES (
    "Hello world",
    "Sub  title",
    "Content"
);

INSERT INTO Articles (
    "title",
    "subtitle",
    "content",
    "publication_date"
) VALUES (
    "Hello world 2",
    "Sub  title",
    "Content",
    "2023-07-20 08:50:16"
);

INSERT INTO Contributors(
    "authorId",
    "articleId"
) VALUES (1, 1);

INSERT INTO Contributors(
    "authorId",
    "articleId"
) VALUES (1, 2);
COMMIT;

