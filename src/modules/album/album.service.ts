import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './album.model';
import { validate as valid, v4 as uuidv4 } from 'uuid';
import { AlbumDTO } from './dto/album.dto';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findOne(id: string): Promise<Album> {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    const album: Album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async create(albumDTO: AlbumDTO) {
    const id = uuidv4();
    const newAlbum: Album = {
      id,
      ...albumDTO,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async delete(id: string) {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    const index: number = this.albums.findIndex((album) => album.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('Album not found');
    }
    this.albums.splice(index, 1);
  }

  async update(id: string, updateDTO: AlbumDTO) {
    if (!valid(id)) {
      throw new BadRequestException("Album id isn't valid");
    }
    const album: Album = this.albums.find((album) => album.id === id);
    // -1 is returned when no findIndex() match is found
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    const albumIndex: number = this.albums.findIndex(
      (album) => album.id === id,
    );

    const updatedAlbum: Album = {
      id,
      ...updateDTO,
    };

    this.albums[albumIndex] = updatedAlbum;

    return updatedAlbum;
  }
}
function uuidValidate(id: string) {
  throw new Error('Function not implemented.');
}
