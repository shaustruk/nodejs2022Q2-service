import { Module } from '@nestjs/common';
import { ArtistService } from '../artist/artist.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TrackService } from '../track/track.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService, FavoritesService, ArtistService],
})
export class AlbumModule {}
