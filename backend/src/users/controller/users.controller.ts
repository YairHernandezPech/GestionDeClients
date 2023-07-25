import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Get,
  Delete,
  Param,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersDto } from '../DTO/createDTO';
import { UsersService } from '../services/users.service';
import { SuperadminRepository } from '../../superadmin/repository/superadmin.repository';
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersServices: UsersService,
    private readonly superadminRepository: SuperadminRepository,
  ) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Res() res, @Body() dto: UsersDto) {
    try {
      const data = await this.usersServices.create(dto);
      console.log(data);
      return res.status(HttpStatus.OK).json({
        message: 'Insert New User',
      });
    } catch (error) {
      if (error.message === 'Ya existe un usuario con el mismo nombre') {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'El usuario ya existe',
        });
      } else if (
        error.message === 'Ya existe un usuario con el mismo correo electrónico'
      ) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'El correo electrónico ya está en uso',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          msg: 'Error al insertar nuevo usuario',
        });
        console.log(error);
      }
    }
  }

  @Get()
  async getUsers(@Res() res, @Query('valor') valor?: string) {
    try {
      if (valor) {
        const user = await this.usersServices.searchUser(valor);
        return res.json(user);
      } else {
        const normalUsers = await this.usersServices.getall();
        return res.json(normalUsers);
      }
    } catch (error) {
      res.status(500).send({ msg: 'Error in retrieving users' });
      console.log(error);
    }
  }

  @Put(':uuid')
  async update(@Res() res, @Body() dto: UsersDto, @Param('uuid') uuid) {
    try {
      const data = await this.usersServices.updateByUuid(uuid, dto);
      return res.status(HttpStatus.OK).json({
        menssage: 'User Update Correct',
        data,
      });
    } catch (error) {
      res.status(500).send({ msg: 'Error User Dont Update' });
      console.log(error);
    }
  }

  @Delete(':uuid')
  async delete(@Res() res, @Param('uuid') uuid) {
    try {
      await this.usersServices.deleteByUuid(uuid);
      return res.status(HttpStatus.OK).json({
        menssage: 'User Delete Correct',
      });
    } catch (error) {
      res.status(500).send({ msg: 'Error At Delete The User' });
      console.log(error);
    }
  }
}
