import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './controller/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/Users';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class UsersModule { }
