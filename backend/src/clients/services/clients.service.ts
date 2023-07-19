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

    async findAll(page, limit): Promise<any[]> {
        try {
            const skip = (page - 1) * limit;
            const client = await this.clientsRepository.get(skip,limit)
            const sortedClients = orderClient(client);
            return sortedClients;

        } catch (error) {
            console.log(error)
        }
    }

    async searchClient(page,limit, valor): Promise<any[]> {
        try {
            const skip = (page - 1) * limit;
            const item = createSearchItem(valor);
            const client = await this.clientsRepository.getByUuid(skip,limit,item)
            return client;

        } catch (error) {
            console.log(error)
        }
    }

    async update(_id, obj: ClientsDto): Promise<any> {
        try {
            const updateClient = await this.clientsRepository.update(_id, obj)
            return updateClient;

        } catch (error) {
            console.log(error)
        }
    }
    async delete(_id): Promise<any> {
        try {
            const client = await this.clientsRepository.delete(_id)
            return client;
        } catch (error) {
            console.log(error)
        }
    }
}
