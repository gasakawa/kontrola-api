-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "es" VARCHAR(75) NOT NULL,
    "pt" VARCHAR(75) NOT NULL,
    "en" VARCHAR(75) NOT NULL,
    "alpha_two" VARCHAR(2) NOT NULL,
    "alpha_three" VARCHAR(3) NOT NULL,
    "dial_code" VARCHAR(10) NOT NULL,
    "flag" VARCHAR(100) NOT NULL,

    CONSTRAINT "countries_pk" PRIMARY KEY ("id")
);
