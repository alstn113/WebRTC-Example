import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/rooms')
export class CallUserDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  offer: RTCSessionDescriptionInit;
}
