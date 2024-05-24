import { MagicMoverStatus } from "../../utils/types";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class MagicMover {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    weightLimit: number;
    
    @Column()
    availableWeight: number;

    @Column()
    totalEnergy: number;

    @Column()
    availableEnergy: number;

    @Column({ default: 0 })
    completedMissions: number;

    // charging rate in a minuet
    @Column()
    rateOfEnergyIncrease: number;

    @Column({type: "timestamp with time zone", nullable: true})
    lastResting: Date;
    
    @Column({nullable: true})
    missionId: number;

    @Column({
        type: 'enum',
        enum: MagicMoverStatus,
        default: MagicMoverStatus.DONE
    })
    state: MagicMoverStatus;
}
