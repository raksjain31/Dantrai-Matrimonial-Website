/*
  Warnings:

  - You are about to drop the column `fatheroccupation` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `motheroccupation` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "fatheroccupation",
DROP COLUMN "motheroccupation";
