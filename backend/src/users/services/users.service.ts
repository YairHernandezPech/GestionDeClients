import { Injectable } from '@nestjs/common';
import { UsersDto } from "../DTO/createDTO"

import { UsersRepository } from "../repository/users.repository"

@Injectable()
export class UsersService {

    constructor(
        private readonly usersRepository: UsersRepository
    ) { }


    async create(obj: UsersDto): Promise<any> {
        try {
            console.log(obj)
            console.log("-------------entro al servicio")
            const newUsers = await this.usersRepository.create(obj)
            console.log("Esta es la respuesta")
            console.log(newUsers)
            return newUsers
        }
        catch (err) {
            console.log(err)
        }

    }

}
