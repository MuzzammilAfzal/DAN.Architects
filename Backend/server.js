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
var _this = this;
var express = require('express');
var mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var cors = require('cors');
var app = express();
var port = 3000;
app.use(cors());
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
app.get('/controller', authentication, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
app.post('/admin/login', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, id, password, data, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("request came");
                _a = req.body, id = _a.id, password = _a.password;
                return [4 /*yield*/, Data.findOne({ id: id, password: password })];
            case 1:
                data = _b.sent();
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
app.post('/announcements', authentication, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
app.get('/announcements', authentication, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var documents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, announcementData.find()];
            case 1:
                documents = _a.sent();
                console.log(documents);
                res.status(200).json(documents);
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
    password: String
});
var Data = new mongoose.model('Data', userSchema);
var announcements = new mongoose.Schema({
    announcement: String,
    id: String
});
var announcementData = new mongoose.model('announcementData', announcements);
var DANArchitects = mongoose.connect("mongodb+srv://muzzu2605afzall:9972228752.@clusterafzal.mzc6v.mongodb.net/EmployeeData");
// const EmployeeData=DANArchitects.db("EmployeeData");
// const employees=EmployeeData.collection("employees")