import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  socialId: string;

  @ApiProperty()
  provider: string;
}
