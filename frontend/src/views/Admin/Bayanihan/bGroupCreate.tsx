import { useState } from "react";
import { Label, TextInput, Select, Button } from "flowbite-react";

interface College {
  college_id: string;
  college_description: string;
}

interface CreateDepartmentProps {
  colleges: College[];
}

export default function CreateDepartment({ colleges }: CreateDepartmentProps) {
  const [formData, setFormData] = useState({
    college_id: "",
    department_code: "",
    department_name: "",
    department_status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Later: send to Django backend with fetch/axios
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create Department</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* College */}
        <div>
          <Label htmlFor="college_id">College</Label>
          <Select
            id="college_id"
            name="college_id"
            required
            value={formData.college_id}
            onChange={handleChange}
          >
            <option value="">-- Select College --</option>
            {colleges.map((college) => (
              <option key={college.college_id} value={college.college_id}>
                {college.college_description}
              </option>
            ))}
          </Select>
        </div>

        {/* Department Code */}
        <div>
          <Label htmlFor="department_code">Code</Label>
          <TextInput
            id="department_code"
            name="department_code"
            required
            value={formData.department_code}
            onChange={handleChange}
          />
        </div>

        {/* Department Name */}
        <div>
          <Label htmlFor="department_name">Name</Label>
          <TextInput
            id="department_name"
            name="department_name"
            required
            value={formData.department_name}
            onChange={handleChange}
          />
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="department_status">Status</Label>
          <Select
            id="department_status"
            name="department_status"
            required
            value={formData.department_status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
        </div>

        {/* Submit */}
        <Button type="submit" color="blue">
          Create Department
        </Button>
      </form>
    </div>
  );
}
