import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../login/guards/jwt.guard';
import { SettingDto } from '../DTO/setting.dto';
import { SettingService } from '../service/setting.service';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSetting(@Request() req) {
    try {
      const { email } = req.user;
      const setting = await this.settingService.getSetting(email);
      return setting;
    } catch (error) {
      throw new Error('Error At Obtener The Setting');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateSetting(@Request() req, @Body() dto: SettingDto) {
    try {
      const { email } = req.user;
      await this.settingService.updateSetting(email, dto);
      return { message: 'Personal info updated successfully' };
    } catch (error) {
      throw new Error('Error At Updating The Setting');
    }
  }
}
