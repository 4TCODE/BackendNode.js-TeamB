import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDTO } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async logIn(@Body() info:LogInDTO) : Promise<{accessToken:string}> {
        return await this.authService.logIn(info);
    }
    
    @Post('signup')
    @HttpCode(HttpStatus.OK)
    @UsePipes(ValidationPipe)
    async signUp(@Body() createUserDto: CreateUserDto) : Promise<{accessToken:string}>{
        return await this.authService.signUp(createUserDto);
    }

}