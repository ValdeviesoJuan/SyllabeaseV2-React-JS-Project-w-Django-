import React, { useState } from "react";
import { Button } from "flowbite-react";

interface PoeData {
  poe_code: string;
  poe_description: string;
}

const PoeEdit: React.FC = () => {
  // Mock data from backend (to be replaced with API call later)
  const [poes, setPoes] = useState<PoeData[]>([
    { poe_code: "PEO1", poe_description: "Graduates are proficient in IT field..." },
    { poe_code: "PEO2", poe_description: "Graduates engage in lifelong learning..." },
  ]);

  const handleChange = (index: number, field: keyof PoeData, value: string) => {
    const updatedPoes = [...poes];
    updatedPoes[index][field] = value;
    setPoes(updatedPoes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated PEOs:", poes);
    // TODO: Send update request to Django backend when ready
  };

  return (
    <div className="p-4 mt-14 m-auto w-11/12 bg-gradient-to-r from-white to-blue-100 shadow-lg rounded-lg">
      <div>
        <img
          className="text-center p-6 mt-4 w-[550px] m-auto mb-6"
          src="/assets/Edit Program Educational Objectives.png"
          alt="SyllabEase Logo"
        />
        <div className="mb-10 pb-10">
          <div className="ml-20 items-center">
            <form onSubmit={handleSubmit}>
              <div id="input-container">
                {poes.map((poe, index) => (
                  <div key={index} className="mb-5">
                    <input
                      type="text"
                      value={poe.poe_code}
                      onChange={(e) => handleChange(index, "poe_code", e.target.value)}
                      className="text-center w-14 border-2 border-sePrimary mr-2"
                      required
                    />
                    :
                    <input
                      type="text"
                      value={poe.poe_description}
                      onChange={(e) => handleChange(index, "poe_description", e.target.value)}
                      className="ml-2 w-5/6 border-2 border-seSecondary"
                      required
                    />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button type="submit" color="blue" className="font-semibold px-6 py-2 rounded-lg">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoeEdit;
