"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateSchema = exports.ZTemplate = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.ZTemplate = zod_1.z.object({
    backgroundColor: zod_1.z.string(),
    fontSize: zod_1.z.string(),
    fontFamily: zod_1.z.string(),
});
exports.templateSchema = new mongoose_1.Schema({
    backgroundColor: { type: String },
    fontSize: { type: String },
    fontFamily: { type: String },
});
//# sourceMappingURL=templateSchema.js.map