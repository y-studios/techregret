"use client";

const UPVOTED_KEY = "techregret_upvoted";

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
