"use client";

import { useState } from "react";
import { Advocate } from "@/types/advocate";
import { Specialty } from "@/app/page";
import AdvocateCard from "./AdvocateCard";

interface AdvocatesTableProps {
  advocates: Advocate[];
  specialties: Specialty[];
  selectedSpecialty: string;
  onSpecialtyChange: (specialty: string) => void;
}

export default function AdvocatesTable({
  advocates,
  specialties,
  selectedSpecialty,
  onSpecialtyChange,
}: AdvocatesTableProps) {
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
    onSpecialtyChange("");
  };

  return (
    <div className="p-3 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <p className="text-xl font-semibold mb-2">Search</p>
        <p className="mb-4 text-gray-600 text-sm">
          Searching for: <span className="font-medium">{searchTerm || "all advocates"}</span>
        </p>
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          <input
            className="border border-gray-300 px-4 py-2 rounded-md text-base flex-[1_1_200px] min-w-0"
            placeholder="Search advocates..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-4">
          <select
            id="specialty-filter"
            value={selectedSpecialty}
            onChange={(e) => onSpecialtyChange(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md text-base flex-[1_1_200px] min-w-0"
          >
            <option value="">All Specialties</option>
            {specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-md cursor-pointer font-medium whitespace-nowrap flex-[0_1_auto]"
          >
            Reset Filters
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
