import { Body, Controller, Post, Res } from '@nestjs/common';
import { UsersDto } from '../DTO/createDTO'
import { UsersService } from '../services/users.service'
@Controller('users')
export class UsersController {

    constructor(private readonly usersServices: UsersService) {
    }
    
    @Post()
    async users(@Body() createDto: UsersDto) {
        try {
            console.log("entro")
            console.log(createDto)
            let data = await this.usersServices.create(createDto)
            console.log("infomracionnnnnnn")
            console.log(data)

        } catch (error) {

        }
    }


}
