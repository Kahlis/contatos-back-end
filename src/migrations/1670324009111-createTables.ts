import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1670324009111 implements MigrationInterface {
    name = 'createTables1670324009111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_emails" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(60) NOT NULL, "userId" varchar, "contactId" varchar, CONSTRAINT "UQ_6594597afde633cfeab9a806e4f" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "user_phones" ("id" varchar PRIMARY KEY NOT NULL, "phone" varchar(60) NOT NULL, "userId" varchar, "contactId" varchar, CONSTRAINT "UQ_83a017f2778ec6e902a52e1ae8b" UNIQUE ("phone"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "email" varchar(60) NOT NULL, "isActive" boolean NOT NULL, "password" varchar(120) NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "user_contacts" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(64) NOT NULL, "userId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_user_emails" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(60) NOT NULL, "userId" varchar, "contactId" varchar, CONSTRAINT "UQ_6594597afde633cfeab9a806e4f" UNIQUE ("email"), CONSTRAINT "FK_569342223a28f006d9bf897c7c9" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_63b66b69ce956017378e08dd801" FOREIGN KEY ("contactId") REFERENCES "user_contacts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_emails"("id", "email", "userId", "contactId") SELECT "id", "email", "userId", "contactId" FROM "user_emails"`);
        await queryRunner.query(`DROP TABLE "user_emails"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_emails" RENAME TO "user_emails"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_phones" ("id" varchar PRIMARY KEY NOT NULL, "phone" varchar(60) NOT NULL, "userId" varchar, "contactId" varchar, CONSTRAINT "UQ_83a017f2778ec6e902a52e1ae8b" UNIQUE ("phone"), CONSTRAINT "FK_4615e35b764e3aa70adfaad6d2f" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_f7a973d6c5c19c0b90dba4bf26c" FOREIGN KEY ("contactId") REFERENCES "user_contacts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_phones"("id", "phone", "userId", "contactId") SELECT "id", "phone", "userId", "contactId" FROM "user_phones"`);
        await queryRunner.query(`DROP TABLE "user_phones"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_phones" RENAME TO "user_phones"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_contacts" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(64) NOT NULL, "userId" varchar, CONSTRAINT "FK_30fcfbc780a02d200e0589b2886" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_contacts"("id", "name", "userId") SELECT "id", "name", "userId" FROM "user_contacts"`);
        await queryRunner.query(`DROP TABLE "user_contacts"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_contacts" RENAME TO "user_contacts"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_contacts" RENAME TO "temporary_user_contacts"`);
        await queryRunner.query(`CREATE TABLE "user_contacts" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(64) NOT NULL, "userId" varchar)`);
        await queryRunner.query(`INSERT INTO "user_contacts"("id", "name", "userId") SELECT "id", "name", "userId" FROM "temporary_user_contacts"`);
        await queryRunner.query(`DROP TABLE "temporary_user_contacts"`);
        await queryRunner.query(`ALTER TABLE "user_phones" RENAME TO "temporary_user_phones"`);
        await queryRunner.query(`CREATE TABLE "user_phones" ("id" varchar PRIMARY KEY NOT NULL, "phone" varchar(60) NOT NULL, "userId" varchar, "contactId" varchar, CONSTRAINT "UQ_83a017f2778ec6e902a52e1ae8b" UNIQUE ("phone"))`);
        await queryRunner.query(`INSERT INTO "user_phones"("id", "phone", "userId", "contactId") SELECT "id", "phone", "userId", "contactId" FROM "temporary_user_phones"`);
        await queryRunner.query(`DROP TABLE "temporary_user_phones"`);
        await queryRunner.query(`ALTER TABLE "user_emails" RENAME TO "temporary_user_emails"`);
        await queryRunner.query(`CREATE TABLE "user_emails" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar(60) NOT NULL, "userId" varchar, "contactId" varchar, CONSTRAINT "UQ_6594597afde633cfeab9a806e4f" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "user_emails"("id", "email", "userId", "contactId") SELECT "id", "email", "userId", "contactId" FROM "temporary_user_emails"`);
        await queryRunner.query(`DROP TABLE "temporary_user_emails"`);
        await queryRunner.query(`DROP TABLE "user_contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_phones"`);
        await queryRunner.query(`DROP TABLE "user_emails"`);
    }

}
