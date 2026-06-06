-- AlterEnum
ALTER TYPE "ServiceStatus" ADD VALUE 'AWAITING_SETUP';

-- AlterTable
ALTER TABLE "ServiceInstance" ADD COLUMN     "customerInstructions" TEXT,
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "deliveredBy" TEXT,
ADD COLUMN     "externalManagementUrl" TEXT,
ADD COLUMN     "externalProviderName" TEXT,
ADD COLUMN     "externalServiceId" TEXT,
ADD COLUMN     "externalUsername" TEXT,
ADD COLUMN     "internalAdminNotes" TEXT;
