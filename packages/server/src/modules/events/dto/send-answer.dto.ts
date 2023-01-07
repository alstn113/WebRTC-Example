import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/rooms')
export class SendAnswerDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  answer: RTCSessionDescriptionInit;
}
