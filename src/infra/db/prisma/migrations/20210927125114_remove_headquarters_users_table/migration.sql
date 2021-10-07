/*
  Warnings:

  - You are about to drop the `headquarter_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "headquarter_users" DROP CONSTRAINT "headquarter_user_hq_fk";

-- DropForeignKey
ALTER TABLE "headquarter_users" DROP CONSTRAINT "headquarter_user_usr_fk";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "heaquarter_id" INTEGER;

-- DropTable
DROP TABLE "headquarter_users";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_headquarter_fk" FOREIGN KEY ("heaquarter_id") REFERENCES "headquarters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
