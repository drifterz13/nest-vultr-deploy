import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTasklistDto } from './dto/create-tasklist.dto';
import { UpdateTasklistDto } from './dto/update-tasklist.dto';

@Injectable()
export class TasklistsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTasklistDto: CreateTasklistDto) {
    return this.prismaService.tasklist.create({
      data: {
        title: createTasklistDto.title,
        projectId: createTasklistDto.projectId,
      },
    });
  }

  async findAll() {
    return this.prismaService.tasklist.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.tasklist.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTasklistDto: UpdateTasklistDto) {
    return this.prismaService.tasklist.update({
      where: { id },
      data: { title: updateTasklistDto.title },
    });
  }

  async remove(id: number) {
    return this.prismaService.tasklist.delete({ where: { id } });
  }
}
