-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "planId" TEXT;

-- AlterTable
ALTER TABLE "RiskReport" ADD COLUMN     "summary" TEXT;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
