import { Page, Text, Document, StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 6,
  },
  sectionContent: {
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 12,
    marginBottom: 4,
  },
});

interface ResumeProps {
  title: string;
  fullName: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
}

const CvDocument = ({ resume }: { resume: ResumeProps }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Name & Title */}
      <Text style={styles.sectionHeading}>{resume.fullName}</Text>
      <Text style={styles.sectionContent}>{resume.title}</Text>

      {/* Summary */}
      <Text style={styles.sectionHeading}>Summary</Text>
      <View style={styles.line} />
      <Text style={styles.sectionContent}>{resume.summary}</Text>

      {/* Experience */}
      <Text style={styles.sectionHeading}>Experience</Text>
      <View style={styles.line} />
      {resume.experience.split('\n').map((item, index) => (
        <Text key={index} style={styles.bulletPoint}>• {item}</Text>
      ))}

      {/* Education */}
      <Text style={styles.sectionHeading}>Education</Text>
      <View style={styles.line} />
      {resume.education.split('\n').map((item, index) => (
        <Text key={index} style={styles.bulletPoint}>• {item}</Text>
      ))}

      {/* Skills */}
      <Text style={styles.sectionHeading}>Skills</Text>
      <View style={styles.line} />
      {resume.skills.split(',').map((skill, index) => (
        <Text key={index} style={styles.bulletPoint}>• {skill.trim()}</Text>
      ))}
    </Page>
  </Document>
);

export default CvDocument;
