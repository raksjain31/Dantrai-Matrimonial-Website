/*
  Warnings:

  - You are about to drop the column `Approved` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Approved",
ADD COLUMN     "IsApproved" BOOLEAN NOT NULL DEFAULT false;
