import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExpenseTable1680827171203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE expenses (
                id SERIAL PRIMARY KEY,
                description VARCHAR(200) NOT NULL,
                expense_date TIMESTAMP NOT NULL,
                user_id INT NOT NULL,
                expense_value INT NOT NULL,

                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);
  }

  // dinheiro armazenado em centavos

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE expenses DROP CONSTRAINT expenses_user_id_fkey;`,
    );

    await queryRunner.query(`DROP TABLE expenses;`);
  }
}
