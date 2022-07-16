import { PartialType } from '@nestjs/swagger';
import { FavoritesDTO } from './favorites.dto';

export class UpdateFavoriteDto extends PartialType(FavoritesDTO) {}
