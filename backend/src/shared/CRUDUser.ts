import { Document, Model } from 'mongoose';

export interface Crud<T extends Document, DTO> {
  create(uuid, data: DTO): Promise<T>;
  get(skip, limit, value): Promise<T[]>;
  getByUuid(param): Promise<T>;
  updateByUuid(uuid: string, data: DTO): Promise<T>;
  deleteByUuid(uuid: string);
}
