"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const express_1 = require("express");
const login_1 = __importDefault(require("./login"));
exports.Auth = (0, express_1.Router)();
exports.Auth.post('/login', login_1.default);
//# sourceMappingURL=index.js.map