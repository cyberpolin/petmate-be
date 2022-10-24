-- CreateTable
CREATE TABLE "_Pet_images" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Pet_images_AB_unique" ON "_Pet_images"("A", "B");

-- CreateIndex
CREATE INDEX "_Pet_images_B_index" ON "_Pet_images"("B");

-- AddForeignKey
ALTER TABLE "_Pet_images" ADD CONSTRAINT "_Pet_images_A_fkey" FOREIGN KEY ("A") REFERENCES "Pet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Pet_images" ADD CONSTRAINT "_Pet_images_B_fkey" FOREIGN KEY ("B") REFERENCES "PetImage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
