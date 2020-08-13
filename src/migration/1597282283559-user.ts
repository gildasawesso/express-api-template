import {MigrationInterface, QueryRunner} from "typeorm";

export class user1597282283559 implements MigrationInterface {
    name = 'user1597282283559'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `username` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `password` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `password`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `username`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`");
    }

}
