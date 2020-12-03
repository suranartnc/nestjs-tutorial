import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1606981546446 implements MigrationInterface {
    name = 'PostRefactoring1606981546446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `xxx` `name` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `name` `xxx` varchar(255) NOT NULL");
    }

}
