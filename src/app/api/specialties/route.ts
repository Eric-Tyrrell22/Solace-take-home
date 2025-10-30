import db from "../../../db";

export async function GET() {
  const data = await db.query.specialties.findMany({
    orderBy: (specialties, { asc }) => [asc(specialties.name)],
  });

  return Response.json({ data });
}
