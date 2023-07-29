import { Body, Controller, Post, Res, Get, Delete, Param, Put } from '@nestjs/common';
import { NotesDto } from "../DTO/createDTO";
import { NotesService } from "../services/notes.service";

@Controller('notes')
export class NotesController {

    constructor(private readonly notesServices: NotesService) {}

    @Post('/:uuidClient')
    async notes(@Res() res, @Body() createDto: NotesDto, @Param('uuidClient') uuidClient: string) {
        try {
            let data = await this.notesServices.create(createDto,uuidClient)
            return res.status(201).json({
                menssage: 'Nota Agregada',
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

    @Get('/:uuidClient')
    async getNote(@Res() res,@Param('uuidClient') uuidClient: string) {
        try {
            let data = await this.notesServices.findAll(uuidClient);
            return res.status(201).json({
                data      
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

    @Put('/:uuidClient/:uuidNote')
    async updatenote(@Res() res, @Body() createDto: NotesDto, @Param('uuidClient') uuidClient: string,@Param('uuidNote') uuidNote: string) {
        try {
            let data = await this.notesServices.update(uuidClient,uuidNote,createDto)
            return res.status(201).json({
                menssage: "Note updated successfully",
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

    @Delete('/:uuidClient/:uuidNote')
    async delete(@Res() res, @Param('uuidClient') uuidClient: string,@Param('uuidNote') uuidNote: string) {
        try {
            await this.notesServices.delete(uuidClient,uuidNote);
            return res.status(201).json({
                menssage: "Note successfully removed"
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

}
