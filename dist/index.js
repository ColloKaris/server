"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
require("./controllers/LoginController");
const AppRouter_1 = require("./AppRouter");
require("./controllers/LoginController");
require("./controllers/RootController");
// execute express
const app = (0, express_1.default)();
// parse the contents of a form
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_session_1.default)({ keys: ['laskdjf'] }));
// handles router of the application
app.use(AppRouter_1.AppRouter.getInstance());
// Server to listen on port 3000
app.listen(3000, () => {
    console.log('LISTENING ON PORT 3000');
});
