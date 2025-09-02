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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var cors = require('cors');
var multer = require("multer");
var path = require("path");
var fs = require('fs');
require("dotenv").config();
// const File = require("./models/File");
var zod_1 = require("zod");
var app = express();
var port = 5000;
app.use(cors({ origin: "https://dan-architects-space.vercel.app", methods: ["GET", "POST", "PUT", "DELETE"], allowedHeaders: ["Content-Type", "token", "id"] }));
app.options("*", cors());
app.use(express.json());
var secertKey = "DAN.Architects";
function authentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, verified;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.headers.token];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, jwt.verify(token, secertKey, function (err, original) {
                            if (err) {
                                res.status(401).json({ "message": "unAuthorized" });
                            }
                            else {
                                // console.log(original)
                                console.log("Authorization passed");
                                next();
                            }
                        })];
                case 2:
                    verified = _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
app.get('/', authentication, function (req, res) {
    res.send('Hello World!njoinoirngv');
});
app.get('/profile', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.headers.id;
                return [4 /*yield*/, Data.findOne({ id: id })];
            case 1:
                data = _a.sent();
                res.status(200).json(data);
                return [2 /*return*/];
        }
    });
}); });
app.get('/controller', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, employee;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.headers.id.id;
                console.log(req.headers.id);
                console.log('inside controller');
                return [4 /*yield*/, Data.findOne({ id: id })];
            case 1:
                employee = _a.sent();
                if (employee) {
                    if (employee.controller == "yes") {
                        res.status(200).json({ "controller": "yes" });
                        console.log(employee);
                    }
                    else {
                        res.status(401).json({ "controller": "no" });
                    }
                }
                return [2 /*return*/];
        }
    });
}); });
app.post('/admin/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var inputIdPassword, parsedInput, id, password, data, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("request came");
                inputIdPassword = zod_1.z.object({
                    id: zod_1.z.string().max(20),
                    password: zod_1.z.string().max(20)
                });
                parsedInput = inputIdPassword.safeParse(req.body);
                if (!parsedInput.success) {
                    return [2 /*return*/, res.status(401).json({
                            msg: "input must be string and maxLength 20",
                            value: "2"
                        })];
                }
                id = parsedInput.data.id;
                password = parsedInput.data.password;
                return [4 /*yield*/, Data.findOne({ id: id, password: password })];
            case 1:
                data = _a.sent();
                console.log(data);
                if (data) {
                    console.log("employee id found");
                    token = jwt.sign({ id: id, password: password }, secertKey, { expiresIn: "1h" });
                    res.status(200).json({ value: "1", token: token, data: data });
                }
                else {
                    console.log("incorrect id and password");
                    res.status(401).json({ value: "0" });
                }
                return [2 /*return*/];
        }
    });
}); });
app.post('/announcements', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, dataUpload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                data = req.body;
                dataUpload = new announcementData(data);
                return [4 /*yield*/, dataUpload.save()];
            case 1:
                _a.sent();
                res.status(200).json({ "message": "Data Uploaded" });
                return [2 /*return*/];
        }
    });
}); });
app.get('/announcements', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var documents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, announcementData.find()];
            case 1:
                documents = _a.sent();
                res.status(200).json(documents);
                return [2 /*return*/];
        }
    });
}); });
app.get('/employeesData', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var documents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Data.find()];
            case 1:
                documents = _a.sent();
                res.status(200).json(documents);
                return [2 /*return*/];
        }
    });
}); });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
app.post("/upload/files", authentication, upload.single("file"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).json({ "message": "Data Uploaded" });
        return [2 /*return*/];
    });
}); });
app.get('/download/:filename', authentication, function (req, res) {
    var filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath);
});
app.post('/upload/projectDetails', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, dataUpload;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                data = req.body;
                dataUpload = new projectDetails(data);
                return [4 /*yield*/, dataUpload.save()];
            case 1:
                _a.sent();
                res.status(200).json({ "message": "Data Uploaded" });
                return [2 /*return*/];
        }
    });
}); });
app.delete('/delete-file/:filename', authentication, function (req, res) {
    var filename = req.params.filename;
    var filePath = path.join(__dirname, 'uploads', filename);
    fs.unlink(filePath, function (err) {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).json({ message: 'Failed to delete file' });
        }
        res.json({ message: 'File deleted successfully' });
    });
});
app.put('/upload/update', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, updateFields, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, _id = _a._id, updateFields = __rest(_a, ["_id"]);
                return [4 /*yield*/, projectDetails.updateOne({ _id: _id }, { $set: updateFields })];
            case 1:
                result = _b.sent();
                if (result) {
                    res.status(200).json({ message: "successfull update" });
                }
                else {
                    res.status(400).json({ message: "error update" });
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/project/projectDetails', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var allProjectDetails;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, projectDetails.find()];
            case 1:
                allProjectDetails = _a.sent();
                res.status(200).json(allProjectDetails);
                return [2 /*return*/];
        }
    });
}); });
app.post('/task/upload/dailyTask', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, task, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, task = _a.task;
                return [4 /*yield*/, Data.findOne({ id: id })];
            case 1:
                data = _b.sent();
                if (!data) return [3 /*break*/, 3];
                return [4 /*yield*/, data.dailyTask.push(task)];
            case 2:
                _b.sent();
                data.save();
                res.status(200).json({ message: "success upload" });
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json({ message: "error" });
                _b.label = 4;
            case 4:
                console.log(req.body);
                return [2 /*return*/];
        }
    });
}); });
app.post('/task/upload/weeklyTask', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, id, task, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, id = _a.id, task = _a.task;
                return [4 /*yield*/, Data.findOne({ id: id })];
            case 1:
                data = _b.sent();
                if (!data) return [3 /*break*/, 3];
                return [4 /*yield*/, data.weeklyTask.push(task)];
            case 2:
                _b.sent();
                data.save();
                res.status(200).json({ message: "success upload" });
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json({ message: "error" });
                _b.label = 4;
            case 4:
                console.log(req.body);
                return [2 /*return*/];
        }
    });
}); });
app.put('/task/updateDaily', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateDailyTask, id, data, newData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateDailyTask = req.body;
                console.log(updateDailyTask);
                id = req.headers.id;
                return [4 /*yield*/, Data.findOne({ id: id })];
            case 1:
                data = _a.sent();
                if (!data) {
                    return [2 /*return*/, res.status(400).json({ message: "Data not found" })];
                }
                newData = data.dailyTask.filter(function (task) { return !updateDailyTask.includes(task); });
                data.dailyTask = newData;
                return [4 /*yield*/, data.save()];
            case 2:
                _a.sent();
                res.status(200).json({ message: "success updATE" });
                return [2 /*return*/];
        }
    });
}); });
app.put('/task/updateWeekly', authentication, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updateWeeklyTask, id, data, newData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updateWeeklyTask = req.body;
                console.log(updateWeeklyTask);
                id = req.headers.id;
                return [4 /*yield*/, Data.findOne({ id: id })];
            case 1:
                data = _a.sent();
                if (!data) {
                    return [2 /*return*/, res.status(400).json({ message: "Data not found" })];
                }
                newData = data.weeklyTask.filter(function (task) { return !updateWeeklyTask.includes(task); });
                data.weeklyTask = newData;
                return [4 /*yield*/, data.save()];
            case 2:
                _a.sent();
                res.status(200).json({ message: "success updATE" });
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
//database//
var userSchema = new mongoose.Schema({
    id: String,
    password: String,
    dailyTask: [String],
    weeklyTask: [String]
});
var Data = new mongoose.model('Data', userSchema);
var announcements = new mongoose.Schema({
    announcement: String,
    id: String
});
var announcementData = new mongoose.model('announcementData', announcements);
var projectDetailsSchema = new mongoose.Schema({
    projectName: String,
    startDate: String,
    targetDate: String,
    siteLocation: String,
    team: Array,
    details: String,
    completedPercentage: String,
    file: String,
});
var projectDetails = new mongoose.model("projectDetails", projectDetailsSchema);
var DANArchitects = mongoose.connect("mongodb+srv://muzzu2605afzall:9972228752.@clusterafzal.mzc6v.mongodb.net/EmployeeData");
// const EmployeeData=DANArchitects.db("EmployeeData");
// const employees=EmployeeData.collection("employees")
