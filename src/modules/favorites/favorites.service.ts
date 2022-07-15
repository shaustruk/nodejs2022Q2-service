import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Favorites } from './favorites.model';
import { validate as valid, v4 as uuidv4 } from 'uuid';

@Injectable()
export class FavoritesService {
  private favorites: Favorites = {
    artists: ([] = []),
    albums: ([] = []),
    tracks: ([] = []),
  };

  async findAll(): Promise<Favorites> {
    return this.favorites;
  }

  //   async create(createFavoritesDTO: CreateFavoritesDTO) {
  //     const id = uuidv4();
  //     const newFavorites: Favorites = {
  //       id,
  //       ...createFavoritesDTO,
  //     };
  //     this.tracks.push(newFavorites);
  //     return newFavorites;
  //   }

  //   async delete(id: string) {
  //     if (!valid(id)) {
  //       throw new BadRequestException("Favorites id isn't valid");
  //     }
  //     const index: number = this.tracks.findIndex((track) => track.id === id);

  //     // -1 is returned when no findIndex() match is found
  //     if (index === -1) {
  //       throw new NotFoundException('Favorites not found');
  //     }
  //     this.tracks.splice(index, 1);
  //   }

  //   async update(id: string, updateDTO: UpdateFavoritesDTO) {
  //     if (!valid(id)) {
  //       throw new BadRequestException("Favorites id isn't valid");
  //     }
  //     const track: Favorites = this.tracks.find((track) => track.id === id);
  //     // -1 is returned when no findIndex() match is found
  //     if (!track) {
  //       throw new NotFoundException('Favorites not found');
  //     }
  //     const trackIndex: number = this.tracks.findIndex(
  //       (track) => track.id === id,
  //     );
  //     track.duration = updateDTO.duration;

  //     return track;
  //   }
  // }
  // function uuidValidate(id: string) {
  //   throw new Error('Function not implemented.');
}
