import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column()
    author: string;
}
