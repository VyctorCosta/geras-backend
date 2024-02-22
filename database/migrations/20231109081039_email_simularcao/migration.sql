/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `tb_contact_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `tb_contact_user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `tb_contact_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_contact_user" ADD COLUMN     "email" VARCHAR(50) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tb_contact_user_email_key" ON "tb_contact_user"("email");
