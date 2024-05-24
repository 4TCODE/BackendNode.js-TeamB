import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MagicItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    weight: number;
}
