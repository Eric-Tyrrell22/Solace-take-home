import db from "../../../db";
import type { Advocate } from "../../../types/advocate";
import { eq, inArray } from "drizzle-orm";
import { advocates, advocateSpecialties } from "../../../db/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const specialtyId = searchParams.get("specialtyId");

  let advocateIds: number[] | undefined;

  // If specialty filter is provided, get advocate IDs with that specialty
  if (specialtyId) {
    const specialtyIdNum = parseInt(specialtyId, 10);
    const advocatesWithSpecialty = await db
      .select({ advocateId: advocateSpecialties.advocateId })
      .from(advocateSpecialties)
      .where(eq(advocateSpecialties.specialtyId, specialtyIdNum));

    advocateIds = advocatesWithSpecialty.map((row) => row.advocateId);

    // If no advocates found with this specialty, return empty array
    if (advocateIds.length === 0) {
      return Response.json({ data: [] });
    }
  }

  // Build the query with optional advocate ID filter
  const advocatesData = await db.query.advocates.findMany({
    ...(advocateIds && {
      where: inArray(advocates.id, advocateIds),
    }),
    with: {
      advocateSpecialties: {
        with: {
          specialty: true,
        },
      },
    },
  });

  // Map to the Advocate interface, transforming the junction table data
  const data: Advocate[] = advocatesData.map((advocate) => ({
    id: advocate.id,
    firstName: advocate.firstName,
    lastName: advocate.lastName,
    city: advocate.city,
    degree: advocate.degree,
    yearsOfExperience: advocate.yearsOfExperience,
    phoneNumber: advocate.phoneNumber,
    createdAt: advocate.createdAt?.toISOString() ?? new Date().toISOString(),
    specialties: advocate.advocateSpecialties.map((as) => as.specialty.name),
  }));

  return Response.json({ data });
}
