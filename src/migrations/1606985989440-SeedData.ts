import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';

const seedUsers = [
  {
    firstName: 'Suranart',
    lastName: 'Niamcome',
    isActive: true,
  },
  {
    firstName: 'Rattikan',
    lastName: 'Apichai',
    isActive: true,
  },
];

const seedPhotos = [
  {
    url: '1',
    user: 1,
  },
  {
    url: '2',
    user: 1,
  },
  {
    url: '3',
    user: 2,
  },
];

export class SeedData1606985989440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('user').save(seedUsers);
    await getRepository('photo').save(seedPhotos);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // do nothing
  }
}
