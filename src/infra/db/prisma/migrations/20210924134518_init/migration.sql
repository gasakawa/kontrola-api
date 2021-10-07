CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "access_control" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "headquarter_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" UUID,

    CONSTRAINT "access_control_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20),

    CONSTRAINT "alerts_type_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_plan" (
    "bp_id" SERIAL NOT NULL,
    "bp_description" VARCHAR(100) NOT NULL,

    CONSTRAINT "business_plan_pk" PRIMARY KEY ("bp_id")
);

-- CreateTable
CREATE TABLE "business_plan_settings" (
    "bp_limits_id" SERIAL NOT NULL,
    "admin_limit" INTEGER NOT NULL,
    "users_limit" INTEGER NOT NULL,
    "headquarters_limit" INTEGER NOT NULL,
    "user_progress_track" BOOLEAN NOT NULL DEFAULT false,
    "schedule" BOOLEAN,
    "access_control" BOOLEAN,
    "send_notifications" BOOLEAN,
    "send_alerts" BOOLEAN,
    "sms_plan" BOOLEAN DEFAULT false,
    "tech_support" BOOLEAN DEFAULT true,
    "updates" BOOLEAN,
    "permanence_clause" INTEGER NOT NULL,
    "business_plan_type_id" INTEGER,

    CONSTRAINT "business_plan_limits_pk" PRIMARY KEY ("bp_limits_id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(150) NOT NULL,
    "address" VARCHAR(150) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,

    CONSTRAINT "companies_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_plan_control" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "company_id" UUID,
    "business_plan_type_id" INTEGER,

    CONSTRAINT "business_plan_control_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_plan_payments_control" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "company_id" UUID,
    "payment_value" MONEY NOT NULL,
    "payment_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "way_to_pay_id" INTEGER,

    CONSTRAINT "plan_payments_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_plans" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" MONEY NOT NULL,
    "company_id" UUID,
    "way_to_pay_id" INTEGER,
    "charge_period" INTEGER,

    CONSTRAINT "company_plans_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "document_types_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "headquarters" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "company_id" UUID,
    "address" VARCHAR(150) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,

    CONSTRAINT "headquarters_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measures_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "measures_type_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migrations" (
    "id" SERIAL NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "flg_active" BOOLEAN NOT NULL DEFAULT true,
    "ip_address" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT,

    CONSTRAINT "sessions_session_idx" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_measures" (
    "id" SERIAL NOT NULL,
    "user_id" UUID,
    "measure_id" INTEGER,
    "value" DECIMAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_measures_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "given_name" VARCHAR(100) NOT NULL,
    "family_name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "document_id" VARCHAR(30) NOT NULL,
    "document_type" INTEGER,
    "sub" UUID,
    "flg_active" BOOLEAN NOT NULL DEFAULT false,
    "flg_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "birthdate" DATE NOT NULL,
    "gender" CHAR(1) NOT NULL,
    "role_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company_id" UUID,

    CONSTRAINT "users_id_uindex" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ways_to_pay" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "ways_to_pay_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_uindex" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_sub_uindex" ON "users"("sub");

-- AddForeignKey
ALTER TABLE "access_control" ADD CONSTRAINT "access_control_company_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_control" ADD CONSTRAINT "access_control_heaquarter_fk" FOREIGN KEY ("headquarter_id") REFERENCES "headquarters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "access_control" ADD CONSTRAINT "access_control_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_plan_settings" ADD CONSTRAINT "business_plan_settings_bp_fk" FOREIGN KEY ("business_plan_type_id") REFERENCES "business_plan"("bp_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_plan_control" ADD CONSTRAINT "business_plan_control_bp_fk" FOREIGN KEY ("business_plan_type_id") REFERENCES "business_plan"("bp_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_plan_control" ADD CONSTRAINT "business_plan_control_company_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_plan_control" ADD CONSTRAINT "business_plan_control_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE SET DEFAULT;

-- AddForeignKey
ALTER TABLE "company_plan_payments_control" ADD CONSTRAINT "plan_payments_company_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_plan_payments_control" ADD CONSTRAINT "plan_payments_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_plan_payments_control" ADD CONSTRAINT "plan_payments_way_fk" FOREIGN KEY ("way_to_pay_id") REFERENCES "ways_to_pay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_plans" ADD CONSTRAINT "company_plans_company_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_plans" ADD CONSTRAINT "company_plans_pay__fk" FOREIGN KEY ("way_to_pay_id") REFERENCES "ways_to_pay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "headquarters" ADD CONSTRAINT "headquarters_company_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_measures" ADD CONSTRAINT "user_measures_measure_fk" FOREIGN KEY ("measure_id") REFERENCES "measures_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_measures" ADD CONSTRAINT "user_measures_user_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_document_type_fk" FOREIGN KEY ("document_type") REFERENCES "document_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "user_role_fk" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
