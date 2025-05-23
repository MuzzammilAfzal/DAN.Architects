const express = require('express')
const mongoose=require('mongoose')
const jwt=require("jsonwebtoken")
const cors=require('cors')
const multer =require("multer")
require("dotenv").config();
const File = require("./models/File");

import { log } from "console"
import {z} from "zod"
const app = express()
const port = 3000
 app.use(cors())
 app.use(express.json())
 app.use(express.urlencoded({extended:false}))
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
  console.log(documents)
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
app.post("/upload",authentication,upload.single("file"),async(req:any,res:any)=>{
  console.log(req.body);
  console.log(req.file);
  console.log(req.headers)
  try {
    const newFile = new File({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
      // projectName:req.headers.projectName,
      // startDate:req.headers.startDate,
      // targetDate:req.headers.targetDate,
      // siteLocation:req.headers.siteLocation,
      // team:req.headers.team,
      // details:req.headers.details,
      // completedPercentage:req.headers.completedPercentage,
    });
    await newFile.save();
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File upload failed" });
  }

})





app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

//database//
const userSchema=new mongoose.Schema({
  id: String,
  password:String

})
const Data=new mongoose.model('Data',userSchema);

const announcements=new mongoose.Schema({
  announcement:String,
  id:String
})
const announcementData=new mongoose.model('announcementData',announcements);






const DANArchitects:any=mongoose.connect("mongodb+srv://muzzu2605afzall:9972228752.@clusterafzal.mzc6v.mongodb.net/EmployeeData")

// const EmployeeData=DANArchitects.db("EmployeeData");
// const employees=EmployeeData.collection("employees")