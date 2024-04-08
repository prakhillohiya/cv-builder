"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user) => {
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
    return token;
};
exports.createToken = createToken;
const verifyToken = (token) => {
    try {
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!user)
            null;
        return user;
    }
    catch (error) {
        new Error("Invalid Token");
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map