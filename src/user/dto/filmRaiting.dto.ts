import { IsNotEmpty } from 'class-validator';

export class FilmRaitingDto {
  @IsNotEmpty()
  filmId: string;

  @IsNotEmpty()
  raiting: string;
}
