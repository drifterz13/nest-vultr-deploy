import { PartialType, PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(
  PickType(CreateTaskDto, ['title', 'tasklistId']),
) {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly completed?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  readonly deleted?: boolean;
}
