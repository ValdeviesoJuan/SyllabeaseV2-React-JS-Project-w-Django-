import React, { useState } from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";
import { useNavigate } from "react-router-dom";

const EditMemo: React.FC = () => {
  const navigate = useNavigate();

  // Dummy initial data (replace with props or fetch)
  const [title, setTitle] = useState("Sample Memo Title");
  const [description, setDescription] = useState("Sample description text...");
  const [date, setDate] = useState("2025-08-30");
  const [fileName, setFileName] = useState("current_memo.pdf");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle PUT/POST request here
    console.log({ title, description, date });
    alert("Memo updated!");
    navigate("/dean/memos");
  };

  return (
    <div className="flex">
              {/* Sidebar and Header */}
              <DeanSidebar />
              <DeanHeader children={undefined} />
        
              {/* Main content area */}
              <div
                className="flex-1 p-4 mt-14"
                style={{
                    backgroundImage: 'url(/assets/Wave.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                    backgroundAttachment: 'fixed',
                    backgroundSize: 'cover', 
                    backgroundColor: '#EEEEEE',
                    minHeight: '100vh',
                }}
                >
          {/* Centered Container */}
          <div className="mt-12 max-w-2xl mx-auto shadow rounded-lg bg-white p-6 dark:bg-gray-800">
            {/* Close button */}
            <button
              onClick={() => navigate("/dean/memos")}
              className="text-gray-600 hover:text-red-600 text-2xl font-bold float-right"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Edit Memo
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium">
                  Upload New File (optional)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
                  onChange={(e) =>
                    setFileName(e.target.files?.[0]?.name || fileName)
                  }
                />
                <p className="text-sm text-gray-500 mt-1">
                  Current File: <strong>{fileName}</strong>
                </p>
              </div>

              {/* Submit */}
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Update Memo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
   
  );
};

export default EditMemo;
