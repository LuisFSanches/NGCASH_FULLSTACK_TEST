import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { Account } from "./Account";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  accountId: string;

  @OneToOne(() => Account, {
    eager: true
  })
  @JoinColumn({ name: 'accountId' })
  account: Account;

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
    if (!this.accountId) {
      this.accountId = uuidV4();
    }
  }
}

export { User }