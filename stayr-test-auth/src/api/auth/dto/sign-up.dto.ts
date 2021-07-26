import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsValidPassword } from '../../../utils/validation/is-valid-password.validator';

export class SignUpDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsValidPassword()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  dob: string;
}
