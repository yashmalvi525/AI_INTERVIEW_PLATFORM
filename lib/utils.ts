import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { interviewCovers, mappings } from "@/constants/index";

// Merge Tailwind + conditional class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Get a random interview cover image path
export function getRandomInterviewCover(): string {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
}

// Normalize tech name to match mapping keys
const normalizeTechName = (tech: string): string => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings] || key;
};

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// Check if logo exists (placeholder function – needs actual fetch check)
const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

// Get URLs for tech stack logos
export const getTechLogos = async (techArray: string[] | undefined | null) => {
  // Handle undefined/null techArray
  if (!techArray || !Array.isArray(techArray)) {
    return [];
  }
  
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const result = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg", // fallback
    }))
  );

  return result;
};
