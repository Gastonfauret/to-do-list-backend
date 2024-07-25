import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) { }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      const task = this.taskRepository.create(createTaskDto);
      await this.taskRepository.save(task)
      return task;
    } catch (error) {
      throw new ForbiddenException('Could not add a new Task')
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.taskRepository.find({ where: {status: true}});
    } catch (error) {
      throw new ForbiddenException('Could not find all Tasks')
    }
  }

  async findOne(taskId: number): Promise<Task> {
    try {
      const foundTask = await this.taskRepository.findOneBy({ taskId })
      if (!foundTask) {
        throw new NotFoundException(`Task with id ${taskId} was not found`)
      }
      return foundTask;
    } catch (error) {
      throw new ForbiddenException(`cound not find Task with the Id ${taskId}`)
    }
  }

  async remove(taskId: number): Promise<void> {
    try {
      const foundTask = await this.taskRepository.findOneBy({ taskId })

      if(!foundTask) {
        throw new NotFoundException(`Task with id ${taskId} was not found`)
      }
      foundTask.status = false
      await this.taskRepository.save(foundTask)
    } catch (error) {
      throw new ForbiddenException(`Could not remove Task with Id ${taskId}`)

    }
  }
}