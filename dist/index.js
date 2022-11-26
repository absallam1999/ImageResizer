"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./router/index"));
const logger_1 = __importDefault(require("./router/utils/logger"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', logger_1.default, (req, res) => {
    res.send('<h1> <center> Welcom to Image Resizer! </center> </h1>');
});
app.use('/api', logger_1.default, index_1.default, (req, res) => {
    res.send('<h1> <center> Main API Endpoint! </center> </h1>');
});
app.use('/:images', logger_1.default, index_1.default, (req, res) => {
    res.send('<h1> <center> Enter Avalid URL! </center> </h1>');
});
app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});
exports.default = app;
