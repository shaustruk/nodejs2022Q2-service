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
import { CreateUserDto, UpdateUserDto } from '../user/dto/user.dto';
import { User } from '../user/user.model';
import { CreateTrackDTO, UpdateTrackDTO } from './dto/track.dto';
import { Track } from './track.model';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Track[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<Track> {
    return await this.trackService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createTrack: CreateTrackDTO): Promise<Track> {
    return await this.trackService.create(createTrack);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.trackService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  async update(@Param('id') id: string, @Body() updateTrack: UpdateTrackDTO) {
    return await this.trackService.update(id, updateTrack);
  }
}
