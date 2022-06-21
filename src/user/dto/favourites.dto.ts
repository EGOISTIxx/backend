import { IsNotEmpty } from 'class-validator';

export class FavouritesDto {
  @IsNotEmpty()
  filmId: string;
}
