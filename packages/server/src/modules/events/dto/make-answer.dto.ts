import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/rooms')
export class MakeAnswerDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  answer: RTCSessionDescriptionInit;
}
