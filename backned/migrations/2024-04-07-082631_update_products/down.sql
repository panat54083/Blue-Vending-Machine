-- This file should undo anything in `up.sql`
ALTER TABLE "products" DROP COLUMN "name";
ALTER TABLE "products" DROP COLUMN "price";
ALTER TABLE "products" ADD COLUMN "name" VARCHAR(255) NOT NULL;
ALTER TABLE "products" ADD COLUMN "price" NUMERIC NOT NULL;

