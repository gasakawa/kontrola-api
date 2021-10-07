/*
  Warnings:

  - You are about to drop the `user_measures` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_measures_observations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_measures" DROP CONSTRAINT "user_measures_measure_fk";

-- DropForeignKey
ALTER TABLE "user_measures" DROP CONSTRAINT "user_measures_user_fk";

-- DropForeignKey
ALTER TABLE "user_measures_observations" DROP CONSTRAINT "user_meassures_observations_um_fk";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "code" DROP NOT NULL;

-- DropTable
DROP TABLE "user_measures";

-- DropTable
DROP TABLE "user_measures_observations";

-- CreateTable
CREATE TABLE "user_measure" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "measure_id" INTEGER,
    "value" DECIMAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_measure_control_id" INTEGER,

    CONSTRAINT "user_measures_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_measure_control" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "observation" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_measures_control_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_measure" ADD CONSTRAINT "user_measure_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_measure" ADD CONSTRAINT "user_measure_measure_fk" FOREIGN KEY ("measure_id") REFERENCES "measures_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_measure" ADD CONSTRAINT "user_measure_control_fk" FOREIGN KEY ("user_measure_control_id") REFERENCES "user_measure_control"("id") ON DELETE SET NULL ON UPDATE CASCADE;
