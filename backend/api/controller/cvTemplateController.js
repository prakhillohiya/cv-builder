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
exports.deleteTemplateWithId = exports.updateTemplate = exports.fetchCVTemplate = exports.insertTemplate = exports.fetchAllCVTemplates = void 0;
const cvTemplateModel_1 = require("../model/cvTemplateModel");
const fetchAllCVTemplates = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cvTemplates = yield cvTemplateModel_1.cvTemplateModel.find();
        return res.status(200).send({
            message: "All Templates Fetched Successfully",
            data: cvTemplates,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.fetchAllCVTemplates = fetchAllCVTemplates;
const insertTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profile, template, title } = req.body;
        const insertedTemplate = yield new cvTemplateModel_1.cvTemplateModel({
            profile,
            template,
            title,
        }).save();
        return res.status(200).send({
            message: "Template Inserted Successfully",
            data: insertedTemplate,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.insertTemplate = insertTemplate;
const fetchCVTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { templateId } = req.params;
        const cv = yield cvTemplateModel_1.cvTemplateModel.findById({ _id: templateId });
        if (!cv) {
            return res.status(400).send({
                message: "Template Does Not Exist",
            });
        }
        return res.status(200).send({
            message: "Template Fetched Successfully",
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
exports.fetchCVTemplate = fetchCVTemplate;
const updateTemplate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { templateId } = req.params;
        const { profile, template, userId, title } = req.body;
        const updatedTemplate = yield cvTemplateModel_1.cvTemplateModel.findOneAndUpdate({ _id: templateId }, { profile, template, title }, { new: true });
        return res.status(200).send({
            message: "Template Updated Successfully",
            data: updatedTemplate,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.updateTemplate = updateTemplate;
const deleteTemplateWithId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { templateId } = req.params;
        const template = yield cvTemplateModel_1.cvTemplateModel.findByIdAndDelete({
            _id: templateId,
        });
        if (!template) {
            return res.status(400).send({
                message: "Template Does Not Exist",
            });
        }
        return res.status(200).send({
            message: "Template Deleted Successfully",
            data: template,
        });
    }
    catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.deleteTemplateWithId = deleteTemplateWithId;
//# sourceMappingURL=cvTemplateController.js.map