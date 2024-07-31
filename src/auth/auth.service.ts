import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LogInDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/create-user.dto';
import bcryptjs from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(@Inject(UserService) private readonly userService:UserService,
    private readonly jwtService:JwtService,
    private readonly configService:ConfigService){}

    private async assignToken(payload:any,expiresIn:string) {
        let options = {secret:this.configService.get<string>('JWT_SECRET'),expiresIn};
        return `Bearer:${await this.jwtService.signAsync(payload,options)}`
    }

    async logIn(logInDto : LogInDTO) : Promise<{accessToken:string}>{
        let {email,password} = logInDto;
        let user = await this.userService.findUserByEmail(email);
        try {
            let verify: boolean = await bcryptjs.compare(password,user.password);
            if(!verify) 
                throw new UnauthorizedException();

            const payload = {userId:user.id,username:user.name,role:user.role};
            return {accessToken: await this.assignToken(payload,'7d')};
        }
        catch(err) {
            throw new UnauthorizedException();
        }
    }
    
    async signUp(createUserDto : CreateUserDto) : Promise<{accessToken:string}>{
        let user = await this.userService.createUser(createUserDto);
        const payload = {userId:user.id,username:user.name,role:user.role};
        return {accessToken: await this.assignToken(payload,'7d')};
    }
    
}
