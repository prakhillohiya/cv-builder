"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cvSchema = exports.ZCV = void 0;
const mongoose_1 = require("mongoose");
const profileSchema_1 = require("./profileSchema");
const templateSchema_1 = require("./templateSchema");
const zod_1 = require("zod");
const isValidObjectId = (value) => {
    return mongoose_1.Types.ObjectId.isValid(value);
};
const objectIdSchema = zod_1.z.custom((value) => {
    if (typeof value !== "string" || !isValidObjectId(value)) {
        throw new Error("Invalid MongoDB ObjectId");
    }
    return value;
});
exports.ZCV = zod_1.z.object({
    title: zod_1.z.string(),
    profile: profileSchema_1.ZProfile,
    template: templateSchema_1.ZTemplate,
    userId: objectIdSchema.optional(),
});
exports.cvSchema = new mongoose_1.Schema({
    title: { type: String, unique: true },
    profile: profileSchema_1.profileSchema,
    template: templateSchema_1.templateSchema,
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
});
//# sourceMappingURL=cvSchema.js.map