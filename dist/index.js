"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apis_1 = require("./controllers/BO/apis");
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("./middlewares/cors"));
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb+srv://sourabhs:sourabhs@cluster0.fuw2xdu.mongodb.net/DB1', {
// useNewUrlParser: true,
// useUnifiedTopology: true
});
app.use(body_parser_1.default.json({ limit: '500mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '500mb', extended: true }));
app.use((0, cors_1.default)());
app.use('/bo/apis', apis_1.ApiRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map