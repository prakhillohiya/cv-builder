import { Request, Response } from "express";
import { cvTemplateModel } from "../model/cvTemplateModel";
import { ICVTemplate } from "../schema/cv/cvTemplateSchema";
import { IExtendedRequest } from "../interface";
import { IUser } from "../schema/userSchema";

export const fetchAllCVTemplates = async (
  req: Request<IExtendedRequest<IUser>>,
  res: Response
) => {
  try {
    const cvTemplates = await cvTemplateModel.find<ICVTemplate>();

    return res.status(200).send({
      message: "All Templates Fetched Successfully",
      data: cvTemplates,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const insertTemplate = async (
  req: Request<IExtendedRequest<IUser>>,
  res: Response
) => {
  try {
    const { profile, template, title } = req.body;

    const insertedTemplate = await new cvTemplateModel<ICVTemplate>({
      profile,
      template,
      title,
    }).save();

    return res.status(200).send({
      message: "Template Inserted Successfully",
      data: insertedTemplate,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",

      error: error.message,
    });
  }
};

export const fetchCVTemplate = async (
  req: Request<IExtendedRequest<IUser>>,
  res: Response
) => {
  try {
    const { templateId } = req.params as any;
    const cv = await cvTemplateModel.findById<ICVTemplate>({ _id: templateId });

    if (!cv) {
      return res.status(400).send({
        message: "Template Does Not Exist",
      });
    }

    return res.status(200).send({
      message: "Template Fetched Successfully",
      data: cv,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateTemplate = async (
  req: Request<IExtendedRequest<IUser>>,
  res: Response
) => {
  try {
    const { templateId } = req.params as any;
    const { profile, template, userId, title } = req.body;

    const updatedTemplate = await cvTemplateModel.findOneAndUpdate<ICVTemplate>(
      { _id: templateId },
      { profile, template, title },
      { new: true }
    );

    return res.status(200).send({
      message: "Template Updated Successfully",
      data: updatedTemplate,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteTemplateWithId = async (
  req: Request<IExtendedRequest<IUser>>,
  res: Response
) => {
  try {
    const { templateId } = req.params as any;
    const template = await cvTemplateModel.findByIdAndDelete<ICVTemplate>({
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
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
