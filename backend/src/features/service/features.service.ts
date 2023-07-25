import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AwsConfig } from '../aws.config';
import { FeatureDto } from '../DTO/features.dto';
import { S3 } from 'aws-sdk';
import { FeaturesRepository } from '../repository/features.repository';
import { orderFeature } from '../../utils/orderFeatures';
import { searchValues } from '../../utils/buscadorFeatures';

@Injectable()
export class FeaturesService {
  private s3: S3;
  constructor(
    private readonly featuresRepository: FeaturesRepository,
    private readonly awsConfig: AwsConfig,
  ) {
    this.s3 = new S3({
      accessKeyId: this.awsConfig.accessKeyId,
      secretAccessKey: this.awsConfig.secretAccessKey,
      region: this.awsConfig.region,
    });
  }

  async create(
    file: Express.Multer.File,
    featureDto: FeatureDto,
  ): Promise<any> {
    try {
      const fileBuffer: Buffer = Buffer.from(file.buffer);

      const params = {
        Bucket: this.awsConfig.bucketName,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: fileBuffer,
      };

      const newFeature = await this.s3.upload(params).promise();
      featureDto.key = newFeature.Key;
      featureDto.url = newFeature.Location;

      const createdFeature = await this.featuresRepository.create(featureDto);
      return createdFeature;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to create a new feature');
    }
  }

  async listFeatures(page, limit, valor): Promise<any[]> {
    try {
      const skip = (page - 1) * limit;
      const value = searchValues(valor);
      const features = await this.featuresRepository.get(skip, limit, value);
      return orderFeature(features);
    } catch (err) {
      console.log(err);
      throw new Error('Failed to list features');
    }
  }

  async getFeatureByUuid(uuid: string): Promise<any> {
    try {
      return await this.featuresRepository.getByUuid(uuid);
    } catch (err) {
      console.log(err);
      throw new Error('Failed to get feature by UUID');
    }
  }

  async downloadAttachment(uuid: string): Promise<{
    success: boolean;
    fileContent?: Buffer;
    fileName?: string;
    message?: string;
  }> {
    const feature = await this.featuresRepository.getByUuid(uuid);
    if (!feature || !feature.key) {
      return { success: false, message: 'Feature or attachment not found' };
    }

    try {
      const params = {
        Bucket: this.awsConfig.bucketName,
        Key: feature.key,
      };

      const file = await this.s3.getObject(params).promise();

      const fileContent: Buffer = Buffer.from(file.Body as ArrayBuffer);

      return {
        success: true,
        fileContent,
        fileName: feature.key.split('-').pop(),
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: 'Failed to download attachment' };
    }
  }

  async deleteFeatureByUuid(
    uuid: string,
  ): Promise<{ success: boolean; message?: string }> {
    const feature = await this.featuresRepository.getByUuid(uuid);
    if (!feature || !feature.key) {
      return { success: false, message: 'Feature or attachment not found' };
    }

    try {
      const params = {
        Bucket: this.awsConfig.bucketName,
        Key: feature.key,
      };

      await this.s3.deleteObject(params).promise();
      await this.featuresRepository.deleteByUuid(uuid);
      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: 'Failed to delete feature and attachment',
      };
    }
  }
}
