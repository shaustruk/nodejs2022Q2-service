import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate as valid, v4 as uuidv4 } from 'uuid';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTracktDto } from './dto/update-track.dto';
import { Track } from './track.model';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favService: FavoritesService,
  ) {}

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

  async create(createTrackDTO: CreateTrackDTO) {
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
    if (index !== -1) {
      //get all favorites tracks
      this.favService.deleteTrack(id);
      // }
      TrackService.tracks.splice(index, 1);
    } else throw new NotFoundException('Track not found');
  }

  async update(id: string, updateDTO: UpdateTracktDto): Promise<Track> {
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
    const name = updateDTO.name ? updateDTO.name : track.name;
    const duration = updateDTO.duration ? updateDTO.duration : track.duration;
    const albumId = updateDTO.albumId ? updateDTO.albumId : track.albumId;
    const artistId = updateDTO.artistId ? updateDTO.artistId : track.artistId;
    const updateTrack: Track = {
      id,
      name,
      ...updateDTO,
      duration,
      albumId,
      artistId,
    };
    TrackService.tracks[trackIndex] = updateTrack;
    return updateTrack;
  }

  async setArtistIDisNull(id: string) {
    TrackService.tracks = TrackService.tracks.map((track: Track) => {
      return {
        ...track,
        artistId: track.artistId === id ? null : track.artistId,
      };
    });
  }

  async setAlbumIDisNull(id: string) {
    TrackService.tracks = TrackService.tracks.map((track: Track) => {
      return {
        ...track,
        albumId: track.albumId === id ? null : track.albumId,
      };
    });
  }
}
