import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from '../DTO/login.dto';
import { LoginService } from '../service/login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async login(@Res() res, @Body() dto: LoginDto) {
    try {
      const result = await this.loginService.login(dto);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }
}
