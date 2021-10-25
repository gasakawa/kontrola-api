/*
  Warnings:

  - A unique constraint covering the columns `[document_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `flg_overdue` to the `access_control` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "access_control" ADD COLUMN     "flg_overdue" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_document_id_uindex" ON "users"("document_id");
