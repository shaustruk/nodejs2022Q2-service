import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as valid, v4 as uuidv4 } from 'uuid';
import { TrackDTO } from './dto/track.dto';
import { Track } from './track.model';

@Injectable()
export class TrackService {
  private static tracks: Track[] = [];

  async findAll(): Promise<Track[]> {
    return TrackService.tracks;
  }

  async findOne(id: string): Promise<Track> {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    const track: Track = TrackService.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  async create(createTrackDTO: TrackDTO) {
    const id = uuidv4();
    const newTrack: Track = {
      id,
      ...createTrackDTO,
    };
    TrackService.tracks.push(newTrack);
    return newTrack;
  }

  async delete(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    const index: number = TrackService.tracks.findIndex(
      (track) => track.id === id,
    );

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Track not found');
    }
    TrackService.tracks[index].id = null;
  }

  async update(id: string, updateDTO: TrackDTO) {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    const track: Track = TrackService.tracks.find((track) => track.id === id);
    // -1 is returned when no findIndex() match is found
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const trackIndex: number = TrackService.tracks.findIndex(
      (track) => track.id === id,
    );
    track.duration = updateDTO.duration;

    return track;
  }
}
