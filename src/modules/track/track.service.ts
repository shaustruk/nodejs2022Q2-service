import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as valid, v4 as uuidv4 } from 'uuid';
import { CreateTrackDTO, UpdateTrackDTO } from './dto/track.dto';
import { Track } from './track.model';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findOne(id: string): Promise<Track> {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    const track: Track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async create(createTrackkDTO: CreateTrackDTO) {
    const id = uuidv4();
    const newTrack: Track = {
      id,
      ...createTrackkDTO,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  async delete(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    const index: number = this.tracks.findIndex((track) => track.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Track not found');
    }
    this.tracks.splice(index, 1);
  }

  async update(id: string, updateDTO: UpdateTrackDTO) {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    const track: Track = this.tracks.find((track) => track.id === id);
    // -1 is returned when no findIndex() match is found
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const trackIndex: number = this.tracks.findIndex(
      (track) => track.id === id,
    );
    track.duration = updateDTO.duration;

    return track;
  }
}
function uuidValidate(id: string) {
  throw new Error('Function not implemented.');
}
