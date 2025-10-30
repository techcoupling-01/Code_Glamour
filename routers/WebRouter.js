const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User, Branch} = require('../models/index');
const ApiResponse = require('../utils/ApiResponse');

const {generateToken} = require("../utils/JWTconfig");
const constants = require('../utils/SystemConstant')


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
        //Password Encrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(obj.password, saltRounds);
        obj.password = hashedPassword;
        
        await User.create(obj);
        res.json(new ApiResponse(true,"Successfully Registered",null,null));
        }catch(error){
            res.json(new ApiResponse(false,"Registration Failed",null,error));
        }

});
router.post("/login",async (req,res)=>{
    const {mobile,password} = req.body;
    if(mobile==undefined || mobile.length==0) {
       res.json(new ApiResponse(false,"Mobile Not Found",null,null));
    }
    else if(password==undefined || password.length==0) {
       res.json(new ApiResponse(false,"Password Not Found",null,null));
    }
    else{
        const userob = await User.findOne({
            where : {mobile,password},
            include : "staff_branch"
        })
        if(userob == null){
            res.json(new ApiResponse(false,"Invalid",null,null));
        }
        else{
            const token = generateToken(userob.id, userob.role, userob.branch);
            res.json(new ApiResponse(true,"Login Success!!",{
                name : userob.name,
                role : userob.role,
                branch : userob.staff_branch,
                token
            },null));
        }
    }

});
router.get('/constants',(req,res)=>{
     res.json(new ApiResponse(true,"Constants",constants));
})
module.exports = router;