import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from './artist.model';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { CreteArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoriteService: FavoritesService,
  ) {}

  private static artists: Artist[] = [];
  private grammy: boolean;

  async findAll(): Promise<Artist[]> {
    return ArtistService.artists;
  }

  async findOne(id: string): Promise<Artist> {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist id isn't valid");
    }
    const artist: Artist = ArtistService.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async create(artistDTO: CreteArtistDTO) {
    const id = uuidv4();
    const newArtist: Artist = {
      id,
      ...artistDTO,
    };
    ArtistService.artists.push(newArtist);
    return newArtist;
  }

  async delete(id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist id isn't valid");
    }
    const index: number = ArtistService.artists.findIndex(
      (artist) => artist.id === id,
    );

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }
    ArtistService.artists.splice(index, 1);

    //get arr of albums
    const albums = this.albumService.findAll();
    const tracks = this.trackService.findAll();
    //get needed album
    const album = (await albums).find(({ artistId }) => {
      artistId === id;
    });
    const track = (await tracks).find(({ artistId }) => {
      artistId === id;
    });
    if (album) {
      await this.albumService.update(album.id, { artistId: null });
    }
    if (track) {
      await this.trackService.update(track.id, { artistId: null });
    }
  }

  async update(id: string, updateDTO: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("Artist id isn't valid");
    }
    const artist: Artist = ArtistService.artists.find(
      (artist) => artist.id === id,
    );
    // -1 is returned when no findIndex() match is found
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    const artistIndex: number = ArtistService.artists.findIndex(
      (art) => art.id === id,
    );

    const updatedArtist: any = {
      id,
      ...updateDTO,
    };

    ArtistService.artists[artistIndex] = updatedArtist;

    return updatedArtist;
  }
}
