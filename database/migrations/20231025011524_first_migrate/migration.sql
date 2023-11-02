-- CreateTable
CREATE TABLE "tb_contact_user" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(15) NOT NULL,

    CONSTRAINT "tb_contact_user_pkey" PRIMARY KEY ("id")
);
