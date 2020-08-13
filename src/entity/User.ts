import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User {

    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    email: string;

    @Column() 
    username: string

    @Column({ nullable: true })
    firstname?: string;

    @Column({ nullable: true })
    lastname?: string;

    @Column({ nullable: true })
    age: number;

    @Column()
    @Exclude()
    password: string;
}
