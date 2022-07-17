import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EntityFavorites, Favorites } from './favorites.model';
import { validate as valid, v4 as uuidv4 } from 'uuid';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavoritesDTO } from './dto/favorites.dto';
import { Track } from '../track/track.model';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private artistsService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  private static favorites: Favorites = {
    artists: ([] = []),
    albums: ([] = []),
    tracks: ([] = []),
  };

  async findAll(): Promise<EntityFavorites> {
    const artists = await this.artistsService.findAll();
    const albums = await this.albumService.findAll();
    const tracks = await this.trackService.findAll();
    return { artists, albums, tracks };
  }

  async createTrack(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    const tracks = this.trackService.findAll();
    const track = (await tracks).find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    FavoritesService.favorites.tracks.push(id);
    return id;
  }

  async createAlbum(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    const albums = this.albumService.findAll();
    const album = (await albums).find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    FavoritesService.favorites.albums.push(id);
    return id;
  }

  async createArtist(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Artist id isn't valid");
    }
    const artists = this.artistsService.findAll();
    const artist = (await artists).find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    FavoritesService.favorites.artists.push(id);
    return id;
  }
  async deleteTrack(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    const index = FavoritesService.favorites.tracks.indexOf(id);
    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Favorites not found');
    }
    FavoritesService.favorites.tracks.splice(index, 1);
  }

  async deleteAlbum(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    const index = FavoritesService.favorites.albums.indexOf(id);
    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    FavoritesService.favorites.albums.splice(index, 1);
  }

  async deleteArtist(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Artist id isn't valid");
    }
    const index = FavoritesService.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }
    FavoritesService.favorites.artists.splice(index, 1);
  }
}
