import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { ColumnNumericTransformer } from "../utils/ColumnNumericTransformer";
import { v4 as uuidV4 } from "uuid";

@Entity("accounts")
class Account {
  @PrimaryColumn()
  id: string;

  @Column('numeric', {
    transformer: new ColumnNumericTransformer()
  })
  balance: number;

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Account }