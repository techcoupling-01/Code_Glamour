const router = require('express').Router();
const ApiResponse = require('../utils/ApiResponse');
const {verifyToken} = require("../utils/JWTconfig");


const admin = require('./AdminRouter');

router.use((req,res,next)=>{
    const header = req.headers["authorization"];
    if(!header || header.length==0 || !header.startsWith("Bearer")){
            res.json(new ApiResponse(false,"Unauthorized Access",null,null));
    }
    else{
        const token = header.split(" ")[1];
        verifyToken(token,(err,tokendata)=>{
            if(err){
                res.json(new ApiResponse(false,"Unauthorized Access",null,err));
            }
            else{
                req.loginuser = tokendata;
                next(); 
            }
        });
    }
});

router.use("/admin",admin);     

module.exports = router;

