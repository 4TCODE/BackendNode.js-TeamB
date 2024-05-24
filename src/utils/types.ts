export enum MagicMoverStatus {
    RESTING= "resting",
    LOADING= "loading",
    ON_A_MISSION= "on_a_mission",
    DONE= "done"
};

export type MissionDate = {
    start?: Date;
    end?: Date;
};