import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task } from "@prisma/client";

@Controller('tasks')
export class TaskController {

    constructor( private readonly taskService: TaskService ) {}

    @Get()
    async getAllTasks() {
        return await this.taskService.getAllTasks();
    }

    @Get(":id")
    async getTaskById(@Param("id") id: string) {
        const taskFound = await this.taskService.getTaskById(Number(id));
        if (!taskFound) throw new NotFoundException('Task not found')
        return taskFound;
    }

    @Post()
    async createTask(@Body() data: Task) {
        return await this.taskService.createTask(data);
    }

    @Put(":id")
    async updateTask(@Body() data: Task, @Param("id") id: string) {
        try {
            return await this.taskService.updateTask(data, Number(id));
        } catch (error) {
            throw  new NotFoundException("Task does exist");
        }
    }

    @Delete(":id")
    async deleteTask(@Param("id") id: string) {
        try {
            return await this.taskService.deleteTask(Number(id));
        } catch (error) {
            throw  new NotFoundException("Task does exist");
        }
    }

}