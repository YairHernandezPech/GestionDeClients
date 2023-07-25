import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SettingDto {
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsEmail()
  readonly newEmail?: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  newPassword: string;
}
