/*
  Warnings:

  - Added the required column `devices_limit` to the `business_plan_settings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "business_plan_settings" ADD COLUMN     "devices_limit" INTEGER NOT NULL;
