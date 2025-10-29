"use client";

import { useState } from "react";
import { Advocate } from "@/types/advocate";
import AdvocateCard from "./AdvocateCard";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export default function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAdvocates = advocates.filter((advocate) => {
    const search = searchTerm.toLowerCase();

    return (
      advocate.firstName.toLowerCase().includes(search) ||
      advocate.lastName.toLowerCase().includes(search) ||
      advocate.city.toLowerCase().includes(search) ||
      advocate.degree.toLowerCase().includes(search) ||
      advocate.specialties.some((specialty) =>
        specialty.toLowerCase().includes(search)
      ) ||
      advocate.yearsOfExperience.toString().includes(search) ||
      advocate.phoneNumber.toString().includes(search)
    );
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = () => {
    setSearchTerm("");
  };

  return (
    <div className="p-3 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <p className="text-xl font-semibold mb-2">Search</p>
        <p className="mb-4 text-gray-600 text-sm">
          Searching for: <span className="font-medium">{searchTerm || "all advocates"}</span>
        </p>
        <div className="flex gap-2 flex-wrap justify-center">
          <input
            className="border border-gray-300 px-4 py-2 rounded-md text-base flex-[1_1_200px] min-w-0"
            placeholder="Search advocates..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer font-medium whitespace-nowrap flex-[0_1_auto]"
          >
            Reset Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-4">
        {filteredAdvocates.map((advocate) => (
          <AdvocateCard key={advocate.id} advocate={advocate} />
        ))}
      </div>

      {filteredAdvocates.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          No advocates found matching your search.
        </div>
      )}
    </div>
  );
}
