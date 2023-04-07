import { MigrationInterface, QueryRunner } from "typeorm"

export class ExpenseTable1680827171203 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE expenses (
                id SERIAL PRIMARY KEY,
                description VARCHAR(200) NOT NULL,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INT NOT NULL,
                expense_value DECIMAL(10, 2) NOT NULL,

                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE expenses DROP CONSTRAINT expenses_user_id_fkey;`)

        await queryRunner.query(`DROP TABLE expenses;`);
    }

}
