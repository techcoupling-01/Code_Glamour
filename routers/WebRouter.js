const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/index');
const ApiResponse = require('../utils/ApiResponse');

const {generateToken} = require("../utils/JWTconfig");
const constants = require('../utils/SystemConstant')


router.post("/register",async (req,res)=>{
    try
    {
    const obj = req.body;
    obj.active_status = true;
    //Email Validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(obj.email)){
        return res.json(new ApiResponse(false,"Invalid Email",null,null));
    }
    const existingUser = await User.findOne({ where: { email: obj.email } });
    if (existingUser) {
        return res.json(new ApiResponse(false,"Email Already Registered",null,null));
    }
    //Password Encrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(obj.password, saltRounds);
    obj.password = hashedPassword;

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
    } catch(error){
          res.json(new ApiResponse(false,"Registration Failed",null,error));
    }

});
router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    if(email==undefined || email.length==0) {
       res.json(new ApiResponse(false,"Email Not Found",null,null));
    }
    else if(password==undefined || password.length==0) {
       res.json(new ApiResponse(false,"Password Not Found",null,null));
    }
    else{
        const userob = await User.findOne({
            where : {email,password}
        })
        if(userob == null){
            res.json(new ApiResponse(false,"Invalid",null,null));
        }
        else{
            const token = generateToken(userob.id, userob.role);
            res.json(new ApiResponse(true,"Login Success!!",{
                name : userob.name,
                role : userob.role,
                token
            },null));
        }
    }

});
router.get('/constants',(req,res)=>{
     res.json(new ApiResponse(true,"Constants",constants));
})
module.exports = router;