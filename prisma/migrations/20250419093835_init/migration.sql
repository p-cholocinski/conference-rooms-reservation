/*
  Warnings:

  - You are about to drop the `CalendarType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropTable
DROP TABLE "CalendarType";

-- DropTable
DROP TABLE "Session";
