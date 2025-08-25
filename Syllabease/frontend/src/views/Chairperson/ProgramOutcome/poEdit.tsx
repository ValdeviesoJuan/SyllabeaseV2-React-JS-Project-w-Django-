// File: Syllabease/frontend/src/views/Chairperson/ProgramOutcome/PoEdit.tsx
import React, { useState } from "react";
import { Button } from "flowbite-react";

export type ProgramOutcome = {
  letter: string;
  description: string;
};

type PoEditProps = {
  initialOutcomes?: ProgramOutcome[]; // you can provide this from API later
};

export default function PoEdit({ initialOutcomes = [] }: PoEditProps) {
  const [outcomes, setOutcomes] = useState<ProgramOutcome[]>(
    initialOutcomes.length > 0
      ? initialOutcomes
      : [{ letter: "", description: "" }]
  );

  const handleChange = (
    index: number,
    field: keyof ProgramOutcome,
    value: string
  ) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index][field] = value;
    setOutcomes(newOutcomes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Program Outcomes:", outcomes);
    alert("Submit to backend when ready!");
  };

  return (
    <div
      className="mt-14 p-4 pb-10 m-auto w-11/12 bg-gradient-to-r from-[#FFF] to-[#dbeafe] shadow-lg rounded-lg"
      style={{
        backgroundImage: "url('/assets/wave.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundAttachment: "fixed",
        backgroundSize: "contain",
      }}
    >
      <div>
        <img
          className="edit_user_img text-center p-6 mt-4 w-[400px] m-auto mb-6"
          src="/assets/Edit Program Outcomes.png"
          alt="SyllabEase Logo"
        />

        <form onSubmit={handleSubmit}>
          <div className="ml-20 space-y-4">
            {outcomes.map((po, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  placeholder="a."
                  type="text"
                  value={po.letter}
                  onChange={(e) =>
                    handleChange(index, "letter", e.target.value)
                  }
                  className="w-9 border-2 border-solid border-sePrimary text-center"
                  required
                />
                <span>:</span>
                <input
                  placeholder="e.g Apply knowledge of computing, science..."
                  type="text"
                  value={po.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                  className="w-5/6 border-2 border-solid border-seSecondary mb-5"
                  required
                />
              </div>
            ))}

            <div className="text-center">
              <Button type="submit" color="blue" className="mt-6">
                Update Program Outcomes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
