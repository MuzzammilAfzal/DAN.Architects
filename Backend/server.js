"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const multer = require("multer");
require("dotenv").config();
const File = require("./models/File");
const zod_1 = require("zod");
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const secertKey = "DAN.Architects";
function authentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = yield req.headers.token;
        const verified = yield jwt.verify(token, secertKey, (err, original) => {
            if (err) {
                res.status(401).json({ "message": "unAuthorized" });
            }
            else {
                // console.log(original)
                console.log("Authorization passed");
                next();
            }
        });
    });
}
app.get('/', authentication, (req, res) => {
    res.send('Hello World!njoinoirngv');
});
app.get('/profile', authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.headers.id;
    const data = yield Data.findOne({ id });
    res.status(200).json(data);
}));
app.get('/controller', authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.headers.id;
    console.log(req.headers.id);
    console.log('inside controller');
    const employee = yield Data.findOne({ id });
    if (employee) {
        if (employee.controller == "yes") {
            res.status(200).json({ "controller": "yes" });
            console.log(employee);
        }
        else {
            res.status(401).json({ "controller": "no" });
        }
    }
}));
app.post('/admin/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("request came");
    let inputIdPassword = zod_1.z.object({
        id: zod_1.z.string().max(20),
        password: zod_1.z.string().max(20)
    });
    let parsedInput = inputIdPassword.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(401).json({
            msg: "input must be string and maxLength 20",
            value: "2"
        });
    }
    let id = parsedInput.data.id;
    let password = parsedInput.data.password;
    const data = yield Data.findOne({ id, password });
    console.log(data);
    if (data) {
        console.log("employee id found");
        const token = jwt.sign({ id, password }, secertKey, { expiresIn: "1h" });
        res.status(200).json({ value: "1", token, data });
    }
    else {
        console.log("incorrect id and password");
        res.status(401).json({ value: "0" });
    }
}));
app.post('/announcements', authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const data = req.body;
    const dataUpload = new announcementData(data);
    yield dataUpload.save();
    res.status(200).json({ "message": "Data Uploaded" });
}));
app.get('/announcements', authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documents = yield announcementData.find();
    res.status(200).json(documents);
}));
app.get('/employeesData', authentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const documents = yield Data.find();
    console.log(documents);
    res.status(200).json(documents);
}));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
app.post("/upload", authentication, upload.single("file"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    console.log(req.file);
    console.log(req.headers);
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
        yield newFile.save();
        res.status(200).json({ message: "File uploaded successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "File upload failed" });
    }
}));
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//database//
const userSchema = new mongoose.Schema({
    id: String,
    password: String
});
const Data = new mongoose.model('Data', userSchema);
const announcements = new mongoose.Schema({
    announcement: String,
    id: String
});
const announcementData = new mongoose.model('announcementData', announcements);
const DANArchitects = mongoose.connect("mongodb+srv://muzzu2605afzall:9972228752.@clusterafzal.mzc6v.mongodb.net/EmployeeData");
// const EmployeeData=DANArchitects.db("EmployeeData");
// const employees=EmployeeData.collection("employees")
