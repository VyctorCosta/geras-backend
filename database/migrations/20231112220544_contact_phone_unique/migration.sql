/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `tb_contact_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_contact_user_phone_key" ON "tb_contact_user"("phone");
