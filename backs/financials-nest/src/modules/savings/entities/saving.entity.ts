import { User } from "@modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Saving {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar")
  description: string;

  @Column("int4")
  monto: number;

  @Column("timestamp")
  fecha: string;

  @Column("boolean")
  retiro: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
