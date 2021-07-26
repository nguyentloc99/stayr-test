import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ValidateTokenDTO {
  @ApiProperty()
  @IsNotEmpty()
  token: string;
}
