import validator from "validator";
import TaskService from "../services/task.service";
import { Request, Response } from "express";

interface CreateTaskDto {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface CustomRequest extends Request {
    user?: {
        userID: string
    }
}

class TaskController {
    constructor(private taskService: TaskService) {
        this.taskService = taskService
    }

    /**
     * Creates a new task.
     * @param req - The request object containing task data.
     * @param res - The response object to send the result.
     */
    createTask = async (req: CustomRequest, res: Response) => {
        try {
            const userID = req.user!.userID
            if (!userID) {
                res.status(401).json({ error: "User not authenticated" });
            }

            const {
                title,
                description,
                dueDate,
                completed,
                priority
            } = req.body;

            // Validate required fields
            if (!title || !description) {
                res.status(400).json({ error: "Title and description are required" });
            }
            // Validate date format 
            if (!validator.isDate(dueDate)) {
                res.status(400).json({ "error": "Invalid due date format" })
            }
            const taskData: CreateTaskDto = {
                title,
                description,
                dueDate: dueDate ? new Date(dueDate) : new Date(),
                completed: completed || false,
                priority: priority || 'LOW'
            };

            const newTask = await this.taskService.createTask(taskData, userID);
            res.status(201).json({
                "message": "Task created successfully",
                newTask
            });
        } catch (error) {
            console.error('Create task error:', error);
            res.status(500).json({ error: "Failed to create task" });
        }
    }

    /**
     * Retrieves all tasks for the authenticated user.
     * @param req - The request object.
     * @param res - The response object to send the tasks.
     */
    getAllTasks = async (req: CustomRequest, res: Response) => {
        try {
            const userID = req.user?.userID!
            const limitStr = req.query.limit as string | undefined;
            const offsetStr = req.query.offset as string | undefined;

            const limit = parseInt(limitStr!, 10)
            const offset = parseInt(offsetStr!, 10)

            if (!userID) {
                res.status(401).json({ error: "User not authenticated" });
            }

            const tasks = await this.taskService.listUserTasks(userID, limit, offset);
            res.status(200).json(tasks);
        } catch (error) {
            console.error('Get all tasks error:', error);
            res.status(500).json({ error: "Failed to retrieve tasks" });
        }
    }
    /**
     * Filters all tasks by date range for the authenticated user.
     * @param req - The request object containing the date range.
     * @param res - The response object to send the filtered tasks.
     * 
     */
    getTasksInDateRange = async (req: CustomRequest, res: Response) => {
        try {
            const userID = req.user?.userID!
            if (!userID) {
                res.status(401).json({ error: "User not authenticated" });
            }

            const { fromDate, toDate } = req.query;
            if (!fromDate || !toDate) {
                res.status(400).json({ error: "Both fromDate and toDate are required" });
            }
            if(!validator.isDate(fromDate as string) || !validator.isDate(toDate as string)) {
                res.status(400).json({ error: "Invalid date format" });
            }
            const tasks = await this.taskService.filterTasksByDate(
                fromDate as string,
                toDate as string,
                userID,
                parseInt(req.query.limit as string, 10) || 10,
                parseInt(req.query.page as string, 10) || 1
            );
            res.status(200).json(
                {
                    "message": `Tasks in the range ${fromDate} to ${toDate}`,
                    tasks
                });
        } catch (error) {
            console.error('Get tasks in date range error:', error);
            res.status(500).json({ error: "Failed to retrieve tasks in date range" });
        }
    }
    /**
     * Retrieves a task by its ID.
     * @param req - The request object containing the task ID.
     * @param res - The response object to send the task.
     */
    getTaskById = async (req: CustomRequest, res: Response) => {
        try {
            const userID = req.user!.userID
            if (!userID) {
                res.status(401).json({ error: "User not authenticated" });
            }

            const taskId = req.params.id
            if (!taskId) {
                res.status(400).json({ error: "Task ID is required" });
            }

            const task = await this.taskService.findTaskById(taskId, userID);
            if (!task) {
                res.status(404).json({ error: "Task doesn't exist for the current user" });
            }
            res.status(200).json(task);
        } catch (error) {
            console.error('Get task by ID error:', error);
            res.status(500).json({ error: "Failed to retrieve task" });
        }
    }

    /**
     * Updates a task by its ID.
     * @param req - The request object containing the task ID and updated data.
     * @param res - The response object to send the updated task.
     */
    updateTask = async (req: CustomRequest, res: Response) => {
        try {
            const userID = req.user?.userID!
            if (!userID) {
                res.status(401).json({ error: "User not authenticated" });
            }

            const taskId = req.params.id;
            if (!taskId) {
                res.status(400).json({ error: "Task ID is required" });
            }

            const updateData = req.body as Partial<CreateTaskDto>;

            // Process dueDate if provided
            if (updateData.dueDate) {
                updateData.dueDate = new Date(updateData.dueDate);
            }

            const updatedTask = await this.taskService.updateTask(taskId, userID, updateData);
            if (!updatedTask) {
                res.status(404).json({ error: "Task not found" });
            }
            res.status(200).json(updatedTask);
        } catch (error) {
            console.error('Update task error:', error);
            res.status(500).json({ error: "Failed to update task" });
        }
    }

    /**
     * Deletes a task by its ID.
     * @param req - The request object containing the task ID.
     * @param res - The response object to send the result.
     */
    deleteTask = async (req: CustomRequest, res: Response) => {
        try {
            const userID = req.user?.userID!
            if (!userID) {
                res.status(401).json({ error: "User not authenticated" });
            }

            const taskId = req.params.id;
            if (!taskId) {
                res.status(400).json({ error: "Task ID is required" });
            }

            const deletedTask = await this.taskService.deleteTask(taskId, userID);
            if (!deletedTask) {
                res.status(404).json({ error: "Task not found" });
            }
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            console.error('Delete task error:', error);
            res.status(500).json({ error: "Failed to delete task" });
        }
    }
}

export default TaskController;