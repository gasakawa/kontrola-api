/*
  Warnings:

  - You are about to drop the column `ip_address` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "ip_address",
ADD COLUMN     "session_info" JSONB;
