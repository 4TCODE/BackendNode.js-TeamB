import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User, UserRoles } from "./entities/user.entity";
import { Repository } from "typeorm";
import bcryptjs from "bcryptjs";
import { ConfigService } from "@nestjs/config";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly configService: ConfigService
  ) {}

  async findUserById(userId: number): Promise<User> {
    let user = await this.userRepo.findOne({
      where: { id: userId }
    });
    
    if (!user || !user.active)
      throw new NotFoundException("There is No Id Like That " + userId);
    
    user.password = '$';
    user.salt = '$';
    
    return user;
  }
  
  async updateUser(userId: number, updateUserDto: UpdateUserDto) : Promise<User> {
    let user = await this.userRepo.findOne({
      where: { id: userId }
    });
    if (!user || !user.active)
      throw new NotFoundException("There is No Id Like That " + userId);

    if(updateUserDto.password && updateUserDto.newPassword) {
      let validPassword: boolean = await bcryptjs.compare(updateUserDto.password,user.password);
      
      if(!validPassword)
        throw new ConflictException("The password is not correct, try again...");
      
      // hash the new password with the existed salt
      let newHashedPassword = await bcryptjs.hash(updateUserDto.newPassword,user.salt);
      user.password = newHashedPassword;
    }
    
    delete updateUserDto['password'];
    delete updateUserDto['newPassword'];

    Object.assign(user,updateUserDto);

    return await this.userRepo.save(user);
  }

  async findUserByEmail(email: string) : Promise<User> {
    let user = await this.userRepo.findOne({where:{email}});
    if(!user) 
      throw new NotFoundException("There is No Email Like That " + email);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      let salt = await bcryptjs.genSalt();
      let hashedPassword = await bcryptjs.hash(
        createUserDto.password as string,
        salt
      );
      createUserDto.password = hashedPassword;
      
      let user: User = await this.userRepo.save({ ...createUserDto,salt });

      return user;
    } catch (err) {
      // if the email was used
      if (
        err.code === this.configService.get<string>("UNIQUE_EXCEPTION_CODE")
      ) {
        throw new ConflictException("There is an email such that");
      }
      throw new InternalServerErrorException(err);
    }
  }

  async deactivateUser(userId: number) : Promise<boolean> {
    let user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user)
      throw new NotFoundException("There is no id like that " + userId);
    user.active = false;
    await this.userRepo.update({id:userId},user);
    return true;
  }
  
  async promoteUser(userId: number) : Promise<boolean> {
    let user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user)
      throw new NotFoundException("There is no id like that " + userId);
    user.role = UserRoles.ADMIN;
    await this.userRepo.update({id:userId},user);
    return true;
  }
}
