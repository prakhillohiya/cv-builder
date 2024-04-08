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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
// app.use((req, res, next) => {
//   const startTime = Date.now();
//   const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
//   const logData: {
//     method: string;
//     url: string;
//     ip: string | string[] | undefined;
//     timestamp: string;
//     userAgent: string | undefined;
//     requestBody: any;
//     requestHeaders: IncomingHttpHeaders;
//     responseStatusCode?: number;
//     responseTime?: number;
//     responseHeaders?: any;
//   } = {
//     method: req.method,
//     url: req.url,
//     ip: ip,
//     timestamp: new Date().toISOString(),
//     userAgent: req.headers["user-agent"],
//     requestBody: req.body,
//     requestHeaders: req.headers,
//   };
//   res.on("finish", () => {
//     const endTime = Date.now();
//     const responseTime = endTime - startTime;
//     logData.responseStatusCode = res.statusCode;
//     logData.responseTime = responseTime;
//     logData.responseHeaders = res.getHeaders();
//     logger.info(logData);
//   });
//   next();
// });
app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        (0, index_routes_1.default)(app);
        console.log(`Server Running on ${process.env.PORT}`);
    }
    catch (error) {
        console.log(error);
    }
}));
//# sourceMappingURL=index.js.map