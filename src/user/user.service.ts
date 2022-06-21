import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FavouritesDto, FilmRaitingDto, ProfileDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(user: string) {
    const me = await this.prisma.user.findUnique({
      where: {
        id: user,
      },
    });

    return Object.assign({}, me);
  }

  async editUserProfile(userId: string, dto: ProfileDto) {
    const userProfile = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    return userProfile;
  }

  async updateFavourites(userId: string, dto: FavouritesDto) {
    const userProfile = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favourites: [...userProfile.favourites, dto.filmId],
      },
    });

    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async removeFavourites(userId: string, dto: FavouritesDto) {
    const { favourites } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        favourites: true,
      },
    });

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favourites: {
          set: favourites.filter((filmId) => filmId !== dto.filmId),
        },
      },
    });

    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async updateFilmRaiting(userId: string, dto: FilmRaitingDto) {
    const userProfile = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        changedRaitingFilms: [
          ...userProfile.changedRaitingFilms,
          { filmId: dto.filmId, raiting: dto.raiting },
        ],
      },
    });

    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getLikelyFilms(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const likelyFilms = user.changedRaitingFilms
      .filter(
        (film: { filmId: string; raiting: string }) => film.raiting === 'like',
      )
      .map((film: { filmId: string; raiting: string }) => film.filmId);

    const likedFilms = await this.prisma.film.findMany({
      where: {
        id: {
          in: likelyFilms,
        },
      },
      select: {
        titleEn: true,
        titleRu: true,
        images: true,
        type: true,
        id: true,
      },
    });

    return likedFilms;
  }

  async getDislikelyFilms(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const likelyFilms = user.changedRaitingFilms
      .filter(
        (film: { filmId: string; raiting: string }) =>
          film.raiting === 'dislike',
      )
      .map((film: { filmId: string; raiting: string }) => film.filmId);

    const dislikedFilms = await this.prisma.film.findMany({
      where: {
        id: {
          in: likelyFilms,
        },
      },
      select: {
        titleEn: true,
        titleRu: true,
        images: true,
        type: true,
        id: true,
      },
    });

    return dislikedFilms;
  }

  async getFavorites(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const favorites = await this.prisma.film.findMany({
      where: {
        id: {
          in: user.favourites,
        },
      },
      select: {
        titleEn: true,
        titleRu: true,
        images: true,
        type: true,
        id: true,
      },
    });

    return favorites;
  }

  async getComments(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const comments = await this.prisma.comment.findMany({
      where: {
        username: user.username,
      },
    });

    const newComments = comments.map((comment) => {
      return comment.filmId;
    });

    const commentedContents = await this.prisma.film.findMany({
      where: {
        id: {
          in: newComments,
        },
      },
      select: {
        titleEn: true,
        titleRu: true,
        images: true,
        type: true,
        id: true,
      },
    });

    return commentedContents;
  }
}
