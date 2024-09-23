import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: {
            task: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        tasklistId: 1,
      };
      const expectedTask = { id: 1, ...createTaskDto, completed: false };

      jest
        .spyOn(prismaService.task, 'create')
        .mockResolvedValue(expectedTask as any);

      const result = await service.create(createTaskDto);

      expect(result).toEqual(expectedTask);
      expect(prismaService.task.create).toHaveBeenCalledWith({
        data: { ...createTaskDto, completed: false },
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const expectedTasks = [
        { id: 1, title: 'Task 1' },
        { id: 2, title: 'Task 2' },
      ];

      jest
        .spyOn(prismaService.task, 'findMany')
        .mockResolvedValue(expectedTasks as any);

      const result = await service.findAll();

      expect(result).toEqual(expectedTasks);
      expect(prismaService.task.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a task by id', async () => {
      const taskId = 1;
      const expectedTask = { id: taskId, title: 'Test Task' };

      jest
        .spyOn(prismaService.task, 'findUnique')
        .mockResolvedValue(expectedTask as any);

      const result = await service.findOne(taskId);

      expect(result).toEqual(expectedTask);
      expect(prismaService.task.findUnique).toHaveBeenCalledWith({
        where: { id: taskId },
      });
    });
  });

  describe('update', () => {
    it('should update a task', async () => {
      const taskId = 1;
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task' };
      const expectedTask = { id: taskId, ...updateTaskDto };

      jest
        .spyOn(prismaService.task, 'update')
        .mockResolvedValue(expectedTask as any);

      const result = await service.update(taskId, updateTaskDto);

      expect(result).toEqual(expectedTask);
      expect(prismaService.task.update).toHaveBeenCalledWith({
        where: { id: taskId },
        data: updateTaskDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove a task', async () => {
      const taskId = 1;
      const expectedTask = { id: taskId, title: 'Deleted Task' };

      jest
        .spyOn(prismaService.task, 'delete')
        .mockResolvedValue(expectedTask as any);

      const result = await service.remove(taskId);

      expect(result).toEqual(expectedTask);
      expect(prismaService.task.delete).toHaveBeenCalledWith({
        where: { id: taskId },
      });
    });
  });
});
