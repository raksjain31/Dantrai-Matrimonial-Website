/*
  Warnings:

  - You are about to drop the column `annualIncome` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `fatherincome` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "annualIncome",
DROP COLUMN "fatherincome",
ADD COLUMN     "phone" TEXT;
