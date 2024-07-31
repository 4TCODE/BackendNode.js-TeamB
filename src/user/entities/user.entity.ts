import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcryptjs from 'bcryptjs'

export enum UserRoles {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @Column({unique:true})
    email:string;
    
    @Column()
    password:string;
    
    @Column()
    salt:string;

    @Column({default:true})
    active: boolean;

    @Column({
        type: 'enum',
        enum: UserRoles,
        default: UserRoles.USER
    })
    role: UserRoles;

    async validatePassword(password : string) : Promise<boolean> {
        let hash = await bcryptjs.hash(password,this.salt);
        return (this.password === hash);
    }
}