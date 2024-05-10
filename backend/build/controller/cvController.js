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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCVWithCVId = exports.fetchUserCVWithCVId = exports.createUserCV = exports.updateUserCV = exports.fetchAllUserCV = void 0;
const cvModel_1 = require("../model/cvModel");
const logger_1 = require("../middleware/logger");
const fetchAllUserCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body.reqUser;
        const userCV = yield cvModel_1.cvModel.find({ userId });
        return res.status(200).send({
            message: "All User CV's Fetched Successfully",
            data: userCV,
        });
    }
    catch (error) {
        logger_1.logger.error(error);
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.fetchAllUserCV = fetchAllUserCV;
const updateUserCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cvId } = req.params;
        const { profile, template, userId, title } = req.body;
        const updatedCV = yield cvModel_1.cvModel.findOneAndUpdate({ _id: cvId }, { profile, template, title }, { new: true });
        return res.status(200).send({
            message: "User CV Updated Successfully",
            data: updatedCV,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.updateUserCV = updateUserCV;
const createUserCV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body.reqUser;
        const { profile, template, title } = req.body;
        const newCV = yield new cvModel_1.cvModel({ profile, template, userId, title }).save();
        return res.status(200).send({
            message: "User CV Created Successfully",
            data: newCV,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.createUserCV = createUserCV;
const fetchUserCVWithCVId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cvId } = req.params;
        const cv = yield cvModel_1.cvModel.findById({ _id: cvId });
        if (!cv) {
            return res.status(400).send({
                message: "CV Does Not Exist",
            });
        }
        return res.status(200).send({
            message: "User CV Fetched Successfully",
            data: cv,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.fetchUserCVWithCVId = fetchUserCVWithCVId;
const deleteCVWithCVId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cvId } = req.params;
        const cv = yield cvModel_1.cvModel.findByIdAndDelete({ _id: cvId });
        if (!cv) {
            return res.status(400).send({
                message: "CV Does Not Exist",
            });
        }
        return res.status(200).send({
            message: "User CV Deleted Successfully",
            data: cv,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.deleteCVWithCVId = deleteCVWithCVId;
//# sourceMappingURL=cvController.js.map