import {MigrationInterface, QueryRunner} from "typeorm";

export class changedUserClassProperties1597283249509 implements MigrationInterface {
    name = 'changedUserClassProperties1597283249509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstName`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastName`");
        await queryRunner.query("ALTER TABLE `user` ADD `firstname` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `lastname` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastname`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstname`");
        await queryRunner.query("ALTER TABLE `user` ADD `lastName` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `firstName` varchar(255) NOT NULL");
    }

}
