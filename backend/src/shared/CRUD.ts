import { Document, Model } from 'mongoose';

export interface Crud<T , DTO> {
    create(uuid,data: DTO): Promise<T>
    get(skip,limit,item)
    getByUuid(uuid:string)
    update(_id:string, data:DTO):Promise<T>
    delete(_id:string,uuid)
}