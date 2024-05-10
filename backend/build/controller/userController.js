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
exports.logout = exports.login = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../model/userModel");
const jwt_1 = require("../utils/jwt");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, number } = req.body;
        const existingUser = yield userModel_1.userModel.findOne({
            $or: [{ userName: userName }, { email: email }],
        });
        if (existingUser) {
            return res
                .status(400)
                .send({ message: "User already registered", statusCode: 400 });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield new userModel_1.userModel(Object.assign(Object.assign({}, req.body), { password: hashedPassword })).save();
        return res.status(200).send({
            message: "User Registered Successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userNameOrEmail, password } = req.body;
        const existingUser = yield userModel_1.userModel.findOne({
            $or: [{ userName: userNameOrEmail }, { email: userNameOrEmail }],
        });
        if (!existingUser) {
            return res
                .status(400)
                .send({ message: "User Not Found", statusCode: 400 });
        }
        const isPasswordMatched = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordMatched) {
            return res
                .status(400)
                .send({ message: "Incorrect Password", statusCode: 400 });
        }
        const token = (0, jwt_1.createToken)({
            userId: existingUser._id,
            userName: existingUser.userName,
            email: existingUser.email,
            number: existingUser.number,
        });
        res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000, secure: true, sameSite: "none" });
        return res.status(200).send({
            message: "Login Successful",
            data: {
                email: existingUser.email,
                userName: existingUser.userName,
                number: existingUser.number,
            },
            token: token,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.clearCookie("jwt");
        yield res.cookie("jwt", "", { httpOnly: true, maxAge: 3600000, secure: true, sameSite: "none" });
        return res.status(200).send({
            message: "Logout Successful",
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.logout = logout;
//# sourceMappingURL=userController.js.map