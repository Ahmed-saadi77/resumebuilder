// components/PDFDownloadButton.tsx
"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import CVDocument from "../app/components/CVDocument";
import { Button } from "@/components/ui/button";

interface Props {
  resume: {
    id?: string; 
    title: string;
    fullName: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
  };
}

export default function PDFDownloadButton({ resume }: Props) {

  return (
    <PDFDownloadLink
      document={<CVDocument resume={resume} />}
      fileName={`${resume.fullName || "resume"}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <Button disabled>Generating PDF...</Button>
        ) : (
          <Button>Download CV as PDF</Button>
        )
      }
    </PDFDownloadLink>
  );
};
