import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Artist } from './artist.model';
import { ArtistService } from './artist.service';
import { CreteArtistDTO } from './dto/create-artist.dto';
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
  findOne(@Param('id') id: string): Promise<Artist> {
    return this.artistService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() createArtist: CreteArtistDTO): Promise<Artist> {
    return this.artistService.create(createArtist);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.artistService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateArtist: UpdateArtistDto) {
    return this.artistService.update(id, updateArtist);
  }
}
