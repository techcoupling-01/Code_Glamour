const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/WebRouter");
const authRouter = require("./routers/AuthRouter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/user", userRouter);
app.use("/auth", authRouter);



app.listen(8989,()=>{
    console.log("Server running on http://localhost:8989");
})