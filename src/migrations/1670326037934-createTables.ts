import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1670326037934 implements MigrationInterface {
    name = 'createTables1670326037934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_phones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying(60) NOT NULL, "userId" uuid, "contactId" uuid, CONSTRAINT "UQ_83a017f2778ec6e902a52e1ae8b" UNIQUE ("phone"), CONSTRAINT "PK_975f5d595e466bdcbb7b0afc2b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "email" character varying(60) NOT NULL, "isActive" boolean NOT NULL, "password" character varying(120) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(64) NOT NULL, "userId" uuid, CONSTRAINT "PK_c7048d25b5fda1fa70501fac9ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_emails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(60) NOT NULL, "userId" uuid, "contactId" uuid, CONSTRAINT "UQ_6594597afde633cfeab9a806e4f" UNIQUE ("email"), CONSTRAINT "PK_3ef6c4be97ba94ea3ba65362ad0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_phones" ADD CONSTRAINT "FK_4615e35b764e3aa70adfaad6d2f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_phones" ADD CONSTRAINT "FK_f7a973d6c5c19c0b90dba4bf26c" FOREIGN KEY ("contactId") REFERENCES "user_contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_contacts" ADD CONSTRAINT "FK_30fcfbc780a02d200e0589b2886" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_emails" ADD CONSTRAINT "FK_569342223a28f006d9bf897c7c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_emails" ADD CONSTRAINT "FK_63b66b69ce956017378e08dd801" FOREIGN KEY ("contactId") REFERENCES "user_contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_emails" DROP CONSTRAINT "FK_63b66b69ce956017378e08dd801"`);
        await queryRunner.query(`ALTER TABLE "user_emails" DROP CONSTRAINT "FK_569342223a28f006d9bf897c7c9"`);
        await queryRunner.query(`ALTER TABLE "user_contacts" DROP CONSTRAINT "FK_30fcfbc780a02d200e0589b2886"`);
        await queryRunner.query(`ALTER TABLE "user_phones" DROP CONSTRAINT "FK_f7a973d6c5c19c0b90dba4bf26c"`);
        await queryRunner.query(`ALTER TABLE "user_phones" DROP CONSTRAINT "FK_4615e35b764e3aa70adfaad6d2f"`);
        await queryRunner.query(`DROP TABLE "user_emails"`);
        await queryRunner.query(`DROP TABLE "user_contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_phones"`);
    }

}
