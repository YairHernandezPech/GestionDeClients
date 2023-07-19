import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class UsersDto {
    
    
    @IsNotEmpty()
    readonly nombre: string
    @IsNotEmpty()
    readonly apellido: string

}
