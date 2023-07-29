import { Controller, Post, UseInterceptors, UploadedFile, Res, HttpStatus, Get, Body, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from '../services/documents.service';
import { MulterFile } from 'multer';
import { DocumentsDto } from "../DTO/createDTO";

@Controller('documents')
export class DocumentsController {

    constructor(private readonly filesService: DocumentsService) { }

    @Post('/:uuidClient')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: MulterFile,@Body() createDto: DocumentsDto,@Param('uuidClient') uuidClient: string, @Res() res): Promise<string> {
        try {
            let data = await this.filesService.create(file,createDto,uuidClient);
            return res.status(201).json({
                menssage: ' Document added Successfully ',
                data
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({ menssage: "There is a problem" })
        }
    }

    @Get('/:uuidClient')
    async getAllFiles(@Res() res, @Param('uuidClient') uuidClient: string): Promise<string[]> {
        try {
            const data = await this.filesService.findAll(uuidClient);
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
