-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "author_id" INTEGER,
    FOREIGN KEY ("author_id") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
