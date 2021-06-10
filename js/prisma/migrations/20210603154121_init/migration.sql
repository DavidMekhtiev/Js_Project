-- CreateTable
CREATE TABLE "Companies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "company_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "salary" DECIMAL,
    "image_url" TEXT,
    "companies_id" INTEGER NOT NULL,
    FOREIGN KEY ("companies_id") REFERENCES "Companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
