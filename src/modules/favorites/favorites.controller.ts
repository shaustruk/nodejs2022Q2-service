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
import { Favorites } from './favorites.model';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Favorites> {
    return await this.favoritesService.findAll();
  }

  // @Post()
  // @HttpCode(201)
  // async create(@Body() createFavorite: FavoritesDTO): Promise<Favorites> {
  //   return await this.favoritesService.create(createFavorite);
  // }

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
