"use client";

import { useState, useEffect } from "react";
import AdvocatesTable from "@/components/AdvocatesTable";
import { Advocate } from "@/types/advocate";

export interface Specialty {
  id: number;
  name: string;
}

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch specialties on mount
    fetch("/api/specialties")
      .then((res) => res.json())
      .then((json) => setSpecialties(json.data));
  }, []);

  useEffect(() => {
    // Fetch advocates when selected specialty changes
    setLoading(true);
    const url = selectedSpecialty
      ? `/api/advocates?specialtyId=${selectedSpecialty}`
      : "/api/advocates";

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setAdvocates(json.data);
        setLoading(false);
      });
  }, [selectedSpecialty]);

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <AdvocatesTable
          advocates={advocates}
          specialties={specialties}
          selectedSpecialty={selectedSpecialty}
          onSpecialtyChange={setSelectedSpecialty}
        />
      )}
    </main>
  );
}
