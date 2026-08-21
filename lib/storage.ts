"use client";

import type { Migration } from "@/lib/types";

const UPVOTED_KEY = "techregret_upvoted";
const SUBMISSIONS_KEY = "techregret_submissions";

export function getUpvoted(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(UPVOTED_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function toggleUpvote(id: string): boolean {
  const current = getUpvoted();
  const has = current.includes(id);
  const next = has ? current.filter((v) => v !== id) : [...current, id];
  localStorage.setItem(UPVOTED_KEY, JSON.stringify(next));
  return !has;
}

export function getSubmissions(): Migration[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addSubmission(m: Migration) {
  const current = getSubmissions();
  localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([m, ...current]));
}
