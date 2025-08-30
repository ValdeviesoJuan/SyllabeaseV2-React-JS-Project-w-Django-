/** 
import React from "react";
import { Icon } from "@iconify/react";

const FileCard = ({ file, onDownload }) => {
  // ✅ JS function to determine icon & color (instead of PHP match)
  const getFileData = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();

    const iconMap = {
      pdf: "mdi:file-pdf-box",
      doc: "mdi:file-word-box",
      docx: "mdi:file-word-box",
      xls: "mdi:file-excel-box",
      xlsx: "mdi:file-excel-box",
      jpg: "mdi:file-image",
      jpeg: "mdi:file-image",
      png: "mdi:file-image",
    };

    const colorMap = {
      pdf: "#DC2626",
      doc: "#1D4ED8",
      docx: "#1D4ED8",
      xls: "#15803D",
      xlsx: "#15803D",
      jpg: "#CA8A04",
      jpeg: "#CA8A04",
      png: "#CA8A04",
    };

    return {
      icon: iconMap[ext] || "mdi:file-document-outline",
      color: colorMap[ext] || "#2563EB",
    };
  };

  const { icon, color } = getFileData(file);

  return (
    <div
      className="flex items-center gap-4 border rounded-lg p-4 shadow-md max-w-lg transition duration-200"
      style={{
        backgroundColor: "#E8F1FF",
        borderColor: "#B3D4FC",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* File Icon 
      <div className="flex-shrink-0">
        <Icon icon={icon} width="40" height="40" style={{ color }} />
      </div>

      {/* File Info 
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-semibold truncate" style={{ color: "#1E3A8A" }}>
          {file}
        </p>
        <button
          onClick={onDownload}
          className="text-sm flex items-center gap-1 mt-1 hover:underline"
          style={{ color: "#2563EB" }}
        >
          <Icon icon="mdi:download" width="16" height="16" />
          Download Attachment
        </button>
      </div>
    </div>
  );
};

export default FileCard;
*/
