-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "IsRejectedProfile" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "RejectedProfilebyUserId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "IsRejected" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "RejectedbyUserId" TEXT;
