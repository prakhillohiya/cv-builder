import React, { Fragment } from "react";
import { z } from "zod";
import { ICV } from "../shared/components/CV";
import DownloadPDF from "../shared/components/DownloadPDF";
import PDF from "../shared/components/PDF";
import {
  ZProfileSchema,
  ZTemplateSchema,
} from "../shared/context/StoreProvider";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

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
