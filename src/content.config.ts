// 1. Import utilities from `astro:content`
import { defineCollection } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Import Zod
import { z } from "astro/zod";

const blog = defineCollection({
	// `loader` can accept an array of multiple patterns as well as string patterns
	// Load all markdown files in the space-probes directory, except for those that start with "voyager-"
	loader: glob({ pattern: ["*.md"], base: "src/data/blog" }),
	schema: ({image}) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		thumbnail_dark: image(),
		thumbnail_light: image(),
	}),
});

const github = defineCollection({
  loader: file("src/data/github-projects.json"),
  schema: ({image}) => z.object({
    id: z.string(),
		title: z.string(),
    description: z.string(),
    url: z.string(),
		readMeUrl: z.string(),
		thumbnail_dark: image(),
		thumbnail_light: image(),
  }),
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog, github };
