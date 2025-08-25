import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableHeadCell,
  TableRow,
  TableBody,
  TableCell,
  Button,
  TextInput,
} from "flowbite-react";
import { Icon } from "@iconify/react";
import Attachments from "./partials/attachments";

interface Memo {
  id: number;
  subject: string;
  sender: string;
  date: string;
  attachments: string[];
  color: string;
}

const ChairMemo: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "tile">("table");
  const [readMemos, setReadMemos] = useState<number[]>([]);

  useEffect(() => {
    // Example mock memos (replace with API later)
    const demoMemos: Memo[] = [
      {
        id: 1,
        subject: "Exam Guidelines",
        sender: "Dean",
        date: "2025-08-25",
        attachments: ["exam.pdf", "schedule.docx"],
        color: "#E0F2FE",
      },
      {
        id: 2,
        subject: "Meeting Reminder",
        sender: "Chairperson",
        date: "2025-08-20",
        attachments: ["agenda.xlsx"],
        color: "#FEF3C7",
      },
    ];
    setMemos(demoMemos);

    const storedRead = localStorage.getItem("readMemos");
    if (storedRead) setReadMemos(JSON.parse(storedRead));
  }, []);

  const markAsRead = (id: number) => {
    if (!readMemos.includes(id)) {
      const updated = [...readMemos, id];
      setReadMemos(updated);
      localStorage.setItem("readMemos", JSON.stringify(updated));
    }
  };

  const filteredMemos = memos.filter((m) =>
    m.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <TextInput
          type="text"
          placeholder="Search memos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
        />
        <div className="flex gap-2">
          <Button
            color={viewMode === "table" ? "blue" : "gray"}
            onClick={() => setViewMode("table")}
          >
            Table View
          </Button>
          <Button
            color={viewMode === "tile" ? "blue" : "gray"}
            onClick={() => setViewMode("tile")}
          >
            Tile View
          </Button>
        </div>
      </div>

      {viewMode === "table" ? (
        <Table className="shadow-md rounded-lg overflow-hidden">
          <TableHead>
            <TableRow>
              <TableHeadCell>Subject</TableHeadCell>
              <TableHeadCell>From</TableHeadCell>
              <TableHeadCell>Date</TableHeadCell>
              <TableHeadCell>Attachments</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMemos.map((memo) => (
              <TableRow
                key={memo.id}
                className={`cursor-pointer transition hover:bg-blue-50 ${
                  readMemos.includes(memo.id) ? "opacity-60" : ""
                }`}
                onClick={() => markAsRead(memo.id)}
                style={{ borderLeft: `6px solid ${memo.color}` }}
              >
                <TableCell>{memo.subject}</TableCell>
                <TableCell>{memo.sender}</TableCell>
                <TableCell>{memo.date}</TableCell>
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    <Attachments
                        key={memo.id}
                        files={memo.attachments}
                        getDownloadUrl={(file) =>
                            `/api/memos/${memo.id}/attachments/${encodeURIComponent(file)}`
                        }
                        />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMemos.map((memo) => (
            <div
              key={memo.id}
              className={`rounded-lg shadow-md p-4 cursor-pointer transition hover:shadow-lg ${
                readMemos.includes(memo.id) ? "opacity-60" : ""
              }`}
              onClick={() => markAsRead(memo.id)}
              style={{ borderLeft: `6px solid ${memo.color}` }}
            >
              <h3 className="font-semibold text-lg text-blue-900 truncate">
                {memo.subject}
              </h3>
              <p className="text-sm text-gray-600">From: {memo.sender}</p>
              <p className="text-sm text-gray-600">Date: {memo.date}</p>
              <div className="flex gap-2 flex-wrap mt-2">
                <Attachments
                key={memo.id}
                files={memo.attachments}
                getDownloadUrl={(file) =>
                    `/api/memos/${memo.id}/attachments/${encodeURIComponent(file)}`
                }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChairMemo;
