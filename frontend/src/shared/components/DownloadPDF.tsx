import {
  Document,
  PDFDownloadLink,
  Page
} from "@react-pdf/renderer";
import React from "react";

import { Icon } from "@iconify/react";
import { Box, Fab, LinearProgress, Tooltip } from "@mui/material";
import LeftSection from "../../CVTemplate/LeftSection";
import RightSection from "../../CVTemplate/RightSection";
import { commonStyles } from "../../CVTemplate/Styles";
import { ICV } from "./CV";

const DownloadPDF: React.FC<{ cv: ICV }> = ({ cv }) => {
  return (
    <div className="flex justify-center">
      <PDFDownloadLink
        document={
          <Document>
            <Page size="A4" style={commonStyles.page}>
              <LeftSection cv={cv} />
              <RightSection cv={cv} />
            </Page>
          </Document>
        }
        fileName={`${cv.title}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            <span className="p-8">
              <Tooltip title="Download PDF" arrow>
                <Fab color="primary" aria-label="download">
                  <Icon
                    icon={"uiw:download"}
                    width={"1.5rem"}
                    height={"1.5rem"}
                  />
                </Fab>
              </Tooltip>
            </span>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default DownloadPDF;
