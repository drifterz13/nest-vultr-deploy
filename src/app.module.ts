import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TasklistsModule } from './tasklists/tasklists.module';

@Module({
  imports: [TasksModule, TasklistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
