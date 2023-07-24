import { Controller, Post, UseInterceptors, UploadedFile, Res, HttpStatus, Get, Body, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from '../services/documents.service';
import { MulterFile } from 'multer';
import { DocumentsDto } from "../DTO/createDTO";

@Controller('documents')
export class DocumentsController {

    constructor(private readonly filesService: DocumentsService) { }

    @Post('/:uuid')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: MulterFile,@Body() createDto: DocumentsDto,@Param('uuid') uuid: string, @Res() res): Promise<string> {
        try {
            let data = await this.filesService.create(file,createDto,uuid);
            return res.status(201).json({
                menssage: ' Document added Successfully ',
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

    @Get('/:uuid')
    async getAllFiles(@Res() res, @Param('uuid') uuid: string): Promise<string[]> {
        try {
            const data = await this.filesService.findAll(uuid);
            return res.status(201).json({
                data      
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({ menssage: "There is a problem" });
        }
    }


    @Delete('/:uuidClient/:uuidDocument')
    async deleteFile(@Param('uuidClient') uuidClient: string, @Param('uuidDocument') uuidDocument: string, @Res() res): Promise<string> {
        try {
            await this.filesService.delete(uuidClient,uuidDocument);
            return res.status(201).json({
                menssage: 'Note successfully removed',
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ menssage: "There is a problem" });
        }
    }


}
