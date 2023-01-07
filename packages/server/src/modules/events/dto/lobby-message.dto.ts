import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ApiTags('/socket/room')
export class LobbyMessageDto {
  @ApiProperty({
    type: String,
    description: 'Message to send',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    type: Function,
    description: 'callback function',
  })
  @IsOptional()
  done: any;
}
