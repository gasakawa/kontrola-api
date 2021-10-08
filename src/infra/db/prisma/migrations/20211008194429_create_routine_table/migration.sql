-- CreateTable
CREATE TABLE "routine" (
    "id" SERIAL NOT NULL,
    "routine_type_id" INTEGER,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "flg_show_menu" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,
    "flg_publico" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "routine_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "routine" ADD CONSTRAINT "routine_type_fk" FOREIGN KEY ("routine_type_id") REFERENCES "routine_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
