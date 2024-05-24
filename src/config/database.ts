import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MagicItem } from "../magic-items/entities/magic-item.entity";
import { MagicMover } from "../magic-movers/entities/magic-mover.entity";
import { Mission } from "../missions/entities/mission.entity";
import { ItemsToMissions } from "../missions/entities/items-to-missions.dto";

export const typeOrmConfig : TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    username: "postgres",
    password: "postgres",
    port: 5432,
    database: "magic_transporters",
    entities: [
        // __dirname + "/../**/*.entity{.js , .ts}"
        MagicItem,
        MagicMover,
        Mission,
        ItemsToMissions
    ]
}