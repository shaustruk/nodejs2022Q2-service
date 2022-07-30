import { PartialType } from '@nestjs/swagger';
import { CreateTrackDTO } from './create-track.dto';

export class UpdateTracktDto extends PartialType(CreateTrackDTO) {}
