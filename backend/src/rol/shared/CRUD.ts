import { Document, Model } from 'mongoose';

export interface Crud<T extends Document, DTO> {
  create(newRol: DTO): Promise<T>;
  get(): Promise<T[]>;
  getOne(role: DTO): Promise<T>;
  deleteByUuid(uuid: string);
}
