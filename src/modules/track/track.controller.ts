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
import { Prisma, Track } from '@prisma/client';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<Track[]> {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: string): Promise<Track> {
    return this.trackService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createTrack: Prisma.TrackCreateInput): Promise<Track> {
    return this.trackService.create(createTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.trackService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: { name: string; duration: number },
  ): Promise<Track> {
    const { name, duration } = data;
    return this.trackService.update({
      where: { id },
      data: { name, duration },
    });
  }
}
