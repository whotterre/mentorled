import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';

@Table
export class Task extends Model {
  @Column({ allowNull: false })
  title!: string;

  @Column({ type: 'TEXT', allowNull: true })
  description?: string;

  @Column({ type: 'DATE', allowNull: false })
  due_date!: Date;

  @Column({ defaultValue: false })
  completed!: boolean;

  @Column({ defaultValue: 'low' })
  priority!: 'low' | 'medium' | 'high';

  @ForeignKey(() => User)
  @Column({ type: 'INTEGER', allowNull: false })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}