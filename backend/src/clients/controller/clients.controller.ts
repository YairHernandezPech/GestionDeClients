import { Body, Controller, Post, Res, HttpStatus, Get, Delete, Param, Put, NotFoundException, Query, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ClientsDto } from "../DTO/createDTO";
import { ClientsService } from "../services/clients.service";

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsServices: ClientsService) { }

    @Post('/')
    async insertClient(@Res() res, @Body(new ValidationPipe({ transform: true })) createDto: ClientsDto) {
        try {
            let data = await this.clientsServices.create(createDto)
            return res.status(201).json({
                menssage: "Client added Successfully",
                data
            })
        } catch (error) {

            if (error instanceof BadRequestException) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: error.message,
                });
            } else {
                console.log(error)
                res.status(500).send({ menssage: "There is a problem" })
            }

        }
    }

    @Get('/')
    async getClient(@Res() res,@Query('page', ValidationPipe) page?: number, @Query('limit', ValidationPipe) limit?: number, @Query('valor', ValidationPipe) valor?: string,) {
        try {
            let data = await this.clientsServices.findAll(page,limit,valor);
            return res.status(201).json({
                data      
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

    @Put('/:uuid')
    async updateClient(@Res() res, @Body() createDto: ClientsDto, @Param('uuid') uuid) {
        try {
            let data = await this.clientsServices.update(uuid, createDto)

            return res.status(201).json({
                menssage: "Client updated successfully",
                data     
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

    @Delete('/:uuid')
    async delete(@Res() res, @Param('uuid') uuid) {
        try {
            await this.clientsServices.delete(uuid);
            return res.status(201).json({
                menssage: "Client successfully removed"
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }
}
