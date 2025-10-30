import { drizzle } from "drizzle-orm/postgres-js";
import { seed } from "drizzle-seed";
import postgres from "postgres";
import * as schema from "./schema";

const specialties = [
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

  await seed(db, schema, {
    count: 15,
  }).refine((funcs) => ({
    advocates: {
      count: 15,
      columns: {
        firstName: funcs.firstName(),
        lastName: funcs.lastName(),
        city: funcs.city(),
        degree: funcs.valuesFromArray({
          values: ["MD", "PhD", "MSW"],
        }),
        specialties: funcs.valuesFromArray({
          values: specialties.map((_, idx, arr) => {
            const start = Math.floor(Math.random() * arr.length);
            const end = Math.floor(Math.random() * (arr.length - start)) + start + 1;
            return arr.slice(start, end);
          }),
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

  console.log("Database seeded successfully!");

  await client.end();
};

main();
