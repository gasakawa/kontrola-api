-- CreateTable
CREATE TABLE "company_plan_users" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "company_plan_id" INTEGER NOT NULL,
    "flg_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_user_plan_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_plan_users" ADD CONSTRAINT "company_user_plan_usr_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_plan_users" ADD CONSTRAINT "company_user_plan_cp_fk" FOREIGN KEY ("company_plan_id") REFERENCES "company_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
