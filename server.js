const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/WebRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", userRouter);



app.listen(8989,()=>{
    console.log("Server running on http://localhost:8989");
})