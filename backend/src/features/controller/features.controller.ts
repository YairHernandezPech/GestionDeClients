import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  Param,
  Get,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FeaturesService } from '../service/features.service';
import { FeatureDto } from '../DTO/features.dto';

@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() featureDto: FeatureDto,
    @Param('uuid') uuid: string,
    @Res() res,
  ): Promise<string> {
    try {
      const data = await this.featuresService.create(file, featureDto);
      return res.status(201).json({
        menssage: ' Feature added Successfully ',
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ menssage: 'There is an error' });
    }
  }

  @Get('list')
  async listFeatures(
    @Res() res,
    @Query('page', ValidationPipe) page?: number,
    @Query('limit', ValidationPipe) limit?: number,
    @Query('valor', ValidationPipe) valor?: string,
  ): Promise<any> {
    try {
      const features = await this.featuresService.listFeatures(
        page,
        limit,
        valor,
      );
      return res.status(200).json({
        message: 'Features listed successfully',
        data: features,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'There is an error' });
    }
  }

  @Get('download/:uuid')
  async downloadAttachment(
    @Param('uuid') uuid: string,
    @Res() res,
  ): Promise<any> {
    try {
      const downloadResult = await this.featuresService.downloadAttachment(
        uuid,
      );
      if (!downloadResult.success) {
        return res.status(404).json({ message: downloadResult.message });
      }
      const { fileContent, fileName } = downloadResult;
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${fileName}"`,
      );
      res.status(200).send(fileContent);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'There is an error' });
    }
  }

  @Delete(':uuid')
  async deleteFeatureByUuid(
    @Param('uuid') uuid: string,
    @Res() res,
  ): Promise<any> {
    try {
      const deleteResult = await this.featuresService.deleteFeatureByUuid(uuid);
      if (!deleteResult.success) {
        return res.status(404).json({ message: deleteResult.message });
      }
      return res
        .status(200)
        .json({ message: 'Feature and attachment deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: 'There is an error' });
    }
  }
}
