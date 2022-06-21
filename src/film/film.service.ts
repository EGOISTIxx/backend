import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/create-comment.dto';
import { FilmDto } from './dto/film.dto';

@Injectable()
export class FilmService {
  constructor(private prisma: PrismaService) {}

  async getFilms() {
    const films = await this.prisma.film.findMany({
      where: {
        type: 'film',
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    return films;
  }

  async getSerials() {
    const serials = await this.prisma.film.findMany({
      where: {
        type: 'serial',
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    return serials;
  }

  async getActorsByFilmId(filmId: string) {
    const filmActors = await this.prisma.film.findUnique({
      where: {
        id: filmId,
      },
    });

    const filmActorsWholeData = filmActors.actors.map(async (actorId) => {
      return await this.prisma.actor.findUnique({
        where: {
          id: actorId,
        },
      });
    });

    return await Promise.all(filmActorsWholeData);
  }

  async createFilm(dto: FilmDto): Promise<any> {
    const film = this.prisma.film.create({
      data: {
        ...dto,
      },
    });

    return film;
  }

  async createComment(dto: CommentDto): Promise<any> {
    const { filmId } = dto;

    const comment = await this.prisma.comment.create({
      data: {
        ...dto,
      },
    });

    const filmComments = await this.prisma.film.findUnique({
      where: {
        id: filmId,
      },
    });

    await this.prisma.film.update({
      where: {
        id: filmId,
      },
      data: {
        comments: [...filmComments.comments, comment.id],
      },
    });

    return comment;
  }

  async getCommentByFilmId(filmId: string) {
    const filmComments = await this.prisma.film.findUnique({
      where: {
        id: filmId,
      },
    });

    const filmCommentWholeData = filmComments.comments.map(
      async (commentId) => {
        return await this.prisma.comment.findUnique({
          where: {
            id: commentId,
          },
        });
      },
    );

    return (await Promise.all(filmCommentWholeData)).sort(
      (a: any, b: any) => b.createdAt - a.createdAt,
    );
  }

  async getSearchedFilm(query: string) {
    const films = await this.prisma.film.findMany({
      where: {
        OR: [
          {
            titleEn: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            titleRu: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        titleRu: true,
        titleEn: true,
        images: true,
        releaseDate: true,
        type: true,
      },
    });

    return films;
  }

  async getFilmById(filmId: string) {
    const film = await this.prisma.film.findUnique({
      where: {
        id: filmId,
      },
    });

    return film;
  }

  async updateFilmInternalRaiting(filmId: string, dto: object) {
    await this.prisma.film.update({
      where: {
        id: filmId,
      },
      data: {
        internalRaiting: dto,
      },
    });

    return await this.prisma.film.findUnique({
      where: {
        id: filmId,
      },
    });
  }

  async getRecentlyAddedFilms() {
    const films = await this.prisma.film.findMany({
      select: {
        titleRu: true,
        titleEn: true,
        createdAt: true,
        shortDescription: true,
        releaseDate: true,
        images: true,
        id: true,
        duration: true,
        externalRainting: true,
        geners: true,
        type: true,
      },
    });

    const recentlyAddedFilms = films.filter(
      (film) =>
        (Number(new Date().getTime()) -
          Number(new Date(film.createdAt).getTime())) /
          (24 * 60 * 60 * 1000) <=
        31,
    );

    return recentlyAddedFilms;
  }

  async mostPopularContentKinopoisk() {
    const films = await this.prisma.film.findMany({
      select: {
        id: true,
        externalRainting: true,
        images: true,
        titleRu: true,
        titleEn: true,
        type: true,
      },
      take: 8,
      where: {
        type: 'film',
      },
    });

    films.sort(
      (a: any, b: any) =>
        b.externalRainting.kinopoisk - a.externalRainting.kinopoisk,
    );

    const serials = await this.prisma.film.findMany({
      select: {
        id: true,
        externalRainting: true,
        images: true,
        titleRu: true,
        titleEn: true,
        type: true,
      },
      take: 8,
      where: {
        type: 'serial',
      },
    });

    serials.sort(
      (a: any, b: any) =>
        b.externalRainting.kinopoisk - a.externalRainting.kinopoisk,
    );

    return {
      films,
      serials,
    };
  }

  async mostPopularContentIMDb() {
    const films = await this.prisma.film.findMany({
      select: {
        id: true,
        externalRainting: true,
        images: true,
        titleRu: true,
        titleEn: true,
        type: true,
      },
      take: 8,
      where: {
        type: 'film',
      },
    });

    films.sort(
      (a: any, b: any) => b.externalRainting.IMDb - a.externalRainting.IMDb,
    );

    const serials = await this.prisma.film.findMany({
      select: {
        id: true,
        externalRainting: true,
        images: true,
        titleRu: true,
        titleEn: true,
        type: true,
      },
      take: 8,
      where: {
        type: 'serial',
      },
    });

    serials.sort(
      (a: any, b: any) => b.externalRainting.IMDb - a.externalRainting.IMDb,
    );

    return {
      films,
      serials,
    };
  }
}
