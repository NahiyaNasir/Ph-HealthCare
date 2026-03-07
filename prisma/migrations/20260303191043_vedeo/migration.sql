/*
  Warnings:

  - A unique constraint covering the columns `[videoCallingId]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `videoCallingId` on the `appointments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "videoCallingId",
ADD COLUMN     "videoCallingId" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "appointments_videoCallingId_key" ON "appointments"("videoCallingId");
