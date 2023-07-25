import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
config();

@Injectable()
export class AwsConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;

  constructor() {
    this.accessKeyId = process.env.ACCESSKEYID;
    this.secretAccessKey = process.env.SECRETACCESSKEY;
    this.region = process.env.REGION;
    this.bucketName = process.env.BUCKETNAME;
  }
}
