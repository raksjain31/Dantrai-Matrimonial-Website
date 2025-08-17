-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "ApprovedProfilebyUserId" TEXT,
ADD COLUMN     "IsApprovedProfile" BOOLEAN NOT NULL DEFAULT false;
