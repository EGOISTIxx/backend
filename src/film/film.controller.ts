import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommentDto } from './dto/create-comment.dto';
import { FilmDto } from './dto/film.dto';
import { FilmService } from './film.service';

@Controller('film')
export class FilmController {
  constructor(private filmService: FilmService) {}

  @Get('allFilms')
  @HttpCode(HttpStatus.OK)
  getFilms() {
    return this.filmService.getFilms();
  }

  @Get('allSerials')
  @HttpCode(HttpStatus.OK)
  getSerials() {
    return this.filmService.getSerials();
  }

  @Get('getComments/:id')
  @HttpCode(HttpStatus.OK)
  getCommentsByFilmId(@Param('id') id: string) {
    return this.filmService.getCommentByFilmId(id);
  }

  @Get('getActors/:id')
  @HttpCode(HttpStatus.OK)
  getActorsByFilmId(@Param('id') id: string) {
    return this.filmService.getActorsByFilmId(id);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  getSearchedFilm(@Query('query') query: string) {
    return this.filmService.getSearchedFilm(query);
  }

  @Get('one/:id')
  @HttpCode(HttpStatus.OK)
  getFilmById(@Param('id') id: string) {
    return this.filmService.getFilmById(id);
  }

  @Get('recentlyAdded')
  @HttpCode(HttpStatus.OK)
  getRecentlyAddedFilms() {
    return this.filmService.getRecentlyAddedFilms();
  }

  @Get('find/Kinopoisk')
  @HttpCode(HttpStatus.OK)
  getContentByKinopoisk() {
    return this.filmService.mostPopularContentKinopoisk();
  }

  @Get('find/IMDb')
  @HttpCode(HttpStatus.OK)
  getContentByIMDb() {
    return this.filmService.mostPopularContentIMDb();
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  createFilm(@Body() dto: FilmDto) {
    return this.filmService.createFilm(dto);
  }

  @Post('createComment')
  @HttpCode(HttpStatus.CREATED)
  createComment(@Body() dto: CommentDto) {
    return this.filmService.createComment(dto);
  }

  @Post('update/:id')
  @HttpCode(HttpStatus.OK)
  updateFilmInternalRaiting(@Param('id') id: string, @Body() dto: object) {
    return this.filmService.updateFilmInternalRaiting(id, dto);
  }
}
