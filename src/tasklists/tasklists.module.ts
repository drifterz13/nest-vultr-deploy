import { Module } from '@nestjs/common';
import { TasklistsService } from './tasklists.service';
import { TasklistsController } from './tasklists.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TasklistsController],
  providers: [TasklistsService, PrismaService],
})
export class TasklistsModule {}
