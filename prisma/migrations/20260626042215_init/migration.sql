/*
  Warnings:

  - You are about to drop the column `createdBy` on the `DocumentVersion` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `DocumentVersion` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `operationType` on the `SyncOperation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'DELETED');

-- CreateEnum
CREATE TYPE "SyncOperationType" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'RESTORE');

-- DropForeignKey
ALTER TABLE "DocumentMember" DROP CONSTRAINT "DocumentMember_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentMember" DROP CONSTRAINT "DocumentMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentVersion" DROP CONSTRAINT "DocumentVersion_documentId_fkey";

-- DropForeignKey
ALTER TABLE "SyncOperation" DROP CONSTRAINT "SyncOperation_documentId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "lastEditedBy" TEXT,
ADD COLUMN     "status" "DocumentStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "DocumentVersion" DROP COLUMN "createdBy",
ADD COLUMN     "createdById" TEXT NOT NULL,
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "SyncOperation" ADD COLUMN     "error" TEXT,
ADD COLUMN     "processed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "retryCount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "operationType",
ADD COLUMN     "operationType" "SyncOperationType" NOT NULL;

-- CreateTable
CREATE TABLE "Conflict" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "localContent" JSONB NOT NULL,
    "remoteContent" JSONB NOT NULL,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conflict_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Conflict_documentId_idx" ON "Conflict"("documentId");

-- CreateIndex
CREATE INDEX "Document_ownerId_idx" ON "Document"("ownerId");

-- CreateIndex
CREATE INDEX "DocumentMember_documentId_idx" ON "DocumentMember"("documentId");

-- CreateIndex
CREATE INDEX "DocumentMember_userId_idx" ON "DocumentMember"("userId");

-- CreateIndex
CREATE INDEX "DocumentVersion_documentId_idx" ON "DocumentVersion"("documentId");

-- CreateIndex
CREATE INDEX "SyncOperation_documentId_idx" ON "SyncOperation"("documentId");

-- AddForeignKey
ALTER TABLE "DocumentMember" ADD CONSTRAINT "DocumentMember_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentMember" ADD CONSTRAINT "DocumentMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentVersion" ADD CONSTRAINT "DocumentVersion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentVersion" ADD CONSTRAINT "DocumentVersion_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncOperation" ADD CONSTRAINT "SyncOperation_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conflict" ADD CONSTRAINT "Conflict_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;
