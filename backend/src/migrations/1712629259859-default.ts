import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1712629259859 implements MigrationInterface {
    name = 'Default1712629259859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coin_banknote" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" integer NOT NULL, "type" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_c970c10ea243c2a40364230ebf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "paymentAmount" integer NOT NULL, "changeAmount" integer NOT NULL, "productId" integer, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_fd965536176f304a7dd64937165" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_fd965536176f304a7dd64937165"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "coin_banknote"`);
    }

}
