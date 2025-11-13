const router = require('express').Router();
const ApiResponse = require('../utils/ApiResponse');
const {Brand} = require('../models/index');

router.post("/add",async (req,res)=>{
    try{
        const brand = await Brand.create(req.body);
        res.json(new ApiResponse(true,"Brand added successfully",brand,null));
    }  
    catch(err){
        res.json(new ApiResponse(false,"Error adding brand",null,err.message));
    }   
}); 

router.get("/brandlist",async (req,res)=>{
    try{
        const brands = await Brand.findAll();
        res.json(new ApiResponse(true,"Brand list fetched successfully",brands,null));
    }   
    catch(err){
        res.json(new ApiResponse(false,"Error fetching brand list",null,err.message));
    }       
});

router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const brand = await Brand.findByPk(id);
    if (brand == null) {
      return res.json(new ApiResponse(false, "Brand not found", null, null));
    }
    else{
        const [updated] = await Brand.update(req.body, { where: { id: req.params.id } });
        if (updated) {
            const updatedBrand = await Brand.findByPk(req.params.id);
            return res.json(new ApiResponse(true, "Brand updated successfully", updatedBrand, null));
        }
        else{
            res.json(new ApiResponse(false, "Brand not updated", null, null));
        }
    }
});


module.exports = router;