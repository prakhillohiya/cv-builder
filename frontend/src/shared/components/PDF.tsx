import {
  Document,
  PDFViewer,
  Page
} from "@react-pdf/renderer";
import React, { ReactElement } from "react";
import { commonStyles } from "../../CVTemplate/Styles";


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
