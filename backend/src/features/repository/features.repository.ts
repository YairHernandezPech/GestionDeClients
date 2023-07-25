import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Crud } from '../../shared/CRUDUser';
import { FeatureDto } from '../DTO/features.dto';
import { Features, FeaturesDocument } from '../model/feature.model';

@Injectable()
export class FeaturesRepository implements Crud<FeaturesDocument, FeatureDto> {
  constructor(
    @InjectModel(Features.name)
    private readonly featuresModel: Model<FeaturesDocument>,
  ) {}

  async create(featureDto: FeatureDto): Promise<any> {
    const newFeature = await this.featuresModel.create(featureDto);
    return newFeature;
  }

  async get(skip, limit, value): Promise<any[]> {
    return this.featuresModel
      .find(value)
      .skip(skip)
      .limit(limit)
      .sort({ date: -1, status: 1 })
      .exec();
  }

  async getByUuid(uuid: string): Promise<any> {
    return this.featuresModel.findOne({ uuid }).exec();
  }

  async updateByUuid(uuid: string, data: FeatureDto): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async deleteByUuid(uuid: string) {
    await this.featuresModel.deleteOne({ uuid }).exec();
  }
}
