import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TrackDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsUUID()
  @IsString()
  readonly artistId: string | null;

  @IsOptional()
  @IsUUID()
  @IsString()
  readonly albumId: string | null;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  readonly duration: number;
}
