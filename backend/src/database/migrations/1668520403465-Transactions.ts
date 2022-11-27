import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Transactions1668520403465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'debitedAccountId',
                        type:  'uuid'
                    },
                    {
                        name: 'creditedAccountId',
                        type:  'uuid'
                    },
                    {
                        name: 'value',
                        type: 'numeric'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");
    }

}
