import { v4 as uuidV4 } from 'uuid';
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: String;

  @Column()
  name: String;

  @Column()
  description: String;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };