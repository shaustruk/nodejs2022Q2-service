import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Album } from './album.model';
import { AlbumService } from './album.service';
import { AlbumDTO } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Album[]> {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<Album> {
    return await this.albumService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createalbum: AlbumDTO): Promise<Album> {
    return await this.albumService.create(createalbum);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.albumService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updatealbum: AlbumDTO) {
    return await this.albumService.update(id, updatealbum);
  }
}
