import { IsString, IsNumber, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';

export enum CustomerType {
  Student = 'Student',
  Candidate = 'Candidate',
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
  @IsEmail({}, { message: 'The email is invalid.' })
  readonly email: string
  @IsEnum(CustomerType,{message: 'customerType not valid. Accepted values are Student or Candidate',})
  @IsNotEmpty()
  readonly customerType: CustomerType;

}