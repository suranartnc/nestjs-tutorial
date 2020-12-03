import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1606981572028 implements MigrationInterface {
    name = 'PostRefactoring1606981572028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `name` `firstName` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `firstName` `name` varchar(255) NOT NULL");
    }

}
