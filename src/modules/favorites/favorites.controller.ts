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
  async createTrack(@Param('id') id: string) {
    return await this.favoritesService.createTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  async createAlbum(@Param('id') id: string) {
    return await this.favoritesService.createAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  async createArtist(@Param('id') id: string) {
    return await this.favoritesService.createArtist(id);
  }
  // @Delete(':id')
  // @HttpCode(204)
  // async delete(@Param('id') id: string) {
  //   return await this.favoritesService.delete(id);
  // }

  // @Put(':id')
  // @HttpCode(200)
  // async update(@Param('id') id: string, @Body() updateFavorite: FavoritesDTO) {
  //   return await this.favoritesService.update(id, updateFavorite);
  // }
}
