
import React, { useState } from "react";
import "../../../index.css";

// Mock data for chairpersons
const mockChairs = [
	{
		ur_id: 1,
		firstname: "Juan",
		lastname: "Valdevieso",
		department_code: "CS",
		start_validity: "2024-09-01",
		end_validity: "2025-08-31",
	},
	{
		ur_id: 2,
		firstname: "Maria",
		lastname: "Santos",
		department_code: "MATH",
		start_validity: "2024-09-01",
		end_validity: "2025-08-31",
	},
];

const ChairPerson: React.FC = () => {
	const [chairs, setChairs] = useState(mockChairs);
	const [page] = useState(1);
	const [lastPage] = useState(1);

	const handleEdit = (ur_id: number) => {
		alert(`Edit chairperson with ur_id: ${ur_id} (Frontend only demo)`);
	};

	const handleDelete = (ur_id: number) => {
		if (window.confirm("Are you sure you want to delete this chairperson?")) {
			setChairs(chairs.filter((chair) => chair.ur_id !== ur_id));
		}
	};

	return (
		<div className="p-4 pb-4 shadow bg-white border-dashed rounded-lg dark:border-gray-700 mt-14 min-h-screen" style={{ backgroundImage: 'url(/assets/Wave.png)', backgroundRepeat: 'no-repeat', backgroundPosition: 'top', backgroundAttachment: 'fixed', backgroundSize: 'contain', backgroundColor: '#EEEEEE' }}>
			<div className="flex justify-center align-items-center">
				<div className="min-w-full inline-block align-middle">
					<div className="overflow-hidden">
						<div className="flex justify-between items-center mb-2 mt-2">
							<h2 className="font-bold text-4xl text-[#201B50]">Chairperson</h2>
							<button
								className="whitespace-nowrap w-50 rounded-xl mr-1.5 hover:scale-105 w-max transition ease-in-out p-2 text-black font-semibold flex items-center gap-2 max-w-full"
								style={{ background: '#d7ecf9' }}
								onMouseOver={e => (e.currentTarget.style.background = '#c3dff3')}
								onMouseOut={e => (e.currentTarget.style.background = '#d7ecf9')}
								onClick={() => alert('Navigate to create chairperson (Frontend only demo)')}
							>
								<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 8v8M8 12h8" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									<circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
								</svg>
								Assign a new Chairperson
							</button>
						</div>
						<div className="overflow-x-auto w-full pt-6">
							<table className="w-full mt-12 bg-white shadow-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="rounded text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr className="bg-blue text-sm text-white">
										<th className="bg-blue5 rounded-tl-lg px-6 py-3">Name</th>
										<th className="bg-blue5 px-6 py-3">Department Code</th>
										<th className="bg-blue5 px-6 py-3">Start of Validity</th>
										<th className="bg-blue5 px-6 py-3">End of Validity</th>
										<th className="bg-blue5 px-6 py-3"></th>
										<th className="bg-blue5 rounded-tr-lg px-6 py-3"></th>
									</tr>
								</thead>
								<tbody>
									{chairs.map((chair, idx) => (
										<tr
											key={chair.ur_id}
											className={`${idx % 2 === 0 ? 'bg-white' : 'bg-[#e9edf7]'} border- dark:bg-gray-800 dark:border-gray-700 hover:bg-gray4 dark:hover:bg-gray-600`}
										>
											<td className="px-6 py-4 text-sm">{chair.lastname}, {chair.firstname}</td>
											<td className="px-6 py-4">{chair.department_code}</td>
											<td className="px-6 py-4">{chair.start_validity}</td>
											<td className="px-6 py-4">{chair.end_validity}</td>
											<td>
												<button
													className="text-green font-medium hover:scale-105 mt-1"
													onClick={() => handleEdit(chair.ur_id)}
												>
													Edit
												</button>
											</td>
											<td>
												<button
													className="text-red font-medium hover:scale-105 mt-1"
													onClick={() => handleDelete(chair.ur_id)}
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="pagination">
								<div className="flex justify-center">
									<span className="mt-6 text-gray-600 text-sm">Page {page} of {lastPage}</span>
								</div>
								{/* Pagination controls can be added here if needed */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChairPerson;
