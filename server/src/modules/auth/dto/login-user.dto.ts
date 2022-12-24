import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiTags('/auth')
export class LoginUserDto {
  @ApiProperty({
    description: 'Email',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Password',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
