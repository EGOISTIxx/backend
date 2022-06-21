import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  username: string;

  userImage: string | null | undefined;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  filmId: string;
}
