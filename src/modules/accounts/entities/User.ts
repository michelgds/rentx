import { v4 as uuidV4 } from "uuid";
import { Entity, Column, CreateDateColumn, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: String;

  @Column()
  name: String;

  @Column()
  username: String;

  @Column()
  email: String;

  @Column()
  password: String;

  @Column()
  driver_licence: String;

  @Column()
  isAdmin: Boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User }