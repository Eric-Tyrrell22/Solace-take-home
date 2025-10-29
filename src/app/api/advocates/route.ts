import db from "../../../db";
import type { Advocate } from "../../../types/advocate";

export async function GET() {
  const advocatesData = await db.query.advocates.findMany({
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
