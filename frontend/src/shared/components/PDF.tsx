import React, { ReactElement, ReactNode, useContext } from "react";
import {
  Document,
  Page,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { commonStyles } from "../../CVTemplate/Styles";
import CVTemplate from "../../CVTemplate/CVTemplate";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";


export interface IPDF{
  children:ReactElement
  width:string
}

const PDF: React.FC<IPDF> = ({ children,width }) => {
  
  return (
    <div style={{ flexGrow: 1 }}>
      <PDFViewer
        showToolbar={false}
        style={{
          width: width,
          height: "75vh",
        }}
      >
        <Document>
          <Page size="A4" style={commonStyles.page}>
            {children}
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default PDF;
