import { PartialType } from '@nestjs/swagger';
import { CreteArtistDTO } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreteArtistDTO) {}
