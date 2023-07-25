import { Module } from '@nestjs/common';
import { FeaturesService } from './service/features.service';
import { FeaturesController } from './controller/features.controller';
import { AwsConfig } from './aws.config';
import { ConfigModule } from '@nestjs/config';
import { FeaturesRepository } from '../features/repository/features.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Features, FeaturesSchema } from '../features/model/feature.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Features.name, schema: FeaturesSchema },
    ]),
  ],
  providers: [FeaturesService, AwsConfig, FeaturesRepository],
  controllers: [FeaturesController],
})
export class FeaturesModule {}
