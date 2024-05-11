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
const auth_1 = require("../middleware/auth");
const cvRoute_1 = __importDefault(require("./cvRoute"));
const cvTemplateRoute_1 = __importDefault(require("./cvTemplateRoute"));
const userRoute_1 = __importDefault(require("./userRoute"));
const routes = (app) => {
    app.use('/user', userRoute_1.default);
    app.use('/cv', auth_1.authMiddleware, cvRoute_1.default);
    app.use('/template', auth_1.authMiddleware, cvTemplateRoute_1.default);
    app.use('/check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(200).send({ "message": "Server Running" });
        }
        catch (error) {
            res.status(500).send({ "message": "Internal Server Error" });
        }
    }));
};
exports.default = routes;
//# sourceMappingURL=index.routes.js.map