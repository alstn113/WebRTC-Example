import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/rooms')
export class SendMessageToLobbyDto {
  @ApiProperty({
    type: String,
    description: 'Message to send',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
