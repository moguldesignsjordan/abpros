// src/lib/sanity.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  // ─── REPLACE THESE WITH YOUR VALUES ───────────────────────
  projectId: "89l194at",
  dataset: "production",
  useCdn: true,                   // `false` if you want fresh data on every load
  apiVersion: "2024-01-01",
  // ──────────────────────────────────────────────────────────
});

// Helper to build image URLs from Sanity image references
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// ─── QUERY HELPERS ──────────────────────────────────────────

// All projects, newest first
export async function getAllProjects() {
  return client.fetch(
    `*[_type == "project"] | order(completionDate desc) {
      _id,
      title,
      slug,
      category,
      coverImage,
      shortDescription,
      completionDate,
      location,
      featured,
      tags
    }`
  );
}

// Single project by slug (full data)
export async function getProjectBySlug(slug) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      coverImage,
      gallery[] {
        asset->,
        caption
      },
      shortDescription,
      description,
      completionDate,
      client,
      location,
      featured,
      tags
    }`,
    { slug }
  );
}

// Featured projects (for homepage)
export async function getFeaturedProjects(limit = 6) {
  return client.fetch(
    `*[_type == "project"] | order(completionDate desc)[0...$limit] {
      _id,
      title,
      slug,
      category,
      coverImage,
      shortDescription,
      location
    }`,
    { limit }
  );
}