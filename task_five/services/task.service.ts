import { PrismaClient } from "@prisma/client";

interface CreateTaskDto {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    userId: string;
}
// CRUD operations for tasks
class TaskService {
    constructor(private readonly prisma: PrismaClient) { 
        this.prisma = prisma;
    }

    /**
     * Creates a new task in the database.
     * @param data - The data for the new task.
     * @returns The created task object.
     */
    async createTask(data: CreateTaskDto) {
        return this.prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                dueDate: data.dueDate,
                completed: data.completed,
                priority: data.priority,
                user: {
                    connect: { userId: data.userId }
                }
            }
        });
    }

    /**
     * Finds a task by its ID.
     * @param id - The ID of the task to find.
     * @returns The task object if found, otherwise null.
     */
    async findTaskById(id: string, userID: string) {
        return this.prisma.task.findFirst({
            where: { taskId: id},
            include: { user: true },
        });
    }
    
    /**
     * Lists all tasks in the database.
     * @returns An array of task objects.
     */
    async listAllTasks(userID: string) {
        return this.prisma.user.findMany({
            where: { userId: userID },
            include: {
                tasks: {
                    orderBy: { dueDate: 'asc' }, // Sort tasks by due date
                }
            }
        });
    }

    /**
     * Updates a task by its ID.
     * @param id - The ID of the task to update.
     * @param data - The new data for the task.
     * @returns The updated task object.
     */
    // The Partial type allows for updating only some fields of the task (interesting)
    async updateTask(id: string, userID: string, data: Partial<CreateTaskDto>) {
        return this.prisma.task.update({
            where: { taskId: id},
            data: {
                title: data.title,
                description: data.description,
                dueDate: data.dueDate,
                completed: data.completed,
                priority: data.priority,
            }
        });
    }
    /**
     * Deletes a task by its ID.
     * @param id - The ID of the task to delete.
     * @returns The deleted task object.
     */
    async deleteTask(id: string, userID: string) {
        return this.prisma.task.delete({
            where: { taskId: id },
            include: { user: true },
        });
    }
}

export default TaskService;