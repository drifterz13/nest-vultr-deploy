import { Injectable } from '@nestjs/common';
import { omitBy } from 'remeda';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const task = await this.prismaService.task.create({
      data: {
        ...createTaskDto,
        completed: false,
      },
    });

    return task;
  }

  async findAll() {
    return this.prismaService.task.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.task.findUnique({ where: { id } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: { id },
      data: omitBy(updateTaskDto, (value) => value === undefined),
    });
  }

  async remove(id: number) {
    return this.prismaService.task.delete({ where: { id } });
  }
}
