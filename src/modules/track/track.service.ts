import { Injectable, NotFoundException } from '@nestjs/common';

import { Track, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({
      where: {
        id,
      },
    });
    if (!track) {
      throw new NotFoundException('Track is not found');
    }
    return track;
  }

  async create(data: Prisma.TrackCreateInput): Promise<Track> {
    return this.prisma.track.create({
      data,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.track.delete({
      where: { id },
    });
    // }
    //del almId from tracks
  }

  async update(params: {
    where: Prisma.TrackWhereUniqueInput;
    data: Prisma.TrackUpdateInput;
  }): Promise<Track> {
    const { where, data } = params;
    return this.prisma.track.update({
      data,
      where,
    });
  }

  // async setArtistIDisNull(id: string) {
  //   TrackService.tracks = TrackService.tracks.map((track: Track) => {
  //     return {
  //       ...track,
  //       artistId: track.artistId === id ? null : track.artistId,
  //     };
  //   });
  // }

  // async setAlbumIDisNull(id: string) {
  //   TrackService.tracks = TrackService.tracks.map((track: Track) => {
  //     return {
  //       ...track,
  //       albumId: track.albumId === id ? null : track.albumId,
  //     };
  //   });
  // }
}
