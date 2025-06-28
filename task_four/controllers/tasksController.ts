import { Request, Response } from "express";
import mongoose from "mongoose";
import Task from "../models/task";

interface CustomRequest extends Request {
    user: {
        userId: string
    }
}

const createTask = async (req: Request, res: Response) => {
    const customRequest = req as CustomRequest
    const { title, description } = req.body;
    const { userId } = customRequest.user;
    if (!title || !description) {
        res.status(400).json({ "error": "You need to pass title, content and author as part of the request" })
    }

    const newTask = new Task({
        title,
        description,
        creator: userId
    })

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (e: any) {
        console.error(e)
        res.status(500).json({
            "error": "Failed to create new task",
            'reason': e,
        });
    }
}

const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find({}).populate('board')
        if (!tasks) {
            res.status(404).json({ "message": "No tasks found" })
        }
        res.status(200).json(tasks)
    } catch (e: any) {
        console.error(e)
        res.status(500).json({ "error": "Something went wrong in getting all tasks on our end" })
    }
}

const getSpecificTask = async (req: Request, res: Response) => {
    let taskId = req.params.id
    if (!taskId) {
        res.status(400).json({ "error": "You need to pass a taskId as part of the request" })
    }
    try {
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
        res.status(404).json({ "message": "No tasks found" })
    }
    res.status(200).json({ task })
} catch(e: any){
    console.error(e)
    res.status(500).json({"error": "Something went wrong in getting this specific task on our end"})
}

}

const updateTask = async (req: Request, res: Response) => {
    let taskId = req.params.id
    const customReq = req as CustomRequest
    const { userId } = customReq.user;

    const objectId = new mongoose.Types.ObjectId(taskId)
    try {
        const updatedTask = await Task.findByIdAndUpdate(objectId, req.body, { new: true });
        if (!updatedTask) {
            res.status(404).json({ "message": "Task not found" })
        }
        res.status(200).json(updatedTask)
    } catch (e: any) {
        console.log(e)
        res.status(500).json({ error: "Something went wrong in updating your task on our end" });
    }
}

const deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.id

    const objectId = new mongoose.Types.ObjectId(taskId)
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: objectId });
        if (!deletedTask) {
            res.status(404).json({ "message": "Task not found" });
        }
        res.status(200).json({ "message": "Task deleted successfully" });
    } catch (e: any) {
        console.log(e)
        res.status(500).json({ "error": "Something went wrong in deleting your task on our end" })
    }
}

export { createTask, getAllTasks, getSpecificTask, updateTask, deleteTask }