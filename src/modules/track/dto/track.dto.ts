import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateTrackDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly artistId: string | null;

  @IsNotEmpty()
  @IsString()
  readonly albumId: string | null;

  @IsNotEmpty()
  @IsString()
  readonly duration: number;
}

export class UpdateTrackDTO {
  @IsNotEmpty()
  @IsString()
  readonly duration: number;
}
