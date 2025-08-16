-- AlterTable
ALTER TABLE "User" ALTER COLUMN "passwordResetExpiry" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_phone_idx" ON "User"("phone");

-- CreateIndex
CREATE INDEX "User_passwordResetToken_idx" ON "User"("passwordResetToken");

-- CreateIndex
CREATE INDEX "User_verificationToken_idx" ON "User"("verificationToken");
