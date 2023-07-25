import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuperadminService } from '../service/superadmin.service';
import { SuperadminDto } from '../DTO/superadmin.dto';

@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly superadminServices: SuperadminService) {}

  @Get()
  async getAll(@Res() res) {
    try {
      const data = await this.superadminServices.getall();
      return res.json(data);
    } catch (error) {
      res.status(500).send({ msg: 'Error At Obtener The Rol' });
      console.log(error);
    }
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Res() res, @Body() dto: SuperadminDto) {
    try {
      const data = await this.superadminServices.create(dto);
      console.log(data);
      return res.status(HttpStatus.OK).json({
        message: 'Insert New Superadmin',
      });
    } catch (error) {
      if (error instanceof BadRequestException) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'The superadmin exist',
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          msg: 'Error At Insert New superadmin',
        });
        console.log(error);
      }
    }
  }

  @Put(':uuid')
  async update(@Res() res, @Body() dto: SuperadminDto, @Param('uuid') uuid) {
    try {
      const data = await this.superadminServices.updateByUuid(uuid, dto);
      return res.status(HttpStatus.OK).json({
        menssage: 'Superadmin Update Correct',
        data,
      });
    } catch (error) {
      res.status(500).send({ msg: 'Error Superadmin Dont Update' });
      console.log(error);
    }
  }

  @Delete(':uuid')
  async delete(@Res() res, @Param('uuid') uuid) {
    try {
      await this.superadminServices.deleteByUuid(uuid);
      return res.status(HttpStatus.OK).json({
        menssage: 'Superadmin Delete Correct',
      });
    } catch (error) {
      res.status(500).send({ msg: 'Error At Delete The Superadmin' });
      console.log(error);
    }
  }
}
