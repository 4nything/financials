import { User } from "@modules/users/entities/user.entity";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryColumn, Unique } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class PaymentMethod {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  description: string;

  @Column({ type: "varchar", nullable: true })
  cardNumber: string;

  @Column({ type: "int4", nullable: true })
  dateOfCardPeriod: number;

  @Column("boolean")
  isCard: boolean;

  @Column("boolean")
  credit: boolean;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user: User;

  @BeforeInsert()
  generateId() {
    this.id = uuidv4();
  }
}
