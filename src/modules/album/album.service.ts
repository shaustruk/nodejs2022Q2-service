import { Injectable, NotFoundException } from '@nestjs/common';
import { Album, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({
      where: {
        id,
      },
    });
    if (!album) {
      throw new NotFoundException('Album is not found');
    }
    return album;
  }

  async create(data: Prisma.AlbumCreateInput): Promise<Album> {
    // const { name, year } = data;
    return this.prisma.album.create({
      data,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.prisma.album.delete({
      where: { id },
    });
  }

  async update(params: {
    where: Prisma.AlbumWhereUniqueInput;
    data: Prisma.AlbumUpdateInput;
  }): Promise<Album> {
    const { where, data } = params;
    return this.prisma.album.update({
      data,
      where,
    });
  }
}
