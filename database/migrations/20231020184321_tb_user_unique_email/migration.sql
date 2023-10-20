/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `tb_user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");
