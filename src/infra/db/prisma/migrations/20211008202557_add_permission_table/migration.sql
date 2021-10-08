-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER,
    "routine_id" INTEGER,
    "flg_read" BOOLEAN NOT NULL DEFAULT false,
    "flg_edit" BOOLEAN NOT NULL DEFAULT false,
    "flg_insert" BOOLEAN NOT NULL DEFAULT false,
    "flg_delete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "premissions_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_role_fk" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_routine_fk" FOREIGN KEY ("routine_id") REFERENCES "routine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
