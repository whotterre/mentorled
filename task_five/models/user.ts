// src/models/User.ts
import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Task } from './task';

@Table
export class User extends Model {
    @Column({ unique: true })
    email!: string;

    @Column({ allowNull: false })
    password!: string;

    @Column({ allowNull: false })
    name!: string;

    @HasMany(() => Task)
    tasks!: Task[];
}