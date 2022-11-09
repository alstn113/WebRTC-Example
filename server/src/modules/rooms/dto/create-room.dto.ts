import { IsOptional, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  password: string;
}
