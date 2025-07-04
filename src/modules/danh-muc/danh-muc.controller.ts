import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DanhMucService } from './danh-muc.service';
import { CreateDanhMucDto } from './dto/create-danh_muc.dto';
import { UpdateDanhMucDto } from './dto/update-danh_muc.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('danh-muc')
export class DanhMucController {
  constructor(private readonly danhMucService: DanhMucService) {}

  @Post()
  create(@Body() createDanhMucDto: CreateDanhMucDto) {
    return this.danhMucService.create(createDanhMucDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.danhMucService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.danhMucService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDanhMucDto: UpdateDanhMucDto) {
    return this.danhMucService.update(+id, updateDanhMucDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.danhMucService.remove(+id);
  }
}
