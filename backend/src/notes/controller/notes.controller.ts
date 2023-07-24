import { Body, Controller, Post, Res, Get, Delete, Param, Put } from '@nestjs/common';
import { NotesDto } from "../DTO/createDTO";
import { NotesService } from "../services/notes.service";

@Controller('notes')
export class NotesController {

    constructor(private readonly notesServices: NotesService) {}

    @Post('/')
    async notes(@Res() res, @Body() createDto: NotesDto) {
        try {
            let data = await this.notesServices.create(createDto)
            return res.status(201).json({
                menssage: 'Nota Agregada',
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

    @Get('/')
    async getNote(@Res() res) {
        try {
            let data = await this.notesServices.findAll();
            return res.status(201).json({
                data      
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

    @Put('/:uuid')
    async updatenote(@Res() res, @Body() createDto: NotesDto, @Param('uuid') uuid) {
        try {
            let data = await this.notesServices.update(uuid,createDto)
            return res.status(201).json({
                menssage: "Note updated successfully",
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
            await this.notesServices.delete(uuid);
            return res.status(201).json({
                menssage: "Note successfully removed"
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

}
