import { IsNotEmpty } from 'class-validator';

export class FilmDto {
  @IsNotEmpty()
  titleRu: string;

  titleEn: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  shortDescription: string;

  @IsNotEmpty()
  profit: string;

  @IsNotEmpty()
  posters: string[];

  @IsNotEmpty()
  internalRaiting: object;

  @IsNotEmpty()
  externalRainting: object;

  @IsNotEmpty()
  duration: string;

  @IsNotEmpty()
  trailer: string;

  @IsNotEmpty()
  watch: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  geners: string[];

  @IsNotEmpty()
  releaseDate: string;

  @IsNotEmpty()
  images: object;

  @IsNotEmpty()
  countries: string[];
}
