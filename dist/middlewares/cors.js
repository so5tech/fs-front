"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const cors = () => (0, cors_1.default)({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE", allowedHeaders: "*" });
exports.default = cors;
//# sourceMappingURL=cors.js.map