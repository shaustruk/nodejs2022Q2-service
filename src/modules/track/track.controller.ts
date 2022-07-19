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
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTracktDto } from './dto/update-track.dto';
import { Track } from './track.model';
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
  create(@Body() createTrack: CreateTrackDTO): Promise<Track> {
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
    @Param('id') id: string,
    @Body() updateTrack: UpdateTracktDto,
  ): Promise<Track> {
    return this.trackService.update(id, updateTrack);
  }
}
