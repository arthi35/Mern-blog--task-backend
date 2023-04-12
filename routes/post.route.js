const express=require('express');
const Posts = require('../model/post.model');
const router=express.Router();

//get all post
router.get('/posts',(req,res)=>{
Posts.find((err,data)=>{
    try{
        if(err){
          return  res.status(400).send({message:"Error while retrieving post details"})
        }
        return res.status(200).send(data);
    }catch(error){
res.status(500).send({message:"Internal Server Error"})
    }
    
})
});

//get single post detail

router.get('/posts/:postID',(req,res)=>{
    try{
 Posts.findOne({_id:req.params.postID},(err,data)=>{
        if(err){
            return res.status(400).send({message:"Error while retreiving post details"})
        }
        return res.status(200).send(data)
    })
    }catch(error){
res.status(500).send({message:"Internal Server Error"})
    }
   
})

//to add a new post
router.post('/posts',(req,res)=>{
try{
const data=req.body;
const post=new Posts(data)
post.save((err,data)=>{
    if(err){
        return res.status(400).send({message:"Error while creating new post"})
    }
    return res.status(201).send({id:data._id,message:"Post have been created successfully"})
})
}catch(error){
    res.status(500).send({message:"Internal Server Error"})
}
});

//to update an existing post
router.put('/posts/:postID', (req, res) => {
    try{
        const pstID = req.params.postID;
        Posts.findByIdAndUpdate({_id: pstID}, {$set: req.body}, (err, data) =>{
            if(err){
                return res.status(400).send({message: 'Error while updating an post.'});
            }

            return res.status(201).send({id: data._id, message: 'Posts details have been updated successfully.'})
        })

    }catch(error){
        res.status(500).send({message: 'Internal Server Error'});
    }
});



router.delete('/posts/:postID',(req,res)=>{
    try{
        const pstID=req.params.postID;
Posts.deleteOne({_id:pstID},(err,data)=>{
    if(err){
        return res.status(400).send({message:"Error while deleting post"})
    }
    return res.status(200).send({message:"Post details have been deleted successfully"})
})
    }catch(error){
return res.status(500).send({message:"Internal Server Error"})
    }
})

module.exports=router;