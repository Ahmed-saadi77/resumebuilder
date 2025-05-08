
import React from "react";

interface LivePreviewProps {
  title: string;
  fullName: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
  containerWidth: number;
  id: string | undefined;
}

const LivePreview = ({
  title,
  fullName,
  summary,
  experience,
  education,
  skills,
  containerWidth,
}: LivePreviewProps) => {
  return (
    <div
      style={{
        transform: containerWidth > 150 ? "scale(1)" : "scale(0.8)",
        maxWidth: containerWidth > 150 ? "70%" : "60%",
        overflowWrap: "break-word",
        wordWrap: "break-word",
      }}
      className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md space-y-10"
    >
      <h2 className="text-lg font-semibold border-b pb-2 mb-2">Live Preview</h2>
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>Full Name:</strong> {fullName}
      </p>
      <p>
        <strong>Summary:</strong> {summary}
      </p>
      <p>
        <strong>Experience:</strong> {experience}
      </p>
      <p>
        <strong>Education:</strong> {education}
      </p>
      <p>
        <strong>Skills:</strong> {skills}
      </p>
    </div>
  );
};

export default LivePreview;
