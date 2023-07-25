import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolService } from '../service/rol.service';
import { RolDto } from '../DTO/rol.dto';
@Controller('rol')
export class RolController {
  constructor(private readonly rolServices: RolService) {}

  @Get()
  async getAll(@Res() res) {
    try {
      const data = await this.rolServices.getall();
      return res.json(data);
    } catch (error) {
      res.status(500).send({ msg: 'Error At Obtener The Rol' });
      console.log(error);
    }
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Res() res, @Body() obj: RolDto) {
    try {
      const data = await this.rolServices.create(obj);
      console.log(data);
      return res.status(HttpStatus.OK).json({
        message: 'Insert New Rol',
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'The rol exist',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          msg: 'Error At Insert The Rol',
        });
        console.log(error);
      }
    }
  }

  @Delete(':uuid')
  async delete(@Res() res, @Param('uuid') uuid) {
    try {
      await this.rolServices.deleteByUuid(uuid);
      return res.status(HttpStatus.OK).json({
        menssage: 'Rol Delete Correct',
      });
    } catch (error) {
      res.status(500).send({ msg: 'Error At Delete The Rol' });
      console.log(error);
    }
  }
}
