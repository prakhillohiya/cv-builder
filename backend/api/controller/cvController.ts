import { Request, RequestHandler, Response } from "express";
import { cvModel } from "../model/cvModel";
import { ICV } from "../schema/cv/cvSchema";
import { ObjectId } from "mongodb";
import { IExtendedRequest } from "../interface";
import { IUser } from "../schema/userSchema";
import { logger } from "../middleware/logger";


export const fetchAllUserCV = async (req: Request<IExtendedRequest<IUser>>, res: Response) => {
  try {
    const { userId } = req.body.reqUser;
    const userCV = await cvModel.find<ICV>({ userId });

    return res.status(200).send({
      message: "All User CV's Fetched Successfully",
      data: userCV,
    });
  } catch (error: any) {
    logger.error(error)
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateUserCV = async (req: Request<IExtendedRequest<IUser>>, res: Response) => {
  try {
    const { cvId } = req.params as any
    const { profile, template, userId,title } = req.body;

    const updatedCV = await cvModel.findOneAndUpdate<ICV>(
      { _id: cvId },
      { profile, template,title },
      { new: true }
    );

    return res.status(200).send({
      message: "User CV Updated Successfully",
      data: updatedCV,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createUserCV= async (
  req: Request<IExtendedRequest<IUser>>,
  res: Response
) => {
  try {
    const { userId } = req.body.reqUser;
    const { profile, template,title }: ICV = req.body;

    const newCV = await new cvModel<ICV>({ profile, template, userId,title }).save();

    return res.status(200).send({
      message: "User CV Created Successfully",
      data: newCV,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const fetchUserCVWithCVId = async (req: Request<IExtendedRequest<IUser>>, res: Response) => {
  try {
    const { cvId } = req.params as any;
    const cv = await cvModel.findById<ICV>({ _id:cvId });

    if(!cv){
      return res.status(400).send({
        message: "CV Does Not Exist",
      });
    }

    return res.status(200).send({
      message: "User CV Fetched Successfully",
      data: cv,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteCVWithCVId = async (req: Request<IExtendedRequest<IUser>>, res: Response) => {
  try {
    const { cvId } = req.params as any;
    const cv = await cvModel.findByIdAndDelete<ICV>({ _id:cvId });

    if(!cv){
      return res.status(400).send({
        message: "CV Does Not Exist",
      });
    }

    return res.status(200).send({
      message: "User CV Deleted Successfully",
      data: cv,
    });
  } catch (error: any) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
