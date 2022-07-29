import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
  imports: [PrismaModule],
})
export class ArtistModule {}
