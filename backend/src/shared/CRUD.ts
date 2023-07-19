import { Document, Model } from 'mongoose';

export interface Crud<T , DTO> {
    create(s3,uploadParams, data: DTO): Promise<T>
    get(skip,limit)
    getByUuid(skip,limit,item)
    update(_id:string, data:DTO):Promise<T>
    delete(s3,params, _id:string)
}