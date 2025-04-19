/*
  Warnings:

  - Made the column `openFrom` on table `Room` required. This step will fail if there are existing NULL values in that column.
  - Made the column `openTo` on table `Room` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "openFrom" SET NOT NULL,
ALTER COLUMN "openTo" SET NOT NULL,
ALTER COLUMN "openTo" SET DEFAULT 23;
