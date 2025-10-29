"use client";

import { useState } from "react";
import { Advocate } from "@/types/advocate";

interface AdvocateCardProps {
  advocate: Advocate;
}

export default function AdvocateCard({ advocate }: AdvocateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const toggleSpecialties = () => {
    setIsExpanded(prev => !prev);
  };

  const specialtiesToShow = isExpanded ? advocate.specialties : advocate.specialties.slice(0, 3);
  const hasMore = advocate.specialties.length > 3;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow min-w-0 overflow-hidden">
      <div className="flex gap-3 mb-2">
        <div className="w-[45px] h-[45px] rounded-full bg-blue-500 text-white flex items-center justify-center text-base font-semibold flex-shrink-0">
          {getInitials(advocate.firstName, advocate.lastName)}
        </div>

        <div className="flex-1 min-w-0 overflow-hidden space-y-0.5">
          <div>
            <h3 className="text-[15px] font-semibold break-words leading-snug inline">
              {advocate.firstName} {advocate.lastName}
            </h3>
            <span className="text-gray-500 text-[13px] ml-2 font-normal">
              {advocate.degree}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 text-[13px]">
            <div className="grid grid-cols-[auto_1fr] gap-x-2 items-baseline">
              <span className="text-gray-800 text-xs font-normal break-words">
                {advocate.phoneNumber}
              </span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-2 items-baseline">
              <span className="text-gray-400 font-medium">City</span>
              <span className="font-medium text-gray-800">{advocate.city}</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-2 items-baseline">
              <span className="text-gray-400 font-medium">Experience</span>
              <span className="font-medium text-gray-800">{advocate.yearsOfExperience} yrs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-2">
        <p className="text-xs font-semibold uppercase text-gray-500 mb-2 tracking-wide">
          Specialties
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          {specialtiesToShow.map((specialty, index) => (
            <span
              key={`${specialty}-${advocate.id}-${index}`}
              className="bg-blue-50 text-blue-800 px-2.5 py-1 rounded-md text-[13px] font-medium"
            >
              {specialty}
            </span>
          ))}
          {hasMore && (
            <button
              onClick={toggleSpecialties}
              className="bg-transparent border border-dashed border-blue-300 text-blue-800 px-2.5 py-1 rounded-md text-[13px] font-medium cursor-pointer flex items-center gap-1 transition-all hover:bg-blue-50 hover:border-solid"
            >
              {isExpanded ? (
                <>Show less</>
              ) : (
                <>+{advocate.specialties.length - 3} more</>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
