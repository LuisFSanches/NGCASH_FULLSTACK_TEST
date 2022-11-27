import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { ColumnNumericTransformer } from "../utils/ColumnNumericTransformer";
import { v4 as uuidV4 } from "uuid";
import { Account } from "./Account";

@Entity("transactions")
class Transaction {

  @PrimaryColumn()
  id: string;

  @Column()
  debitedAccountId: string;
  
  @ManyToOne(() => Account, {
    eager: true
  })
  @JoinColumn({ name: 'debitedAccountId' })
  debitedAccount: Account

  @Column()
  creditedAccountId: string;

  @ManyToOne(() => Account, {
    eager: true
  })
  @JoinColumn({ name: 'creditedAccountId' })
  creditedAccount: Account

  @Column('numeric', {
    transformer: new ColumnNumericTransformer()
  })
  value: number;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }

}

export { Transaction };