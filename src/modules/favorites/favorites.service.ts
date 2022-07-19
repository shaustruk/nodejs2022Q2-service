import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EntityFavorites, Favorites } from './favorites.model';
import { validate as valid } from 'uuid';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { Artist } from '../artist/artist.model';
import { Track } from '../track/track.model';
import { Album } from '../album/album.model';

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
    artists: [],
    albums: [],
    tracks: [],
  };

  async findAll(): Promise<EntityFavorites> {
    const tracks: Track[] = await Promise.all(
      FavoritesService.favorites.tracks.map((trackId) =>
        this.trackService.findOne(trackId),
      ),
    );

    const albums: Album[] = await Promise.all(
      FavoritesService.favorites.albums.map((albumId) =>
        this.albumService.findOne(albumId),
      ),
    );
    const artists: Artist[] = await Promise.all(
      FavoritesService.favorites.artists.map((artistId) =>
        this.artistsService.findOne(artistId),
      ),
    );
    return { artists, albums, tracks };
  }

  async addIdTrack(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    const tracks = await this.trackService.findAll();
    const track = tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    FavoritesService.favorites.tracks.push(id);

    console.log(FavoritesService.favorites.tracks);
    return id;
  }

  async addIdAlbum(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    const albums = await this.albumService.findAll();
    const album = albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }
    FavoritesService.favorites.albums.push(id);

    console.log(FavoritesService.favorites.albums);
    return id;
  }

  async addIdArtist(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Artist id isn't valid");
    }
    const artists = await this.artistsService.findAll();
    const artist = artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }
    FavoritesService.favorites.artists.push(id);

    console.log(FavoritesService.favorites.artists);
    return id;
  }

  async deleteTrack(id: string): Promise<void> {
    FavoritesService.favorites.tracks =
      FavoritesService.favorites.tracks.filter((el) => {
        el !== id;
      });
    console.log(FavoritesService.favorites.tracks, ' tracks');
  }

  async deleteAlbum(id: string): Promise<void> {
    FavoritesService.favorites.albums =
      FavoritesService.favorites.albums.filter((el) => {
        el !== id;
      });
    console.log(FavoritesService.favorites.tracks, 'album');
  }

  async deleteArtist(id: string) {
    FavoritesService.favorites.artists =
      FavoritesService.favorites.artists.filter((el) => {
        el !== id;
      });
    console.log(FavoritesService.favorites.tracks, 'artist');
  }
}
