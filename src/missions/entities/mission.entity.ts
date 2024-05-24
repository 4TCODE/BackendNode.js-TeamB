import { MagicMover } from "../../magic-movers/entities/magic-mover.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type : 'timestamp without time zone' , nullable: true})
    start: Date;

    @Column({type : 'timestamp without time zone', nullable: true})
    end: Date;

    @ManyToOne(() => MagicMover)
    magicMover: MagicMover;
}
