-- AlterTable
ALTER TABLE "company_plan_payments_control" ADD COLUMN     "company_plan_id" INTEGER;

-- AddForeignKey
ALTER TABLE "company_plan_payments_control" ADD CONSTRAINT "plan_payments_plan_fk" FOREIGN KEY ("company_plan_id") REFERENCES "company_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;
