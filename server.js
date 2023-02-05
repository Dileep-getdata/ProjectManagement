const express=require('express');
const path=require('path');

const mongodbConnect=require('./util/database').mongodbConnect;
const app=express();

app.use(express.json());

const userRouter=require('./routers/user');
const projectRouter=require('./routers/project');
const passwordRouter=require('./routers/forgotpassword');
const taskRouter=require('./routers/task');

app.use('/user',userRouter);
app.use('/project',projectRouter);
app.use('/password',passwordRouter);
app.use('/task',taskRouter);


const dotenv=require('dotenv');
dotenv.config();

const cors=require('cors');
app.use(cors());




app.use((req,res)=>{
    console.log(req.url)
    res.sendFile(path.join(__dirname,`public/${req.url}`));
});

mongodbConnect(()=>{
    app.listen(3000);
})
