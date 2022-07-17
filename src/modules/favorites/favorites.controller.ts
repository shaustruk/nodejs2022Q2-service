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
import { FavoritesDTO } from './dto/favorites.dto';
import { EntityFavorites, Favorites } from './favorites.model';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<EntityFavorites> {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  async addIdTrack(@Param('id') id: string) {
    return await this.favoritesService.addIdTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async addIdAlbum(@Param('id') id: string) {
    return await this.favoritesService.addIdAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async addIdArtist(@Param('id') id: string) {
    return await this.favoritesService.addIdArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    return await this.favoritesService.deleteTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    return await this.favoritesService.deleteAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    return await this.favoritesService.deleteArtist(id);
  }
}
