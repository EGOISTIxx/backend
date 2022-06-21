import { IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  image: string;
}
