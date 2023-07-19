import { Controller, Post, UseInterceptors, UploadedFile, Res, HttpStatus, Get, Body, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from '../services/documents.service';
import { MulterFile } from 'multer';
import { DocumentsDto } from "../DTO/createDTO";

@Controller('documents')
export class DocumentsController {

    constructor(private readonly filesService: DocumentsService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: MulterFile,@Body() createDto: DocumentsDto, @Res() res): Promise<string> {
        try {
            let data = await this.filesService.create(file,createDto);
            return res.status(HttpStatus.OK).json({
                menssage: ' Archivo subido exitosamente ',
                data
            })
        } catch (error) {
            res.status(500).send({ msg: "Ha habido un problema" })
            console.log(error)
        }
    }

    @Get('/')
    async getAllFiles(@Res() res): Promise<string[]> {
        try {
            const data = await this.filesService.findAll();
            return res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Ha habido un problema" });
        }
    }


    @Delete('/delete/:key')
    async deleteFile(@Param('key') key: string, @Res() res): Promise<string> {
        try {
            await this.filesService.delete(key);
            return res.status(HttpStatus.OK).json({
                menssage: 'Archivo eliminado exitosamente',
            });
        } catch (error) {
            res.status(500).send({ msg: 'Ha habido un problema' });
            console.log(error);
        }
    }


}
