import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TasklistsModule } from './tasklists/tasklists.module';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    TasksModule,
    TasklistsModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.json(),
        }),
        new winston.transports.File({
          filename: '/app/log/api.log',
          format: winston.format.json(),
        }),
      ],
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.metadata({
          fillWith: ['service', 'environment', 'requestId', 'method', 'url'],
        }),
        winston.format.json(),
      ),
      defaultMeta: {
        service: 'api',
        environment: 'development',
      },
    }),
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // eslint-disable-next-line @typescript-eslint/ban-types
      .apply((req: Request, res: Response, next: Function) => {
        req['requestId'] = uuidv4();
        next();
      })
      .forRoutes('*');
  }
}
