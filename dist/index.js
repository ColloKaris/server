"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express
const express_1 = __importDefault(require("express"));
const loginRoutes_1 = require("./routes/loginRoutes");
// execute express
const app = (0, express_1.default)();
// parse the contents of a form
//app.use(bodyParser.urlencoded({ extended: true}));
// handles router of the application
app.use(loginRoutes_1.router);
// Server to listen on port 3000
app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
});
