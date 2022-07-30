import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Album, Prisma } from '@prisma/client';
import { AlbumService } from './album.service';

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
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    return this.albumService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() data: Prisma.AlbumCreateInput): Promise<Album> {
    return this.albumService.create(data);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { name: string; year: number },
  ): Promise<Album> {
    const { name, year } = data;

    return this.albumService.update({
      where: { id },
      data: { name, year },
    });
  }
}
