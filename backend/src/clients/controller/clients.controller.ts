import { Body, Controller, Post, Res, HttpStatus, Get, Delete, Param, Put, NotFoundException, Query, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ClientsDto } from "../DTO/createDTO";
import { ClientsService } from "../services/clients.service";

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsServices: ClientsService) { }

    @Post('insert')
    async notes(@Res() res, @Body(new ValidationPipe({ transform: true })) createDto: ClientsDto) {
        try {
            let data = await this.clientsServices.create(createDto)
            return res.status(HttpStatus.OK).json({
                menssage: "Cliente Agregado",
                data
            })
        } catch (error) {

            if (error instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: error.message,
                });
            } else {
                res.status(500).send({ msg: "Ha habido un problema" })
                console.log(error)
            }

        }
    }

    @Get('/')
    async getNote(@Res() res,@Query('page', ValidationPipe) page?: number, @Query('limit', ValidationPipe) limit?: number, @Query('valor', ValidationPipe) valor?: string,) {
        try {
            let data;
            if (page && limit && valor) {
                data = await this.clientsServices.searchClient(page,limit, valor)
            }
            else {
                if (page && limit) {
                    data = await this.clientsServices.findAll(page, limit);
                }
            }
            return res.json(data);
        } catch (error) {
            res.status(500).send({ msg: "Ha habido un problema" })
            console.log(error)
        }
    }

    @Put('/update/:_id')
    async updatenote(@Res() res, @Body() createDto: ClientsDto, @Param('_id') _id) {
        try {
            let data = await this.clientsServices.update(_id, createDto)

            return res.status(HttpStatus.OK).json({
                menssage: "Cliente actualizado correctamente",
                data
                
            })
        } catch (error) {
            res.status(500).send({ msg: "Ha habido un problema" })
            console.log(error)
        }
    }

    @Delete('/delete/:_id')
    async delete(@Res() res, @Param('_id') _id) {
        try {
            let data = await this.clientsServices.delete(_id);
            return res.status(HttpStatus.OK).json({
                menssage: "Cliente eliminado correctamente"
            })
        } catch (error) {
            res.status(500).send({ msg: "Ha habido un problema" })
            console.log(error)
        }
    }
}
