import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EntityFavorites, Favorites } from './favorites.model';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  findAll(): Promise<EntityFavorites> {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  addIdTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addIdTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  addIdAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addIdAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  addIdArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addIdArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteArtist(id);
  }
}
