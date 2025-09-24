const express = require('express')
const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")
const cors=require('cors')
const multer =require("multer")
const path=require("path")
const fs = require('fs');
require("dotenv").config();
// const File = require("./models/File");

import { z} from "zod"
const app = express()
const port = 5000
 app.use(cors({origin:"*",methods:["GET","POST","PUT","DELETE"],allowedHeaders:["Content-Type","token","id"]}))
 app.options("*",cors())
 app.use(express.json())
 const secertKey="DAN.Architects"


 async function authentication(req:any,res:any,next:any){
  const token= await req.headers.token;
  const verified= await jwt.verify(token,secertKey,(err:any,original:any)=>{
    if(err){
      res.status(401).json({"message":"unAuthorized"})
    }else{
      // console.log(original)
      console.log("Authorization passed")
      next()
    }
    
  })
 }




app.get('/', authentication,(req:any, res:any) => {
  res.send('Hello World!njoinoirngv')
})

app.get('/profile', authentication,async(req:any, res:any) => {
  const id=req.headers.id
  const data = await Data.findOne({id})
  res.status(200).json(data)
})


app.get('/controller', authentication,async (req:any, res:any) => {
    const {id}=req.headers.id
    console.log(req.headers.id);
    console.log('inside controller')
    const employee= await Data.findOne({id})
    if(employee){
      if(employee.controller=="yes"){
        res.status(200).json({"controller":"yes"})
        console.log(employee)
      }
      else{
        res.status(401).json({"controller":"no"})
      }
    }
})




app.post('/admin/login',async (req:any, res:any) => {
  console.log("request came")
  let inputIdPassword=z.object({
    id:z.string().max(20),
    password:z.string().max(20)
  })
  let parsedInput=inputIdPassword.safeParse(req.body)
  if(!parsedInput.success){
    return res.status(401).json({
      msg:"input must be string and maxLength 20",
      value:"2"
    })
  }
  let id=parsedInput.data.id;
  let password=parsedInput.data.password
  const data = await Data.findOne({id,password})
  console.log(data);
  if(data){
    console.log("employee id found")
    const token=jwt.sign({id,password},secertKey,{expiresIn:"1h"})
    res.status(200).json({value:"1",token,data})
  }else{
    console.log("incorrect id and password")
    res.status(401).json({value:"0"})
  }  
})





app.post('/announcements', authentication,async(req:any, res:any) => {
  console.log(req.body)
  const data= req.body
  const dataUpload=new announcementData(data)
   await dataUpload.save()
   res.status(200).json({"message":"Data Uploaded"})
})



app.get('/announcements', authentication,async(req:any, res:any) => {
  const documents= await announcementData.find()
  res.status(200).json(documents)
})

app.get('/employeesData', authentication,async(req:any, res:any) => {
  const documents= await Data.find()
  res.status(200).json(documents)
})




const storage = multer.diskStorage({
  destination: (req:any, file:any, cb:any) => {
    cb(null, "uploads/");
  },
  filename: (req:any, file:any, cb:any) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
app.post("/upload/files",authentication,upload.single("file"),async(req:any,res:any)=>{
  
  res.status(200).json({"message":"Data Uploaded"})

})

app.get('/download/:filename', authentication,(req:any, res:any) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.download(filePath);
})




app.post('/upload/projectDetails',authentication,async(req:any, res:any) => {
  console.log(req.body)
  const data= req.body
  const dataUpload=new projectDetails(data)
   await dataUpload.save()
   res.status(200).json({"message":"Data Uploaded"})
})


app.delete('/delete-file/:filename',authentication, (req:any, res:any) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  fs.unlink(filePath, (err:any) => {
    if (err) {
      console.error('Error deleting file:', err);
      return res.status(500).json({ message: 'Failed to delete file' });
    }
    res.json({ message: 'File deleted successfully' });
  });
});


app.put('/upload/update',authentication, async (req:any, res:any) => {
  const { _id, ...updateFields } = req.body;
  const result = await projectDetails.updateOne(
      { _id },
      { $set: updateFields })
  if(result){res.status(200).json({message:"successfull update"})  
  }else{res.status(400).json({message:"error update"})}
})





app.get('/project/projectDetails', authentication,async(req:any, res:any) => {
   const allProjectDetails= await projectDetails.find()
   res.status(200).json(allProjectDetails)

})


app.post('/task/upload/dailyTask',authentication,async(req:any,res:any)=>{
const {id,task}=req.body
  const data= await Data.findOne({id})
  if(data){
   await data.dailyTask.push(task)
    data.save()
    res.status(200).json({message:"success upload"})
  }else{
    res.status(400).json({message:"error"})
  }
console.log(req.body)

})


app.post('/task/upload/weeklyTask',authentication,async(req:any,res:any)=>{
const {id,task}=req.body
  const data= await Data.findOne({id})
  if(data){
   await data.weeklyTask.push(task)
    data.save()
    res.status(200).json({message:"success upload"})
  }else{
    res.status(400).json({message:"error"})
  }
console.log(req.body)

})

app.put('/task/updateDaily',authentication, async (req:any, res:any) => {
  const updateDailyTask=req.body
  console.log(updateDailyTask);
  const id=req.headers.id
  const data = await Data.findOne({ id });
   if (!data) {
      return res.status(400).json({ message: "Data not found" });
    }

    const newData = data.dailyTask.filter((task: any) => !updateDailyTask.includes(task));

    data.dailyTask = newData;
    await data.save();
    res.status(200).json({message:"success updATE"})

})

app.put('/task/updateWeekly',authentication, async (req:any, res:any) => {
  const updateWeeklyTask=req.body
  console.log(updateWeeklyTask);
  const id=req.headers.id
  const data = await Data.findOne({ id });
   if (!data) {
      return res.status(400).json({ message: "Data not found" });
    }

    const newData = data.weeklyTask.filter((task: any) => !updateWeeklyTask.includes(task));

    data.weeklyTask = newData;
    await data.save();
    res.status(200).json({message:"success updATE"})

})








app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

//database//
const userSchema=new mongoose.Schema({
  id: String,
  password:String,
  dailyTask:[String],
  weeklyTask:[String]

})
const Data=new mongoose.model('Data',userSchema);

const announcements=new mongoose.Schema({
  announcement:String,
  id:String
})
const announcementData=new mongoose.model('announcementData',announcements);




const projectDetailsSchema = new mongoose.Schema({
 projectName:String,
 startDate:String,
 targetDate:String,
 siteLocation:String,
 team:Array,
 details:String,
 completedPercentage:String,
 file:String,
});
const projectDetails=new mongoose.model("projectDetails", projectDetailsSchema);






const DANArchitects:any=mongoose.connect("mongodb+srv://muzzu2605afzall:9972228752.@clusterafzal.mzc6v.mongodb.net/EmployeeData")

// const EmployeeData=DANArchitects.db("EmployeeData");
// const employees=EmployeeData.collection("employees")