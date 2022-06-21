import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import {
  GetCurrentUserId,
  Public,
  GetCurrentUser,
} from 'src/common/decorators';
import { RtGuard, AtGuard } from 'src/common/guards';
import { FavouritesDto, FilmRaitingDto, ProfileDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AtGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  getMe(@GetCurrentUserId() userId: string) {
    return this.userService.getMe(userId);
  }

  @Get('likely')
  @HttpCode(HttpStatus.OK)
  getLikelyFilms(@GetCurrentUserId() userId: string) {
    return this.userService.getLikelyFilms(userId);
  }

  @Get('dislikely')
  @HttpCode(HttpStatus.OK)
  getDislikelyFilms(@GetCurrentUserId() userId: string) {
    return this.userService.getDislikelyFilms(userId);
  }

  @Get('favorite')
  @HttpCode(HttpStatus.OK)
  getFavorites(@GetCurrentUserId() userId: string) {
    return this.userService.getFavorites(userId);
  }

  @Get('comments')
  @HttpCode(HttpStatus.OK)
  getComments(@GetCurrentUserId() userId: string) {
    return this.userService.getComments(userId);
  }

  @UseGuards(AtGuard)
  @Patch('update')
  @HttpCode(HttpStatus.OK)
  editUserProfile(@GetCurrentUserId() userId: string, @Body() dto: ProfileDto) {
    return this.userService.editUserProfile(userId, dto);
  }

  @Post('updateFavourites')
  @HttpCode(HttpStatus.OK)
  updateUserFavourites(
    @GetCurrentUserId() userId: string,
    @Body() dto: FavouritesDto,
  ) {
    return this.userService.updateFavourites(userId, dto);
  }

  @Post('removeFavourite')
  @HttpCode(HttpStatus.OK)
  removeFavourites(
    @GetCurrentUserId() userId: string,
    @Body() dto: FavouritesDto,
  ) {
    return this.userService.removeFavourites(userId, dto);
  }

  @Post('updateFilmRaiting')
  @HttpCode(HttpStatus.OK)
  updateFilmRaiting(
    @GetCurrentUserId() userId: string,
    @Body() dto: FilmRaitingDto,
  ) {
    return this.userService.updateFilmRaiting(userId, dto);
  }
}
