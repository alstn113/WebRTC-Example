import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/socket/room')
export class SendOfferDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNotEmpty()
  offer: RTCSessionDescriptionInit;
}
