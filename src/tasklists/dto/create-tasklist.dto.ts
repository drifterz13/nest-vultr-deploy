import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTasklistDto {
  @ApiProperty()
  @IsString()
  readonly title: string;
}
