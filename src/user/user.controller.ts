import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { AuthorizedGuard } from '../auth/guards/authorized.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsAdminGuard } from './guards/is-admin.guard';
import { User } from './entities/user.entity';

@Controller('users')
@UseGuards(AuthorizedGuard)
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get('profile')
    async getProfile(@Req() request: Request&{userId: number}) : Promise<User> {
        let userId : number = request['userId'];
        return await this.userService.findUserById(userId);
    }
    
    @Patch('edit')
    async editProfile(@Body() updateUserDto: UpdateUserDto, @Req() request: Request&{userId: number}) : Promise<User> {
        let userId : number = request['userId'];
        return await this.userService.updateUser(userId,updateUserDto);
    }
    
    @Patch('promote/:userId')
    @UseGuards(IsAdminGuard)
    async promoteUser(@Param('userId',ParseIntPipe) userId: number) : Promise<boolean> {
        return await this.userService.promoteUser(userId);
    }

    @Delete('me')
    async remove(@Req() request: Request&{userId: number}) : Promise<boolean> {
        let userId: number = request['userId'];
        return await this.userService.deactivateUser(userId);
    }
    
}
