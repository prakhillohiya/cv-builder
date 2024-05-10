"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileSchema = exports.ZProfile = void 0;
const mongoose_1 = require("mongoose");
const basicSchema_1 = require("./basicSchema");
const experienceSchema_1 = require("./experienceSchema");
const educationSchema_1 = require("./educationSchema");
const projectsSchema_1 = require("./projectsSchema");
const skillsSchema_1 = require("./skillsSchema");
const socialsSchema_1 = require("./socialsSchema");
const zod_1 = require("zod");
exports.ZProfile = zod_1.z.object({
    basic: basicSchema_1.ZBasic,
    education: zod_1.z.array(educationSchema_1.ZEducation),
    experience: zod_1.z.array(experienceSchema_1.ZExperience),
    projects: zod_1.z.array(projectsSchema_1.ZProjects),
    skills: zod_1.z.array(skillsSchema_1.ZSkills),
    socials: zod_1.z.array(socialsSchema_1.ZSocials),
});
exports.profileSchema = new mongoose_1.Schema({
    basic: basicSchema_1.basicSchema,
    education: [educationSchema_1.educationSchema],
    experience: [experienceSchema_1.experienceSchema],
    projects: [projectsSchema_1.projectsSchema],
    skills: [skillsSchema_1.skillsSchema],
    socials: [socialsSchema_1.socialsSchema],
});
//# sourceMappingURL=profileSchema.js.map