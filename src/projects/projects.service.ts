import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createProjectDto: CreateProjectDto) {
    return this.prismaService.project.create({ data: createProjectDto });
  }

  findAll() {
    return this.prismaService.project.findMany();
  }

  findOne(id: number) {
    return this.prismaService.project.findUnique({ where: { id } });
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prismaService.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  remove(id: number) {
    return this.prismaService.project.delete({ where: { id } });
  }
}
