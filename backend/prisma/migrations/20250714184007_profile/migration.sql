-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "height" TEXT NOT NULL,
    "currentLiveCity" TEXT NOT NULL,
    "annualIncome" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "image" TEXT,
    "aboutme" TEXT,
    "education" TEXT,
    "college" TEXT,
    "aboutmyeducation" TEXT,
    "employedIn" TEXT,
    "occupation" TEXT,
    "organisation" TEXT,
    "aboutmycareer" TEXT,
    "father" TEXT,
    "fatheroccupation" TEXT,
    "fatherincome" TEXT,
    "motheroccupation" TEXT,
    "noOfBrothers" INTEGER NOT NULL,
    "noOfMarriedBrothers" INTEGER NOT NULL,
    "noOfsisters" INTEGER NOT NULL,
    "noOfMarriedSisters" INTEGER NOT NULL,
    "aboutmyfamily" TEXT,
    "hobbies" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
