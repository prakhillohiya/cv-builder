"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
const cvRoute_1 = __importDefault(require("./cvRoute"));
const cvTemplateRoute_1 = __importDefault(require("./cvTemplateRoute"));
const auth_1 = require("../middleware/auth");
const routes = (app) => {
    app.use('/user', userRoute_1.default);
    app.use('/cv', auth_1.authMiddleware, cvRoute_1.default);
    app.use('/template', auth_1.authMiddleware, cvTemplateRoute_1.default);
};
exports.default = routes;
//# sourceMappingURL=index.routes.js.map