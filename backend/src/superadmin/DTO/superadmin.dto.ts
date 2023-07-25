import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Rol } from 'src/rol/rol.enum';

export enum Department {
  AGENCY = 'agency',
  ACADEMY = 'academy',
}
export class SuperadminDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly telephone: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(Department)
  department: Department;

  @IsNotEmpty()
  password: string;

  roles: Rol[];
}
