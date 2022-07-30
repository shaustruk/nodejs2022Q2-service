import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { Artist } from '@prisma/client';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
    if (!artist) {
      throw new NotFoundException('Artist is not found');
    }
    return artist;
  }

  async create(data: { name: string; grammy: boolean }): Promise<Artist> {
    return this.prisma.artist.create({
      data,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.artist.delete({
      where: { id },
    });
  }

  async update(id: string, dataUpdate: UpdateArtistDto): Promise<Artist> {
    await this.findOne(id);
    // const { name, grammy } = data;
    return await this.prisma.artist.update({
      where: { id },
      data: dataUpdate, /// вот так
    });
  }
}
