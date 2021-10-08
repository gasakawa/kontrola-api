/*
  Warnings:

  - You are about to drop the column `flg_publico` on the `routine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "routine" DROP COLUMN "flg_publico",
ADD COLUMN     "flg_public" BOOLEAN NOT NULL DEFAULT false;
