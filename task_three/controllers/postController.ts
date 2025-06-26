import { Request, Response } from "express";
import Post from "../models/post";
import mongoose from "mongoose";

const createPosts = async (req: Request, res: Response) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        res.status(400).json({ "error": "You need to pass title, content and author as part of the request" })
    }

    const post = new Post({
        title,
        content,
        author
    });

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ "error": "Failed to create post" });
    }
}

const getAllPosts = async (req: Request, res: Response) => {
    const posts = await Post.find({}).populate('author')
    if (!posts) {
        res.status(404).json({ "message": "No posts found" })
    }
    res.status(200).json(posts)
}

const getSpecificPost = async (req: Request, res: Response) => {
    let postId = req.params.id
    if (!postId) {
        res.status(400).json({ "error": "You need to pass a postId as part of the request" })
    }
    const post = await Post.findOne({ _id: postId })
    if (!post) {
        res.status(404).json({"message": "No posts found" })
    }

    res.status(200).json({ post })

}

const updatePost = async (req: Request, res: Response) => {
    let postId = req.params.id

    // Cast to ObjectId type
    const objectId = new mongoose.Types.ObjectId(postId)

    const updatedPost = await Post.findByIdAndUpdate(objectId, req.body, { new: true });
    if (!updatedPost) {
        res.status(404).json({"message" : "Post not found" })
    }
    res.status(200).json(updatedPost)
}

const deletePost = async (req: Request, res: Response) => {
    const postId = req.params.id

    const objectId = new mongoose.Types.ObjectId(postId)

    const deletedPost = await Post.findOneAndDelete({ _id: objectId });
    if (!deletedPost) {
        res.status(404).json({"message" : "Post not found" });
    }
    res.status(200).json({"message": "Post deleted successfully" });
}

export { createPosts, getAllPosts, getSpecificPost, updatePost, deletePost }