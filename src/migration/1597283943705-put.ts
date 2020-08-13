import {MigrationInterface, QueryRunner} from "typeorm";

export class put1597283943705 implements MigrationInterface {
    name = 'put1597283943705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `firstname` `firstname` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastname` `lastname` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `age` `age` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `age` `age` int NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `lastname` `lastname` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user` CHANGE `firstname` `firstname` varchar(255) NOT NULL");
    }

}
