import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";

type Tos = {
  tos_id: number;
  tos_no_items: number;
  col_1_per: number;
  col_2_per: number;
  col_3_per: number;
  col_4_per: number;
  col_1_exp: number;
  col_2_exp: number;
  col_3_exp: number;
  col_4_exp: number;
};

type TosRow = {
  tos_r_id: number;
  tos_r_topic: string;
  tos_r_no_hours: number;
  tos_r_percent: number;
  tos_r_no_items: number;
  tos_r_col_1: number;
  tos_r_col_2: number;
  tos_r_col_3: number;
  tos_r_col_4: number;
};

type Props = {
  tos: Tos;
  tos_rows: TosRow[];
};

const TosTable: React.FC<Props> = ({ tos, tos_rows }) => {
  const [rows, setRows] = useState<TosRow[]>(tos_rows);

  const [totals, setTotals] = useState({
    totalCol1: 0,
    totalCol2: 0,
    totalCol3: 0,
    totalCol4: 0,
    totalItems: 0,
    actualRowTotal: 0,
  });

  const roundInputs = () => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        tos_r_no_items: Math.round(row.tos_r_no_items),
        tos_r_col_1: Math.round(row.tos_r_col_1),
        tos_r_col_2: Math.round(row.tos_r_col_2),
        tos_r_col_3: Math.round(row.tos_r_col_3),
        tos_r_col_4: Math.round(row.tos_r_col_4),
      }))
    );
  };

  const calculateTotals = () => {
    let totalCol1 = 0,
      totalCol2 = 0,
      totalCol3 = 0,
      totalCol4 = 0,
      totalItems = 0;

    rows.forEach((r) => {
      totalCol1 += r.tos_r_col_1 || 0;
      totalCol2 += r.tos_r_col_2 || 0;
      totalCol3 += r.tos_r_col_3 || 0;
      totalCol4 += r.tos_r_col_4 || 0;
      totalItems += r.tos_r_no_items || 0;
    });

    setTotals({
      totalCol1,
      totalCol2,
      totalCol3,
      totalCol4,
      totalItems,
      actualRowTotal: totalCol1 + totalCol2 + totalCol3 + totalCol4,
    });
  };

  useEffect(() => {
    roundInputs();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [rows]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: number,
    field: keyof TosRow
  ) => {
    const value = parseInt(e.target.value) || 0;
    setRows((prev) =>
      prev.map((row) =>
        row.tos_r_id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      totals.actualRowTotal !== tos.tos_no_items ||
      totals.totalItems !== tos.tos_no_items
    ) {
      alert("❌ Cannot submit: Actual totals do not match expected values.");
      return;
    }
    alert("✅ Form submitted (frontend only).");
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#dbeafe] to-white py-10">
      <div className="flex flex-col border-2 border-green-500 bg-white bg-opacity-75 w-[500px] rounded-lg h-[70px] mx-auto mb-6">
        <p className="text-center mt-1">
          The cells within the cognitive level are designed to be editable,
          allowing users to input and modify information as needed.
        </p>
      </div>

      <div className="relative mt-2 w-[90%] flex flex-col bg-gradient-to-r from-white to-[#dbeafe] rounded-lg shadow-lg p-8 mx-auto border">
        <div className="mb-4 flex gap-4">
          <Button color="blue" onClick={roundInputs}>
            Round Values
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <table className="w-full table-fixed border border-black bg-white text-sm font-serif">
            <thead>
                <tr>
                <th className="w-[25%] px-2 py-1 border border-black" rowSpan={3}>
                    Topics
                </th>
                <th className="w-[5%] px-2 py-1 border border-black" rowSpan={3}>
                    No. of
                    <br /> Hours
                </th>
                <th className="w-[5%] px-2 py-1 border border-black" rowSpan={3}>
                    %
                </th>
                <th className="w-[5%] px-2 py-1 border border-black" rowSpan={3}>
                    No. of
                    <br /> Test Items
                </th>
                <th
                    colSpan={4}
                    className="w-[45%] px-2 py-1 border border-black text-center"
                >
                    Cognitive Level
                </th>
                <th rowSpan={2} className="w-[10%] px-2 py-1 border border-black"></th>
                </tr>
                <tr>
                <th className="border border-black">Knowledge</th>
                <th className="border border-black">Comprehension</th>
                <th className="border border-black">Application / Analysis</th>
                <th className="border border-black">Synthesis / Evaluation</th>
                </tr>
                <tr>
                <th className="border border-black">{tos.col_1_per}%</th>
                <th className="border border-black">{tos.col_2_per}%</th>
                <th className="border border-black">{tos.col_3_per}%</th>
                <th className="border border-black">{tos.col_4_per}%</th>
                <th className="border border-black">Actual Total</th>
                </tr>
            </thead>
            <tbody>
                {rows.length > 0 ? (
                rows.map((row) => (
                    <tr key={row.tos_r_id} className="hover:bg-gray-50">
                    <td className="border border-black px-2 text-center">
                        {row.tos_r_topic}
                    </td>
                    <td className="border border-black text-center">
                        {row.tos_r_no_hours}
                    </td>
                    <td className="border border-black text-center">
                        {row.tos_r_percent}
                    </td>
                    <td className="border border-black text-center">
                        <input
                        type="number"
                        value={row.tos_r_no_items}
                        onChange={(e) =>
                            handleChange(e, row.tos_r_id, "tos_r_no_items")
                        }
                        className="w-full text-center"
                        min={0}
                        />
                    </td>
                    <td className="border border-black text-center">
                        <input
                        type="number"
                        value={row.tos_r_col_1}
                        onChange={(e) => handleChange(e, row.tos_r_id, "tos_r_col_1")}
                        className="w-full text-center"
                        min={0}
                        />
                    </td>
                    <td className="border border-black text-center">
                        <input
                        type="number"
                        value={row.tos_r_col_2}
                        onChange={(e) => handleChange(e, row.tos_r_id, "tos_r_col_2")}
                        className="w-full text-center"
                        min={0}
                        />
                    </td>
                    <td className="border border-black text-center">
                        <input
                        type="number"
                        value={row.tos_r_col_3}
                        onChange={(e) => handleChange(e, row.tos_r_id, "tos_r_col_3")}
                        className="w-full text-center"
                        min={0}
                        />
                    </td>
                    <td className="border border-black text-center">
                        <input
                        type="number"
                        value={row.tos_r_col_4}
                        onChange={(e) => handleChange(e, row.tos_r_id, "tos_r_col_4")}
                        className="w-full text-center"
                        min={0}
                        />
                    </td>
                    <td className="border border-black text-center">
                        {row.tos_r_col_1 +
                        row.tos_r_col_2 +
                        row.tos_r_col_3 +
                        row.tos_r_col_4}
                    </td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan={8} className="text-center border border-black py-2">
                    No data available
                    </td>
                </tr>
                )}

                <tr className="bg-gray-100 font-semibold">
                <td className="text-right px-2 py-1 border border-black">Actual Total:</td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td
                    className={`border border-black underline text-center ${
                    totals.totalItems !== tos.tos_no_items
                        ? "text-red-600 font-bold"
                        : ""
                    }`}
                >
                    {totals.totalItems}
                </td>
                <td className="border border-black underline text-center">
                    {totals.totalCol1}
                </td>
                <td className="border border-black underline text-center">
                    {totals.totalCol2}
                </td>
                <td className="border border-black underline text-center">
                    {totals.totalCol3}
                </td>
                <td className="border border-black underline text-center">
                    {totals.totalCol4}
                </td>
                <td
                    className={`border border-black underline text-center ${
                    totals.actualRowTotal !== tos.tos_no_items
                        ? "text-red-600 font-bold"
                        : ""
                    }`}
                >
                    {totals.actualRowTotal}
                </td>
                </tr>

                <tr className="bg-gray-100 font-semibold">
                <td className="text-right px-2 py-1 border border-black">
                    Expected Total:
                </td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black text-center">{tos.tos_no_items}</td>
                <td className="border border-black text-center">{tos.col_1_exp}</td>
                <td className="border border-black text-center">{tos.col_2_exp}</td>
                <td className="border border-black text-center">{tos.col_3_exp}</td>
                <td className="border border-black text-center">{tos.col_4_exp}</td>
                <td className="border border-black"></td>
                </tr>
            </tbody>
            </table>

          <Button
            type="submit"
            color="blue"
            className="mt-4 shadow-lg hover:scale-105 transition"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

// ✅ Default wrapper so you don’t get props error
const TosTableWrapper = () => {
  const mockTos: Tos = {
    tos_id: 1,
    tos_no_items: 10,
    col_1_per: 25,
    col_2_per: 25,
    col_3_per: 25,
    col_4_per: 25,
    col_1_exp: 2,
    col_2_exp: 2,
    col_3_exp: 3,
    col_4_exp: 3,
  };

  const mockRows: TosRow[] = [
    {
      tos_r_id: 1,
      tos_r_topic: "Sample Topic 1",
      tos_r_no_hours: 3,
      tos_r_percent: 30,
      tos_r_no_items: 2,
      tos_r_col_1: 1,
      tos_r_col_2: 1,
      tos_r_col_3: 0,
      tos_r_col_4: 0,
    },
    {
      tos_r_id: 2,
      tos_r_topic: "Sample Topic 2",
      tos_r_no_hours: 2,
      tos_r_percent: 20,
      tos_r_no_items: 3,
      tos_r_col_1: 0,
      tos_r_col_2: 1,
      tos_r_col_3: 1,
      tos_r_col_4: 1,
    },
  ];

  return <TosTable tos={mockTos} tos_rows={mockRows} />;
};

export default TosTableWrapper;
