const router = require('express').Router();
const {User, Branch} = require('../models/index');
const ApiResponse = require('../utils/ApiResponse');

const {generateToken} = require("../utils/JWTconfig");
const constants = require('../utils/SystemConstant')


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
            include : "user_branch"
        })
        if(userob == null){
            res.json(new ApiResponse(false,"Invalid",null,null));
        }
        else{
            const token = generateToken(userob.id, userob.role, userob.branch);
            res.json(new ApiResponse(true,"Login Success!!",{
                name : userob.name,
                role : userob.role,
                branch : userob.user_branch,
                token
            },null));
        }
    }

});
router.get('/constants',(req,res)=>{
     res.json(new ApiResponse(true,"Constants",constants));
})
module.exports = router;