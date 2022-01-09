import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from "bcrypt";
import { bcryptSaltRounds } from 'src/auth/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>
) { }

  async createUser(createUserDto: CreateUserDto) {
    const hashpassword = await this.encrypt(createUserDto.password)
    return this.usersRepository.save(
      {
        firstname: createUserDto.firstname,
        lastname: createUserDto.lastname,
        email: createUserDto.email,
        password: hashpassword
      }
    );
  }

  async encrypt(password:string): Promise<any> {
    return await bcrypt.hash(password, bcryptSaltRounds);
  }

  async hashCompare(reqPass, dbPass){
    return bcrypt.compare(reqPass, dbPass);
  }


  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    await this.usersRepository.findOne(id);
  }

  async findUser(query:any): Promise<Users> {
    return await this.usersRepository.findOne(query);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }

}
