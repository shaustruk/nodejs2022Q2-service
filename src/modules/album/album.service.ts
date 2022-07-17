import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './album.model';
import { validate as valid, v4 as uuidv4 } from 'uuid';
import { CreateAlbumDTO } from './dto/album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService,
  ) {}

  private static albums: Album[] = [];

  async findAll(): Promise<Album[]> {
    return AlbumService.albums;
  }

  async findOne(id: string): Promise<Album> {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    const album: Album = AlbumService.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    console.log(album);
    return album;
  }

  async create(albumDTO: CreateAlbumDTO) {
    const id = uuidv4();
    const newAlbum: Album = {
      id,
      ...albumDTO,
    };
    AlbumService.albums.push(newAlbum);
    return newAlbum;
  }

  async delete(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    const index: number = AlbumService.albums.findIndex(
      (album) => album.id === id,
    );

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    AlbumService.albums.splice(index, 1);

    //del album from favAlbums
    const favoritesAlbums = this.favoritesService.findAll(),
      favAlbums = (await favoritesAlbums).albums,
      indexDelAlb = favAlbums.findIndex((el) => {
        el.id === id;
      });
    favAlbums.splice(indexDelAlb, 1);

    //del almId from tracks
    this.trackService.setAlbumIDisNull(id);
  }

  async update(id: string, updateDTO: UpdateAlbumDto) {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    const album: Album = AlbumService.albums.find((album) => album.id === id);
    // -1 is returned when no findIndex() match is found
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const albumIndex: number = AlbumService.albums.findIndex(
      (album) => album.id === id,
    );
    const name = updateDTO.name ? updateDTO.name : album.name;
    const year = updateDTO.year ? updateDTO.year : album.year;
    const artistId = updateDTO.artistId ? updateDTO.artistId : album.artistId;
    const updatedAlbum: Album = {
      id,
      name,
      year,
      ...updateDTO,
      artistId,
    };

    AlbumService.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }
}
