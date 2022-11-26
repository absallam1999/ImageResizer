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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const fs_2 = require("fs");
const resize_1 = __importDefault(require("./utils/resize"));
const array_1 = __importDefault(require("./utils/array"));
const logger_1 = __importDefault(require("./utils/logger"));
const router = express_1.default.Router();
router.get('/images', logger_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.filename;
    const fileWidth = req.query.width;
    const fileHeight = req.query.height;
    const outputFile = path_1.default.resolve('./') +
        `/images/output/${fileName}_${fileWidth}_${fileHeight}.jpg`;
    const checkIfImage = array_1.default.includes(fileName);
    if (fileName === undefined ||
        fileWidth === undefined ||
        fileHeight === undefined) {
        return res
            .status(400)
            .send('<h1> <center> Some Queries are MISSING! </center> </h1>');
    }
    else if (isNaN(fileWidth) || isNaN(fileHeight)) {
        return res
            .status(400)
            .send('<h1> <center> Please Enter Avalid Width & Height Values! </center> </h1>');
    }
    else if (fileName !== '' && fileWidth >= 10 && fileHeight >= 10) {
        try {
            if (fs_1.default.existsSync(outputFile)) {
                return res.status(200).sendFile(outputFile);
            }
            else if (checkIfImage === false) {
                return res.status(400).send('<h1> <center> File Name is NOT Exist!');
            }
            else {
                (0, resize_1.default)(fileName, fileWidth, fileHeight)
                    .then(() => {
                    fs_2.promises.readFile(outputFile, 'utf-8');
                })
                    .then(() => {
                    res.status(200).sendFile(outputFile);
                });
            }
        }
        catch (error) {
            Error('There Is an Error according Process!');
        }
    }
    else {
        return res
            .status(400)
            .send('<h1> <center> Please Enter A Valid URL! </center> </h1>');
    }
}));
exports.default = router;
