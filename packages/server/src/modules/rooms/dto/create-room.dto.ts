import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/rooms')
export class CreateRoomDto {
  @ApiProperty({
    type: String,
    description: 'The name of the room',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    description: 'The description of the room',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
