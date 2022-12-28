import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/users')
export class CreateOAuthUserDto {
  @ApiProperty({
    type: String,
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Provider name',
  })
  @IsString()
  @IsNotEmpty()
  provider: string;

  @ApiProperty({
    type: String,
    description: 'Provider id',
  })
  @IsString()
  @IsNotEmpty()
  socialId: string;
}
