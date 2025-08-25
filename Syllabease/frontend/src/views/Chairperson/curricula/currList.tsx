import React, { useEffect, useState } from "react";
import { Table, Button, Text } from "@mantine/core";

interface Curricula {
  curr_id: number;
  curr_code: string;
  effectivity: string;
  department_code: string;
}

const CurriculaList: React.FC = () => {
  const [curricula, setCurricula] = useState<Curricula[]>([]);

  useEffect(() => {
    // Example mock data (replace with API call later)
    const mockCurricula: Curricula[] = [
      { curr_id: 1, curr_code: "CITC-BSIT-2018-2019", effectivity: "2018-2019", department_code: "BSIT" },
      { curr_id: 2, curr_code: "CITC-BSCS-2020-2021", effectivity: "2020-2021", department_code: "BSCS" },
    ];
    setCurricula(mockCurricula);
  }, []);

  return (
    <div>
      <Text size="xl" style={{ fontWeight: 700, marginBottom: '1rem' }}>Curricula List</Text>

        <Table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th className="px-6 py-3 bg-blue-500 rounded-tl-lg">Curr Code</th>
            <th className="px-6 py-3 bg-blue-500">Effectivity</th>
            <th className="px-6 py-3 bg-blue-500">Department</th>
            <th className="px-6 py-3 bg-blue-500 rounded-tr-lg">Action</th>
            </tr>
        </thead>
        <tbody>
            {curricula.map((curr) => (
            <tr
                key={curr.curr_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
                <td className="px-6 py-4">{curr.curr_code}</td>
                <td className="px-6 py-4">{curr.effectivity}</td>
                <td className="px-6 py-4">{curr.department_code}</td>
                <td className="px-6 py-4 flex gap-2">
                <button className="text-green-600 hover:underline">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
                </td>
            </tr>
            ))}
        </tbody>
        </Table>
    </div>
  );
};

export default CurriculaList;
