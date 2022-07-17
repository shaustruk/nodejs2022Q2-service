import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';

export class FavoritesDTO {
  @IsNotEmpty()
  @IsArray()
  readonly artists: [string];

  @IsNotEmpty()
  @IsArray()
  readonly albums: [string];

  @IsNotEmpty()
  @IsArray()
  readonly tracks: [string];
}
