import React, { useMemo } from "react";
import { Card, Button } from "flowbite-react";
import Attachments from "./partials/attachments";

// --- Types ---
export type MemoUser = {
  firstname: string;
  lastname: string;
  email?: string;
};

export type ShowMemo = {
  id: string | number;
  title: string;
  description: string;
  date: string; // ISO or parseable date string
  color?: "green" | "yellow" | "red" | string;
  user?: MemoUser | null;
  file_name?: string[] | string | null; // can be JSON string from legacy
};

export type ShowChairMemoProps = {
  memo: ShowMemo;
  /** Build a download URL for a given filename once backend exists. */
  getDownloadUrl?: (file: string) => string | undefined;
  /** Navigate back to the list; if not provided, falls back to history.back(). */
  onBack?: () => void;
  /** Optional static href for back nav if you prefer a link. */
  backHref?: string;
  className?: string;
};

const titleColor = (color?: string) => {
  switch ((color || "").toLowerCase()) {
    case "green":
      return "#22c55e"; // green-500
    case "yellow":
      return "#eab308"; // yellow-500
    case "red":
      return "#dc2626"; // red-600
    default:
      return "#1f2937"; // gray-800
  }
};

export default function ShowChairMemo({ memo, getDownloadUrl, onBack, backHref, className }: ShowChairMemoProps) {
  // normalize files to an array
  const files: string[] = useMemo(() => {
    if (!memo.file_name) return [];
    if (Array.isArray(memo.file_name)) return memo.file_name;

    // handle JSON string coming from older data
    try {
      const parsed = JSON.parse(memo.file_name);
      return Array.isArray(parsed) ? (parsed as string[]) : [String(memo.file_name)];
    } catch {
      return [String(memo.file_name)];
    }
  }, [memo.file_name]);

  const handleBack = () => {
    if (onBack) return onBack();
    if (backHref) return (window.location.href = backHref);
    // default fallback
    if (window.history.length > 1) window.history.back();
  };

  return (
    <div
      style={{ backgroundImage: "url('/assets/Wave.png')" }}
      className={[
        "min-h-screen p-4 md:p-6",
        "bg-[#EEEEEE]",
        "bg-no-repeat bg-top bg-contain bg-fixed",
        className ?? "",
      ].join(" ")}
    >
      <Card className="mt-12 max-w-4xl mx-auto shadow rounded-lg">
        {/* Header */}
        <div className="mb-6">
          <h1
            className="text-2xl font-bold break-words"
            style={{ color: titleColor(memo.color) }}
            title={memo.title}
          >
            {memo.title}
          </h1>
          <p className="text-sm text-gray-500">
            {new Date(memo.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </p>
          {memo.user && (
            <p className="text-sm text-gray-500">
              Uploaded by: <span className="font-medium">{memo.user.firstname} {memo.user.lastname}</span>
              {memo.user.email ? <span> ({memo.user.email})</span> : null}
            </p>
          )}
        </div>

        <hr className="mb-6" />

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700 whitespace-pre-line">{memo.description}</p>
        </div>

        {/* Attachments */}
        {files.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {files.length > 1 ? "Attachments" : "Attachment"}
            </h2>
            <Attachments
              files={files}
              getDownloadUrl={getDownloadUrl}
              className="space-y-3"
            />
          </div>
        )}

        {/* Back Button */}
        <div className="flex justify-end">
          {backHref ? (
            <a
              href={backHref}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Back to Memos
            </a>
          ) : (
            <Button color="light" onClick={handleBack}>
              Back to Memos
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

/*
Placement:
Syllabease/frontend/src/views/Chairperson/memo/showChairMemo.tsx

This component mirrors the Blade view `showChairMemo.blade.php` using:
- Tailwind for styles and the background.
- Flowbite-React `Card` and `Button`.
- Your Attachments list component at `./partials/attachments` (Option A API: `files: string[]`).

Usage example (frontend-only, no backend yet):

import ShowChairMemo, { ShowMemo } from "./showChairMemo";

const memo: ShowMemo = {
  id: 1,
  title: "Safety Protocols Update",
  description: "Please review the updated laboratory safety protocols.\n- Wear PPE\n- Follow SOPs",
  date: "2025-08-10",
  color: "yellow",
  user: { firstname: "Jane", lastname: "Doe", email: "jane@example.com" },
  file_name: ["protocols.pdf", "signoff.docx"],
};

export default function Demo() {
  return (
    <ShowChairMemo
      memo={memo}
      // Provide once you have a backend route; otherwise omit and the Download buttons will fallback to a disabled state handled by the child component.
      // getDownloadUrl={(file) => `/api/memos/${memo.id}/attachments/${encodeURIComponent(file)}`}
      backHref="/chair/memo"
    />
  );
}
*/
