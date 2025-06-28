import { Request, Response } from "express";
import mongoose from "mongoose";
import Board from "../models/board";
import Task from "../models/task";

interface CustomRequest extends Request {
    user: {
        userId: string
    }
}

const createBoard = async (req: Request, res: Response) => {
    const customRequest = req as CustomRequest
    const { title, description } = req.body;
    const { userId } = customRequest.user;
    if (!title || !description) {
        res.status(400).json({ "error": "You need to pass title, content and author as part of the request" })
    }

    const newBoard = new Board({
        title,
        description,
        creator: userId
    });

    try {
        const savedBoard = await newBoard.save();
        res.status(201).json(savedBoard);
    } catch (error) {
        res.status(500).json({ "error": "Failed to create new board" });
    }
}

const getAllBoards = async (req: Request, res: Response) => {
    try {
    const boards = await Board.find({}).populate('tasks')
    if (boards.length === 0) {
        res.status(404).json({ message: "No boards found" });
      }
    res.status(200).json(boards)
    } catch(e: any){
        console.log(e)
        res.status(500).json(
            {"message": "Something went really wrong on our end trying get all boards", 
            "status": "failure",
            "error": e, 
            })
    }
}

const getSpecificBoard = async (req: Request, res: Response) => {
    let boardId = req.params.id
    if (!boardId) {
        res.status(400).json({ "error": "You need to pass a boardId as part of the request" })
    }
    const board = await Board.findOne({ _id: boardId })
    if (!board) {
        res.status(404).json({"message": "No boards found" })
    }

    res.status(200).json({ board })

}

const updateBoard = async (req: Request, res: Response) => {
    let boardId = req.params.id
    const customReq = req as CustomRequest
    const { userId } = customReq.user;

    // Cast to ObjectId type
    const objectId = new mongoose.Types.ObjectId(boardId)
    // Make sure only the creator can update the board
    const updatedBoard = await Board.findByIdAndUpdate(objectId, req.body, { new: true });
    if (!updatedBoard) {
        res.status(404).json({"message" : "Board not found" })
    }
    res.status(200).json(updatedBoard)
}

const deleteBoard = async (req: Request, res: Response) => {
    const boardId = req.params.id

    const objectId = new mongoose.Types.ObjectId(boardId)

    const deletedBoard = await Board.findOneAndDelete({ _id: objectId });
    if (!deletedBoard) {
        res.status(404).json({"message" : "Board not found" });
    }
    res.status(200).json({"message": "Board deleted successfully" });
}

export { createBoard, getAllBoards, getSpecificBoard, updateBoard, deleteBoard }