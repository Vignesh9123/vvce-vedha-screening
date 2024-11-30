import { Document, Page, Text, StyleSheet, pdf } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    fontSize: 14,
    marginBottom: 10,
  },
  content: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 1.5,
  },
});

const ReportDocument = ({ report }: { report: string }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Interview Assessment Report</Text>
        <Text style={styles.content}>{report}</Text>
      </Page>
    </Document>
  );
};

export const generatePDF = async (report: string): Promise<Blob> => {
  const doc = <ReportDocument report={report} />;
  const blob = await pdf(doc).toBlob();
  return blob;
};

export const downloadPDF = (
  blob: Blob,
  filename: string = "interview-report.pdf"
) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
