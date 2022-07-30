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
import { Artist } from '@prisma/client';
import { ArtistService } from './artist.service';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this.artistService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(
    @Body()
    data: {
      name: string;
      grammy: boolean;
    },
  ): Promise<Artist> {
    const { name, grammy } = data;
    return this.artistService.create({ name, grammy });
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.delete(id);
  }
  @Put(':id')
  @HttpCode(200)
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body()
    dataUpdate: UpdateArtistDto,
  ): Promise<Artist> {
    return this.artistService.update(id, dataUpdate);
  }
}
