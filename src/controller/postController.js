import express from "express";
import { Blog } from "../model/blog.js";

const router = express.Router();
router.use(express.json());



router.get("/api/posts",async(req,res)=>{
    const term = req.query.term;
    res.status(200).send("OK");
})

router.get("/api/posts/:id",async (req,res)=>{
    const id = req.params.id;
    const blogData = await Blog.getBlogById(id);
    if(blogData.isExist){
        res.status(200).send(blogData["blogData"]);
    }else{
        res.status(404).send(`Data with id ${id} not found`);
    }
});

router.post("/api/posts",async (req,res)=>{
    const createBlog = await Blog.createBlog(req.body);
    if(createBlog.isSuccess){
        res.status(200).send(createBlog["blogData"]);
    }else{
        res.status(400).send(createBlog["errMsg"])
    }  
})

router.put("/api/posts/:id",async (req,res)=>{
    const id = req.params.id;
    const updateData = await Blog.getBlogById(id);
    if(updateData.isExist){
        const createBlog = await Blog.createBlog(updateData["blogData"]);
        if(createBlog.isSuccess){
            res.status(200).send(createBlog["blogData"]);
        }else{
            res.status(400).send(createBlog["errMsg"])
        }
    }else{
        res.status(404).send(`Data with id ${id} not found`);
    }
})

router.delete("/api/posts/:id",async(req,res)=>{
    const id = req.params.id;
    if(await Blog.deleteBlog(id)){
        res.sendStatus(204);
    }else{
        res.status(404).send(`Data with id ${id} not found`);
    };
})

export default router;
