import {defineStore} from 'pinia'

interface ArticleMeta {
    categories?: string[]
    date?: string
    author?: string
    image?: string
    imageAlt?: string
}

interface Article {
    meta?: ArticleMeta
    title?: string
    description?: string
    body?: any
    date?: string
    slug?: string
    url?: string
    path?: string
    seo?: {
        description?: string
    }

    [key: string]: any
}

export const useArticleStore = defineStore('articleStore', {
    state: () => ({
        articles: [] as Article[],
        article: null as Article | null,
        page: 1,
        pageMaxArticles: 6,
        categories: [] as string[],
        selectedCategory: ''
    }),
    getters: {
        filteredArticles: (state) => {
            if (!state.selectedCategory) return state.articles;
            return state.articles?.filter(article =>
                (article.meta?.categories || []).includes(state.selectedCategory)
            );
        },
        loadMoreButtonLabel: (state) => {
            const {t} = useI18n()
            return state.articles?.length < state.pageMaxArticles
                ? t('blog.no-posts')
                : t('blog.show');
        }
    },
    actions: {
        async fetchArticle(slug: string) {
            const {locale} = useI18n()
            console.log('Fetching article for slug:', slug)

            const {data: article} = await useAsyncData(`article-${slug}-${locale.value}`, async () => {
                return await queryCollection(`articles_${locale.value}`)
                    .where("slug", "=", slug)
                    .select(
                        "title",
                        "slug",
                        "description",
                        "body",
                        "meta",
                        "date",
                        "url"
                    )
                    .first()
            }, {
                watch: [locale],
            })

            if (article.value) {
                this.article = {
                    ...article.value,
                    date: new Date(article.value.date).toISOString().slice(0, 10).replace(/-/g, '.')
                }
            } else {
                this.article = null
            }
            return this.article
        },

        async fetchArticles() {
            const {locale} = useI18n()
            const {data} = await useAsyncData(async () => {
                const collection = `articles_${locale.value}` as keyof Collections
                const articles = await queryCollection(collection)
                    .limit(this.pageMaxArticles)
                    .skip(this.pageMaxArticles * (this.page - 1))
                    .order('date', 'DESC')
                    .all() as Collections['articles_en'][] | Collections['articles_de'][]

                return articles.map(article => ({
                    ...article,
                    date: new Date(article.date).toISOString().slice(0, 10).replace(/-/g, '.')
                }))
            }, {
                watch: [locale],
                key: `articles-${locale.value}-${this.page}-${this.pageMaxArticles}`,
            })

            this.articles = data.value || []
            this.fetchCategories()
        },

        async loadMorePosts() {
            const {locale} = useI18n()
            this.pageMaxArticles += 6

            const {data} = await useAsyncData(async () => {
                const collection = `articles_${locale.value}` as keyof Collections
                const articles = await queryCollection(collection)
                    .order('date', 'DESC')
                    .limit(this.pageMaxArticles)
                    .all() as Collections['articles_en'][] | Collections['articles_de'][]

                return articles.map(article => ({
                    ...article,
                    date: new Date(article.date).toISOString().slice(0, 10).replace(/-/g, '.')
                }))
            }, {
                watch: [locale],
                key: `articles-load-more-${locale.value}-${this.pageMaxArticles}`,
            })

            this.articles = data.value || []
            this.fetchCategories()
        },

        async fetchLatestArticles() {
            const {locale} = useI18n()
            const {data} = await useAsyncData(async () => {
                const collection = `articles_${locale.value}` as keyof Collections
                const articles = await queryCollection(collection)
                    .limit(3)
                    .order('date', 'DESC')
                    .all() as Collections['articles_en'][] | Collections['articles_de'][]

                return articles.map(article => ({
                    ...article,
                    date: new Date(article.date).toISOString().slice(0, 10).replace(/-/g, '.')
                }))
            }, {
                watch: [locale],
                key: `latest-articles-${locale.value}`,
                server: true,
            })

            return data.value || []
        },

        fetchCategories() {
            this.categories = this.articles
                ?.map(item => item.meta?.categories || [])
                .flat()
                .filter((item, index, self) => self.indexOf(item) === index) || []
        },

        setSelectedCategory(category: string) {
            this.selectedCategory = category
        },

        truncateText(text: string, maxLength: number): string {
            if (!text) return '';
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        }
    }
})

export type Collections = {
    [K in `articles_${'en' | 'de'}`]: Article[]
} & {
    [K in `team_${'en' | 'de'}`]: any[]
}