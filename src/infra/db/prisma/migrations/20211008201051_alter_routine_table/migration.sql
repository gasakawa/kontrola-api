/*
  Warnings:

  - You are about to alter the column `name` on the `routine` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `link` on the `routine` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "routine" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "link" SET DATA TYPE VARCHAR(100);
