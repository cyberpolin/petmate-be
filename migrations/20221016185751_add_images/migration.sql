-- CreateTable
CREATE TABLE "PetImage" (
    "id" UUID NOT NULL,
    "image" JSONB,

    CONSTRAINT "PetImage_pkey" PRIMARY KEY ("id")
);
