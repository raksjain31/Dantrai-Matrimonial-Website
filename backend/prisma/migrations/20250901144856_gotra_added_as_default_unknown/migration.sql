/*
  Warnings:

  - Made the column `gotra` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "gotra" SET NOT NULL,
ALTER COLUMN "gotra" SET DEFAULT 'Unknown';
