import { drizzle } from "drizzle-orm/postgres-js";
import { seed } from "drizzle-seed";
import postgres from "postgres";
import * as schema from "./schema";

const specialtiesList = [
  "Bipolar",
  "LGBTQ",
  "Medication/Prescribing",
  "Suicide History/Attempts",
  "General Mental Health (anxiety, depression, stress, grief, life transitions)",
  "Men's issues",
  "Relationship Issues (family, friends, couple, etc)",
  "Trauma & PTSD",
  "Personality disorders",
  "Personal growth",
  "Substance use/abuse",
  "Pediatrics",
  "Women's issues (post-partum, infertility, family planning)",
  "Chronic pain",
  "Weight loss & nutrition",
  "Eating disorders",
  "Diabetic Diet and nutrition",
  "Coaching (leadership, career, academic and wellness)",
  "Life coaching",
  "Obsessive-compulsive disorders",
  "Neuropsychological evaluations & testing (ADHD testing)",
  "Attention and Hyperactivity (ADHD)",
  "Sleep issues",
  "Schizophrenia and psychotic disorders",
  "Learning disorders",
  "Domestic abuse",
];

const main = async () => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const client = postgres(databaseUrl);
  const db = drizzle(client, { schema });

  console.log("Seeding database...");

  // Clear existing data
  await db.delete(schema.advocateSpecialties);
  await db.delete(schema.advocates);
  await db.delete(schema.specialties);

  await seed(db, schema).refine((funcs) => ({
    specialties: {
      count: specialtiesList.length,
      columns: {
        name: funcs.valuesFromArray({
          values: specialtiesList,
        }),
      },
    },
    advocates: {
      count: 15,
      columns: {
        firstName: funcs.firstName(),
        lastName: funcs.lastName(),
        city: funcs.city(),
        degree: funcs.valuesFromArray({
          values: ["MD", "PhD", "MSW"],
        }),
        yearsOfExperience: funcs.int({
          minValue: 1,
          maxValue: 15,
        }),
        phoneNumber: funcs.phoneNumber({
          template: "555#######",
        }),
      },
    },
  }));

  // Manually seed advocate_specialties to ensure uniqueness
  const advocateSpecialtiesData = [];
  for (let advocateId = 1; advocateId <= 15; advocateId++) {
    // Randomly select 3 unique specialties for each advocate
    const selectedSpecialties = new Set<number>();
    while (selectedSpecialties.size < 3) {
      const specialtyId = Math.floor(Math.random() * specialtiesList.length) + 1;
      selectedSpecialties.add(specialtyId);
    }

    for (const specialtyId of selectedSpecialties) {
      advocateSpecialtiesData.push({
        advocateId,
        specialtyId,
      });
    }
  }

  await db.insert(schema.advocateSpecialties).values(advocateSpecialtiesData);

  console.log("Database seeded successfully!");

  await client.end();
};

main();
