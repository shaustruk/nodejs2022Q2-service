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
import { CreateAlbumDTO } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string): Promise<Album> {
    return this.albumService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createalbum: CreateAlbumDTO): Promise<Album> {
    return this.albumService.create(createalbum);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.albumService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() updatealbum: UpdateAlbumDto,
  ): Promise<Album> {
    return this.albumService.update(id, updatealbum);
  }
}
