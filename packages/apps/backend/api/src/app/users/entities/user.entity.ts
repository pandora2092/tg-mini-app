import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  chatId!: string;

  @Column({ type: 'varchar' })
  username!: string;

  @Column({ type: 'boolean', default: false })
  delivered!: boolean;

  @Column({ type: 'boolean', default: false })
  dead!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated!: Date;
}
