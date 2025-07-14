import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-13";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "kiiaxm1k";

export const useCdn = process.env.NODE_ENV === "production";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
