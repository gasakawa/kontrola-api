/*
  Warnings:

  - You are about to drop the column `heaquarter_id` on the `headquarter_users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "headquarter_users" DROP CONSTRAINT "headquarter_user_hq_fk";

-- AlterTable
ALTER TABLE "headquarter_users" DROP COLUMN "heaquarter_id",
ADD COLUMN     "headquarter_id" INTEGER;

-- AddForeignKey
ALTER TABLE "headquarter_users" ADD CONSTRAINT "headquarter_user_hq_fk" FOREIGN KEY ("headquarter_id") REFERENCES "headquarters"("id") ON DELETE SET NULL ON UPDATE CASCADE;
