const router = require('express').Router();
const {Category} = require('../models/index');
const ApiResponse = require('../utils/ApiResponse');

router.post("/add",async (req,res)=>{
    try{
        const category = await Category.create(req.body);       
        res.json(new ApiResponse(true,"Category added successfully",category,null));
    }  
    catch(err){
        res.json(new ApiResponse(false,"Error adding category",null,err.message));
    }   
});

router.get("/categorylist",async (req,res)=>{
    try{
        const categories = await Category.findAll();
        res.json(new ApiResponse(true,"Category list fetched successfully",categories,null));
    }   
    catch(err){
        res.json(new ApiResponse(false,"Error fetching category list",null,err.message));
    }       
}); 

router.put("/update/:id",async (req,res)=>{ 
    const id = req.params.id;
    const obj = await Category.findByPk(id);
    if(obj == null){
        res.json(new ApiResponse(false,"Category not found",null,err));
    }
    else{
       const [updated] = await Category.update(req.body,{where : {id:id}} );
       if(updated){
          const updated_obj = await Category.findByPk(id);
          res.json(new ApiResponse(true,"Category updated successfully",updated_obj,null));
       }
       else{
         res.json(new ApiResponse(false,"Error updating category",null,err));
       }
    }
});

module.exports = router;