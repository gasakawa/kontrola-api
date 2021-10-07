-- CreateTable
CREATE TABLE "user_measures_observations" (
    "id" SERIAL NOT NULL,
    "observation" TEXT,
    "user_meassure_id" INTEGER,

    CONSTRAINT "user_measures_observations_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_measures_observations" ADD CONSTRAINT "user_meassures_observations_um_fk" FOREIGN KEY ("user_meassure_id") REFERENCES "user_measures"("id") ON DELETE SET NULL ON UPDATE CASCADE;
