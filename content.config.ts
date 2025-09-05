import {defineCollection, defineContentConfig, z} from '@nuxt/content';

const locales = ['de', 'en'];

export default defineContentConfig({
    collections: Object.fromEntries(
        locales.flatMap((locale) => [
            [
                `team_${locale}`,
                defineCollection({
                    source: `${locale}/team/*.md`,
                    type: 'page',
                    schema: z.object({
                        title: z.string(),
                        description: z.string(),
                        slug: z.string(),
                    }),
                }),
            ],
            [
                `articles_${locale}`,
                defineCollection({
                    source: `${locale}/blog/**/*.md`,
                    type: 'page',
                    schema: z.object({
                        title: z.string(),
                        slug: z.string(),
                        description: z.string(),
                        url: z.string().url(),
                        date: z.date(),
                    }),
                }),
            ]
        ]),
    ),
});