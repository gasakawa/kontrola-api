-- CreateTable
CREATE TABLE "routine_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "position" INTEGER NOT NULL,
    "icon" VARCHAR(30) NOT NULL,

    CONSTRAINT "routine_type_pk" PRIMARY KEY ("id")
);
