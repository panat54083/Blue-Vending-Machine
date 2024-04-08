-- Your SQL goes here
ALTER TABLE "products" DROP COLUMN "name";
ALTER TABLE "products" DROP COLUMN "price";
ALTER TABLE "products" ADD COLUMN "name" VARCHAR NOT NULL;
ALTER TABLE "products" ADD COLUMN "price" DOUBLE NOT NULL;

