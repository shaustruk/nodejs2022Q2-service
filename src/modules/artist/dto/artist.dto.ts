import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArtistDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly grammy: boolean;
}
