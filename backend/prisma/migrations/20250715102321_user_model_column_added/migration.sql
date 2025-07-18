/*
  Warnings:

  - Added the required column `ApprovedDate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ApprovedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ApprovedbyUserId" TEXT;
