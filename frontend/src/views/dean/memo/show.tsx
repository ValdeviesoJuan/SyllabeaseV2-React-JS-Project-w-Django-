import React from "react";
import DeanSidebar from "../../layouts/deanSidebar";
import DeanHeader from "../../layouts/deanHeader";
import { Icon } from "@iconify/react";

const ViewMemo: React.FC = () => {
  // const { id } = useParams<{ id: string }>();
  // const [memo, setMemo] = useState<Memo | null>(null);

  // useEffect(() => {
  //   const fetchMemo = async () => {
  //     try {
  //       const res = await fetch(`/api/memos/${id}`);
  //       if (!res.ok) throw new Error("Failed to fetch memo");
  //       const data: Memo = await res.json();
  //       setMemo(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchMemo();
  // }, [id]);

  // if (!memo) {
  //   return (
  //     <div className="flex">
  //       <DeanSidebar />
  //       <div className="flex-1">
  //         <DeanHeader children={undefined} />
  //         <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
  //           <p className="text-gray-600 dark:text-gray-300">Loading memo...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // const formattedDate = new Date(memo.date).toLocaleDateString("en-US", {
  //   month: "long",
  //   day: "2-digit",
  //   year: "numeric",
  // });

  // const getColor = () => {
  //   switch (memo.color) {
  //     case "green":
  //       return "#22c55e";
  //     case "yellow":
  //       return "#eab308";
  //     case "red":
  //       return "#dc2626";
  //     default:
  //       return "#1f2937";
  //   }
  // };

  return (
    <div className="flex">
      {/* Sidebar & Header */}
      <DeanSidebar />
      <DeanHeader children={undefined} />

      {/* Main Content */}
      <div
        className="flex-1 p-4 mt-14"
        style={{
          backgroundImage: "url(/assets/Wave.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundColor: "#EEEEEE",
          minHeight: "100vh",
        }}
      >
        <div className="max-w-5xl ml-auto shadow rounded-lg bg-white p-6">
          {/* Title + Metadata */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              {/* {memo.title} */} Sample Memo Title
            </h1>
            <p className="text-sm text-gray-500">
              {/* {formattedDate} */} January 01, 2024
            </p>
            <p className="text-sm text-gray-500">
              Uploaded by: John Doe (johndoe@email.com)
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 whitespace-pre-line break-words">
              {/* {memo.description} */}
              This is a placeholder description for the memo. You can add
              multiple lines of content here, and it will auto-wrap to keep the
              layout clean.
            </p>
          </div>

          {/* Attachments Section */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Attachments
            </h2>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-100 p-3 rounded hover:bg-gray-200 transition"
              >
                <Icon icon="mdi:file-pdf-box" className="text-red-500" />
                agenda.pdf
              </a>
              <a
                href="#"
                className="flex items-center gap-2 bg-gray-100 p-3 rounded hover:bg-gray-200 transition"
              >
                <Icon icon="mdi:file-word-box" className="text-blue-500" />
                guide.docx
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <a
              href="/dean/memos"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Back to Memos
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMemo;
