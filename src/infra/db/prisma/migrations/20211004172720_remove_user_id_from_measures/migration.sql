/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_measure` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_measure" DROP CONSTRAINT "user_measure_user_fk";

-- AlterTable
ALTER TABLE "user_measure" DROP COLUMN "user_id";

-- AddForeignKey
ALTER TABLE "user_measure_control" ADD CONSTRAINT "user_measure_control_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
