/*
  Warnings:

  - Added the required column `projectId` to the `Tasklist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasklist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Tasklist_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tasklist" ("createdAt", "deleted", "id", "title", "updatedAt") SELECT "createdAt", "deleted", "id", "title", "updatedAt" FROM "Tasklist";
DROP TABLE "Tasklist";
ALTER TABLE "new_Tasklist" RENAME TO "Tasklist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
