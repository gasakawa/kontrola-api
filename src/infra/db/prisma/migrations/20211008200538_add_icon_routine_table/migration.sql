/*
  Warnings:

  - Added the required column `icon` to the `routine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "routine" ADD COLUMN     "icon" VARCHAR(30) NOT NULL;
