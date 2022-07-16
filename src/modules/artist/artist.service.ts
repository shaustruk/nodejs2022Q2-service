import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Artist } from './artist.model';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { ArtistDTO } from './dto/artist.dto';
import { AlbumService } from '../album/album.service';

@Injectable()
export class ArtistService {
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

  async create(artistDTO: ArtistDTO) {
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
    ArtistService.artists[index].id = null;
  }

  async update(id: string, updateDTO: ArtistDTO) {
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

    const updatedArtist: Artist = {
      id,
      ...updateDTO,
    };

    ArtistService.artists[artistIndex] = updatedArtist;

    return updatedArtist;
  }
}
