import React from "react";
import { Card, Button } from "flowbite-react";
import { Icon } from "@iconify/react";

// --- Types ---
export type AttachmentItemProps = {
  file: string;
  /** Optional absolute/relative URL for download. If not provided, the button is disabled. */
  downloadUrl?: string;
  /** Optional click handler if you want to intercept/handle downloads yourself. */
  onDownload?: (file: string) => void;
  className?: string;
};

export type AttachmentsProps = {
  files: string[];
  /** Optionally provide a function that returns a URL per file (e.g., once backend exists). */
  getDownloadUrl?: (file: string) => string | undefined;
  /** Optional click handler for downloads. */
  onDownload?: (file: string) => void;
  className?: string;
};

// --- Helpers ---
const extToIcon: Record<string, string> = {
  pdf: "mdi:file-pdf-box",
  doc: "mdi:file-word-box",
  docx: "mdi:file-word-box",
  xls: "mdi:file-excel-box",
  xlsx: "mdi:file-excel-box",
  jpg: "mdi:file-image",
  jpeg: "mdi:file-image",
  png: "mdi:file-image",
};

const extToColor: Record<string, string> = {
  pdf: "#DC2626", // red-600
  doc: "#1D4ED8", // blue-700
  docx: "#1D4ED8",
  xls: "#15803D", // green-700
  xlsx: "#15803D",
  jpg: "#CA8A04", // yellow-700
  jpeg: "#CA8A04",
  png: "#CA8A04",
};

const defaultIcon = "mdi:file-document-outline";
const defaultColor = "#2563EB"; // blue-600

function getExt(file: string): string {
  const dot = file.lastIndexOf(".");
  return dot >= 0 ? file.slice(dot + 1).toLowerCase() : "";
}

// --- Single Attachment Item ---
export function AttachmentItem({ file, downloadUrl, onDownload, className }: AttachmentItemProps) {
  const ext = getExt(file);
  const icon = extToIcon[ext] ?? defaultIcon;
  const iconColor = extToColor[ext] ?? defaultColor;

  const isDownloadable = Boolean(downloadUrl || onDownload);

  return (
    <Card
      data-testid="attachment-item"
      className={[
        "max-w-lg w-full p-4 rounded-xl shadow-sm",
        "border border-blue-200",
        "transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
        className ?? ""
      ].join(" ")}
      style={{ backgroundColor: "#ffffff" }}  // separate prop, not inside className
    >
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <Icon icon={icon} width={40} height={40} style={{ color: iconColor }} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-blue-900" title={file}>
            {file}
          </p>

          {/* Download action */}
          {downloadUrl ? (
            <a
              href={downloadUrl}
              className="mt-1 inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
              download
            >
              <Icon icon="mdi:download" width={16} height={16} />
              Download Attachment
            </a>
          ) : (
            <Button
              color="blue"
              size="xs"
              className="mt-2"
              onClick={() => onDownload?.(file)}
              disabled={!onDownload}
              title={!isDownloadable ? "Download will be enabled once the backend is ready." : undefined}
            >
              <span className="inline-flex items-center gap-1">
                <Icon icon="mdi:download" width={16} height={16} />
                Download Attachment
              </span>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

// --- List/Wrapper ---
export default function Attachments({ files, getDownloadUrl, onDownload, className }: AttachmentsProps) {
  if (!files?.length) {
    return (
      <div className={className}>
        <Card className="border border-blue-200 bg-blue-50 shadow-sm">
          <p className="text-sm text-blue-700">No attachments found.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className={["flex flex-col gap-3", className ?? ""].join(" ")}>
      {files.map((file) => (
        <AttachmentItem
          key={file}
          file={file}
          downloadUrl={getDownloadUrl?.(file)}
          onDownload={onDownload}
        />
      ))}
    </div>
  );
}

/*
Usage (frontend-only, no backend yet):

<Attachments
  files={["report.pdf", "syllabus.docx", "grades.xlsx", "diagram.png"]}
  // Once backend exists, you can provide URLs:
  // getDownloadUrl={(file) => `/api/memos/${memoId}/attachments/${encodeURIComponent(file)}`}
  // Or intercept the click yourself:
  // onDownload={(file) => console.log('Download', file)}
/>

Place this file at:
Syllabease/frontend/src/views/Chairperson/memo/partials/attachments.tsx

Make sure Tailwind & Flowbite-React are installed and configured, and that you have `@iconify/react` for icons.
*/
