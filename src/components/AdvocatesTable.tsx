"use client";

import { useState } from "react";
import { Advocate } from "@/types/advocate";

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
    <div>
      <div>
        <p>Search</p>
        <p>
          Searching for: <span>{searchTerm}</span>
        </p>
        <input
          style={{ border: "1px solid black" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleReset}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => (
            <tr key={advocate.id}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((specialty, index) => (
                  <div key={`${specialty}-${advocate.id}`}>{specialty}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
