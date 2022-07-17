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

  private static favoritesShow: EntityFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };
  async findAll(): Promise<EntityFavorites> {
    return FavoritesService.favoritesShow;
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
    FavoritesService.favoritesShow.tracks.push(track);
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
    FavoritesService.favoritesShow.albums.push(album);
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
    FavoritesService.favoritesShow.artists.push(artist);
    console.log(FavoritesService.favorites.artists);
    return id;
  }

  async deleteTrack(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Track id isn't valid");
    }
    let index = FavoritesService.favoritesShow.tracks.findIndex(
      (el) => el.id === id,
    );

    // -1 is returned when no findIndex() match is found
    if (!index) {
      throw new NotFoundException('Favorites not found');
    }
    FavoritesService.favoritesShow.tracks.splice(index, 1);
    FavoritesService.favorites.tracks =
      FavoritesService.favorites.tracks.filter((el) => el !== id);
    console.log(FavoritesService.favorites);
  }

  async deleteAlbum(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    let index = FavoritesService.favoritesShow.albums.findIndex(
      (el) => el.id === id,
    );
    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    FavoritesService.favoritesShow.albums.splice(index, 1);
    FavoritesService.favorites.albums =
      FavoritesService.favorites.albums.filter((el) => el !== id);
  }

  async deleteArtist(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Artist id isn't valid");
    }
    let index = FavoritesService.favoritesShow.artists.findIndex(
      (el) => el.id === id,
    );
    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Artist not found');
    }
    FavoritesService.favoritesShow.artists.splice(index, 1);
    FavoritesService.favorites.artists =
      FavoritesService.favorites.artists.filter((el) => el !== id);
  }
}
