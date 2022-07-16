import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreteArtistDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly grammy: boolean;
}
