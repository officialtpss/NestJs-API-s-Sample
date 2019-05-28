import { Controller, Get, Post, Body, HttpStatus, HttpException, Param, Put, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserData } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto/index.dto';

@Controller('user')
export class UserController {
  regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  constructor(private readonly userService: UserService) { }

  @Get()
  async findAll(): Promise<UserData[]> {
    return this.userService.findAll();
  }

  @Get('/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<UserData> {
    const user = await this.userService.findEmail(userId);
    if (!user) {
      throw new HttpException('user not exist', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    if (!user.name) {
      throw new HttpException('name is required', HttpStatus.BAD_REQUEST);
    }
    if (!user.email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }
    if (!this.regEmail.test(user.email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }
    if (!user.password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }
    const userCheck = await this.userService.findEmail(user.email);
    if (userCheck) {
      throw new HttpException(`${user.email} already exist`, HttpStatus.BAD_REQUEST);
    }
    this.userService.create(user);
    return;
  }

  @Patch('/:userId')
  async update(@Param('userId') userId: string, @Body() updateUser: UpdateUserDto) {
    if (!updateUser.name) {
      throw new HttpException('name is required', HttpStatus.BAD_REQUEST);
    }
    return this.userService.update(userId, updateUser);
  }

  @Put()
  async login(@Body() login: LoginUserDto) {
    if (!login.email) {
      throw new HttpException('email is required', HttpStatus.BAD_REQUEST);
    }
    if (!this.regEmail.test(login.email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }
    if (!login.password) {
      throw new HttpException('password is required', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userService.login(login);
    if (!user) {
      throw new HttpException('email/password does not match', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  @Delete('/:userId')
  async delete(@Param('userId') userId: string) {
    if (!userId) {
      throw new HttpException('userId is required', HttpStatus.BAD_REQUEST);
    }
    return this.userService.deleteUser(userId);
  }

}
