import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/room')
export class MediaStateChangeDto {
  @ApiProperty({
    type: String,
    description: 'Room Id',
  })
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  uid: number;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsBoolean()
  enable: boolean;
}
