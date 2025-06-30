import { PrismaClient } from "@prisma/client";

interface CreateTaskDto {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    userId: string;
}

class TaskService {
    constructor(private readonly prisma: PrismaClient) {}
    /**
     * Creates a new task in the database.
     * @param data - The data for the new task.
     * @param userId - The ID of the user creating the task.
     * @returns The created task object.
     */
    async createTask(data: Omit<CreateTaskDto, 'userId'>, userId: string) {
        return this.prisma.task.create({
            data: {
                ...data,
                user: { connect: { user_id: userId } }
            }
        });
    }
    /**
       * Finds a task by its ID.
       * @param id - The ID of the task to find.
       * @returns The task object if found, otherwise null.
       */
    async findTaskById(taskId: string, userId: string) {
        return this.prisma.task.findUnique({
            where: {
                task_id: taskId,              
                userId: userId     
            }
        });
    }
    /**
 * Lists all tasks in the database.
 * @returns An array of task objects.
 */
    async listUserTasks(userId: string) {
        return this.prisma.task.findMany({
            where: { userId: userId },
            orderBy: { dueDate: 'asc' }
        });
    }

    /**
         * Updates a task by its ID.
         * @param id - The ID of the task to update.
         * @param data - The new data for the task.
         * @returns The updated task object.
         */
    async updateTask(taskId: string, userId: string, data: Partial<CreateTaskDto>) {
        const task = await this.findTaskById(taskId, userId);
        if (!task) throw new Error("Task not found or access denied");

        return this.prisma.task.update({
            where: {
                 task_id: taskId,
                 userId: userId
            },
            data
        });
    }
    /**
     * Deletes a task by its ID.
     * @param id - The ID of the task to delete.
     * @returns The deleted task object.
     */
    async deleteTask(taskId: string, userId: string) {
        const task = await this.findTaskById(taskId, userId);
        if (!task) throw new Error("Task not found or access denied");

        return this.prisma.task.delete({
            where: { task_id: taskId }
        });
    }
}

export default TaskService;