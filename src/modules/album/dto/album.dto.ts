import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AlbumDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year: number;

  @IsNotEmpty()
  @IsString()
  readonly artistId: string;
}
