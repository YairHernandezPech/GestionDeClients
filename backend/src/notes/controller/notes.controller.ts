import { Body, Controller, Post, Res, HttpStatus, Get, Delete, Param, Put, NotFoundException } from '@nestjs/common';
import { NotesDto } from "../DTO/createDTO";
import { NotesService } from "../services/notes.service";

@Controller('notes')
export class NotesController {

    constructor(private readonly notesServices: NotesService) {}

    @Post('insert')
    async notes(@Res() res, @Body() createDto: NotesDto) {
        try {
            let data = await this.notesServices.create(createDto)
            return res.status(HttpStatus.OK).json({
                menssage: 'Nota Agregada',
                data
            })
        } catch (error) {
            res.status(500).send({ msg: "Ha habido un problema" })
            console.log(error)
        }
    }

    @Get('/')
    async getNote(@Res() res) {
        try {
            let data = await this.notesServices.findAll();
            return res.json(data);
        } catch (error) {
            res.status(500).send({ msg: "Ha habido un problema" })
            console.log(error)
        }
    }

    @Put('/update/:_id')
    async updatenote(@Res() res, @Body() createDto: NotesDto, @Param('_id') _id) {
        try {
            let data = await this.notesServices.update(_id,createDto)
            return res.status(HttpStatus.OK).json({
                menssage: "Nota actualizada correctamente",
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
            let data = await this.notesServices.delete(_id);
            return res.status(HttpStatus.OK).json({
                menssage: "Nota eliminada correctamente"
            })
        } catch (error) {
            res.status(500).send({ msg: "Ha habido un problema" })
            console.log(error)
        }
    }

}
