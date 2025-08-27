import { useEffect, useState } from "react";
import BLHeader from "../layouts/bl_header";
import BLSidebar from "../layouts/bl_sidebar";
import { Button, Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell } from "flowbite-react";

type Syll = {
  dl_syll?: string | null; // ISO date string
  message?: string;
  notifId?: string | number;
  dismissUrl?: string;
};

type Props = {
  initialSyll?: Syll | null;
};

export default function SyllabusList({ initialSyll = null }: Props) {
  // If you're integrating with Django later you can inject `window.__INITIAL_SYLL__` or similar
  const [syll] = useState<Syll | null>(() => {
    try {
      // read from global if present (convention for server-side injection)
      const globalAny: any = window as any;
      return globalAny.__INITIAL_SYLL__ ?? initialSyll;
    } catch (e) {
      return initialSyll;
    }
  });

  const [showNotif, setShowNotif] = useState<boolean>(() => Boolean(syll && (syll.message || syll.notifId)));
  const [remaining, setRemaining] = useState<string | null>(null);

  useEffect(() => {
    if (!syll || !syll.dl_syll) return;
    const dueDate = new Date(syll.dl_syll);
    if (isNaN(dueDate.getTime())) return;

    function updateRemainingTime() {
      const now = new Date();
      const diff = dueDate.getTime() - now.getTime();
      if (diff <= 0) {
        setRemaining("Expired");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }

    updateRemainingTime();
    const id = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(id);
  }, [syll]);

  function dismissNotif() {
    // If you later wire this to a backend route, replace this with fetch(syll.dismissUrl)
    if (syll && syll.dismissUrl) {
      fetch(syll.dismissUrl, { method: "POST" })
        .then(() => setShowNotif(false))
        .catch(() => setShowNotif(false));
    } else {
      setShowNotif(false);
    }
  }

  // Placeholder syllabus rows (frontend only). Replace with real data when ready.
  const placeholderRows = [
    { id: 1, title: "Intro to Programming", owner: "Prof. Santos", updated: "2025-06-12" },
    { id: 2, title: "Data Structures", owner: "Prof. Reyes", updated: "2025-03-02" },
  ];

  return (


    <div className="min-h-screen bg-[#EEEEEE]" style={{
          backgroundImage: "url('/assets/Wave.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "contain",
        }}>
      {/* Background wave image - put your asset in public/assets/Wave.png or change path */}
      <div
        className="fixed inset-0 pointer-events-none"
      />

      {/* Header + Sidebar layout */}
      
      <div className="flex">
        <div className="w-64">
          <BLSidebar />
          <BLHeader />
        </div>

        <main className="flex-1 p-8">
          {/* Floating notification (mimics the blade notif block) */}
          {showNotif && (
            <div className="fixed top-6 right-6 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 px-6 py-4 rounded shadow-lg z-50 w-96 flex items-start space-x-3">
              <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>

              <div className="flex-1 text-sm font-medium">
                {syll?.message ?? "New Notification"}
                {remaining && <div id="remaining-time" className="text-xs font-normal text-gray-600">Remaining: {remaining}</div>}
              </div>

              <button onClick={dismissNotif} className="ml-4 text-sm text-yellow-900 hover:text-yellow-700 font-semibold underline">
                Dismiss
              </button>
            </div>
          )}

          <div className="m-auto p-8 bg-white mt-[5%] shadow-lg rounded-lg w-full max-w-6xl">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-bold text-4xl text-[#201B50]">List of Syllabus</h1>

              <a
                href="#create-syllabus"
                className="whitespace-nowrap rounded mr-1.5 hover:scale-105 transition ease-in-out p-2 text-black font-semibold flex items-center gap-2 max-w-full"
                style={{ background: "#d7ecf9" }}
                onMouseOver={(e) => ((e.currentTarget.style.background = "#c3dff3"))}
                onMouseOut={(e) => ((e.currentTarget.style.background = "#d7ecf9"))}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8v8M8 12h8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                </svg>
                Create Syllabus
              </a>
            </div>

            {/* Replace this table with real data when backend is ready. Using Flowbite Table for styling */}
            <Table>
              <TableHead>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Owner</TableHeadCell>
                <TableHeadCell>Last Updated</TableHeadCell>
                <TableHeadCell className="text-right">Actions</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {placeholderRows.map((r) => (
                  <TableRow key={r.id} className="bg-white">
                    <TableCell className="font-medium">{r.title}</TableCell>
                    <TableCell>{r.owner}</TableCell>
                    <TableCell>{r.updated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm">Open</Button>
                        <Button size="sm" color="gray">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
}
