import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import { z } from "zod";


if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
}


const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});


const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(" Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

const env = parsed.data;

export default defineConfig({
  schema: "./lib/drizzle/schema.ts",
  out: "./lib/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  strict: true,
  verbose: env.NODE_ENV !== "production",
});