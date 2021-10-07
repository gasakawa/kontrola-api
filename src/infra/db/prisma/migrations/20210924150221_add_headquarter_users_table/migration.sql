-- CreateTable
CREATE TABLE "headquarter_users" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "heaquarter_id" INTEGER,

    CONSTRAINT "headquarter_users_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "headquarter_users" ADD CONSTRAINT "headquarter_user_usr_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "headquarter_users" ADD CONSTRAINT "headquarter_user_hq_fk" FOREIGN KEY ("heaquarter_id") REFERENCES "headquarters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
