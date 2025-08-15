/*
  Warnings:

  - You are about to drop the column `verificationtoken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verificationtoken",
ADD COLUMN     "verificationToken" TEXT;
