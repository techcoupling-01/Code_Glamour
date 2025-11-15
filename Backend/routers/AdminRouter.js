const router = require('express').Router();
const BrandRouter = require('./BrandRouter');
const ApiResponse = require('../utils/ApiResponse');
const CategoryRouter = require('./CategoryRouter');
const {Branch, User} = require('../models/index');



router.use("/brand",BrandRouter);
router.use("/category",CategoryRouter);
router.post("/register",async (req,res)=>{
    try
    {
        const obj = req.body;
        obj.status = true;

        //Mobile verification
        const max = 10;
        if (!obj.mobile || obj.mobile.toString().trim().length === 0) {
            return res.json(new ApiResponse(false, "Mobile Not Found", null, null));
        }
        // normalize to digits only
        const mobileDigits = obj.mobile.toString().replace(/\D/g, "");
        if (mobileDigits.length !== max) {
            return res.json(new ApiResponse(false, `Mobile must be ${max} digits`, null, null));
        }
        obj.mobile = mobileDigits;
        // check uniqueness
        const existingMobile = await User.findOne({ where: { mobile: obj.mobile } });
        if (existingMobile) {
            return res.json(new ApiResponse(false, "Mobile Already Registered", null, null));
        }
        await User.create(obj);
        res.json(new ApiResponse(true,"Successfully Registered",null,null));
        }catch(error){
            res.json(new ApiResponse(false,"Registration Failed",null,error));
        }

});
router.post("/addbranch",async (req,res)=>{
    try{
        const branch = await Branch.create(req.body);   
        res.json(new ApiResponse(true,"Branch added successfully",branch,null));
    }       
    catch(err){
        res.json(new ApiResponse(false,"Error adding branch",null,err.message));
    }   
});





module.exports = router;