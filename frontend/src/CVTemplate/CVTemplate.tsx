import React, { Fragment, useContext, useState } from "react";
import PDF from "../shared/components/PDF";
import LeftSection from "./LeftSection";
import { ICV } from "../shared/components/CV";
import DownloadPDF from "../shared/components/DownloadPDF";
import RightSection from "./RightSection";
import {
  ZProfileSchema,
  ZTemplateSchema,
} from "../shared/context/StoreProvider";
import { z } from "zod";

export const ZCVTemplateSchema = z.object({
  _id: z.string(),
  profile: ZProfileSchema,
  template: ZTemplateSchema,
  title: z.string().min(1),
});

type ICVTemplateType = z.infer<typeof ZCVTemplateSchema>;


export interface ICVTemplate {
  cv: ICV;
  width: string;
  showDownload: boolean;
}

const CVTemplate: React.FC<ICVTemplate> = ({ cv, width, showDownload }) => {

  return (
    <Fragment>
      <PDF width={width}>
        <Fragment>
          <LeftSection cv={cv} />
          <RightSection cv={cv} />
        </Fragment>
      </PDF>
      {showDownload && <DownloadPDF cv={cv} />}
    </Fragment>
  );
};

export default CVTemplate;
