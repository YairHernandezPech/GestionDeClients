import { Injectable } from '@nestjs/common';
import { ClientsDto } from "../DTO/createDTO";
import { ClientsRepository } from "../repository/clients.repository";
import { createSearchItem } from "../../utils/buscador";
import { orderClient } from "../../utils/order";


@Injectable()
export class ClientsService {

    constructor(private readonly clientsRepository: ClientsRepository) { }

    async create(obj: ClientsDto): Promise<any> {
        try {
            const newClient = await this.clientsRepository.create(obj)
            return newClient
        }
        catch (err) {
            console.log(err)
            throw err;
        }
    }

    async findAll(page, limit, valor): Promise<any[]> {
        try {
            const skip = (page - 1) * limit;
            const item = createSearchItem(valor);
            const client = await this.clientsRepository.get(skip,limit,item)
            const sortedClients = orderClient(client);
            return sortedClients;

        } catch (error) {
            console.log(error)
            throw new Error('Failed to Get');
        }
    }


    async update(uuid, obj: ClientsDto): Promise<any> {
        try {
            const updateClient = await this.clientsRepository.update(uuid, obj)
            return updateClient;

        } catch (error) {
            console.log(error)
            throw new Error('Failed to update');
        }
    }
    async delete(uuid): Promise<any> {
        try {
            const client = await this.clientsRepository.delete(uuid)
            return client;
        } catch (error) {
            console.log(error)
            throw new Error('Failed to delete');
        }
    }
}
