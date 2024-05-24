import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mission } from "./mission.entity";
import { MagicItem } from "../../magic-items/entities/magic-item.entity";

@Entity()
export class ItemsToMissions {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Mission)
    mission: Mission;
    
    @ManyToOne(() => MagicItem)
    magicItem: MagicItem;
}