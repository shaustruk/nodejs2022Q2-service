import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './album.model';
import { validate as valid, v4 as uuidv4 } from 'uuid';
import { AlbumDTO } from './dto/album.dto';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(private readonly artistsService: ArtistService) {}
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

  async create(albumDTO: AlbumDTO) {
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
    AlbumService.albums[index].id = null;
    const artists = this.artistsService.findAll();
  }

  async update(id: string, updateDTO: AlbumDTO) {
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

    const updatedAlbum: Album = {
      id,
      ...updateDTO,
    };

    AlbumService.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }
}
