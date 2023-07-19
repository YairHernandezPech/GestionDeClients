import { IsString, IsNumber, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export enum CustomerType {
  Estudiante = 'Estudiante',
  Candidato = 'Candidato',
}

export class ClientsDto {

  @IsNotEmpty()
  readonly name: string
  @IsNotEmpty()
  readonly lastName: string
  @IsNotEmpty()
  readonly address: string
  @IsNotEmpty()
  readonly phone: number
  @IsNotEmpty()
  readonly age: number
  @IsNotEmpty()
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  readonly email: string
  @IsEnum(CustomerType,{message: 'customerType no válido. Los valores aceptados son Estudiante o Candidato',})
  @IsNotEmpty()
  readonly customerType: CustomerType;

}