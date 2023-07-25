import { IsEnum } from 'class-validator';
import { Rol } from '../rol.enum';

export class RolDto {
  @IsEnum(Rol)
  role: Rol;
}
