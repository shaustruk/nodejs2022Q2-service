import { Module } from '@nestjs/common';
import { ArtistModule } from '../artist/artist.module';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, TrackService],
})
export class AlbumModule {}
