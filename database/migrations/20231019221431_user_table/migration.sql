-- CreateTable
CREATE TABLE "tb_user" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "birthage" DATE NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);
