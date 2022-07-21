import { PartialType } from '@nestjs/swagger';
import { CreateAlbumDTO } from './album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDTO) {}
