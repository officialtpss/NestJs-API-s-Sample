import { Inject, Injectable } from '@nestjs/common';
import { UserData } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto/index.dto';
@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private readonly userModel: Model<UserData>) { }

  async create(CreateUser: CreateUserDto): Promise<UserData> {
    const Create = new this.userModel(CreateUser);
    return await Create.save();
  }
  async update(id: string, updateUser: UpdateUserDto): Promise<UserData> {
    return await this.userModel.updateOne({ _id: id }, updateUser);
  }
  async findEmail(userEmail: string): Promise<UserData> {
    return await this.userModel.findOne({ email: userEmail }, { password: 0 }).exec();
  }

  async findById(userId: string): Promise<UserData> {
    return await this.userModel.findOne({ _id: userId }, { password: 0 }).exec();
  }

  async login(login: LoginUserDto): Promise<UserData> {
    return await this.userModel.findOne(login, { password: 0 }).exec();
  }

  async findAll(): Promise<UserData[]> {
    return await this.userModel.find({}, { password: 0 }).exec();
  }

  async deleteUser(userId: string): Promise<UserData> {
    return await this.userModel.deleteOne({ _id: userId }).exec();
  }

}
