import {defineStore} from 'pinia'
import type {Collections} from '@nuxt/content'

export const useTeamStore = defineStore('teamStore', {
    state: () => ({
        team: [] as any[],
        person: null,
        currentLocale: '',
    }),
    actions: {
        async fetchTeam(forceRefresh = false) {
            const {locale} = useI18n()

            const shouldRefresh = forceRefresh || this.currentLocale !== locale.value || this.team.length === 0

            if (!shouldRefresh) {
                return this.team
            }

            try {
                if (process.client && this.currentLocale && this.currentLocale !== locale.value) {
                    try {
                        await clearNuxtData(`team-${this.currentLocale}`)
                    } catch (error) {
                        console.warn('Could not clear cache:', error)
                    }
                }

                const {data: team, refresh} = await useAsyncData(`team-${locale.value}`, () => {
                    const collection = ('team_' + locale.value) as keyof Collections
                    return queryCollection(collection).all() as Collections['team_en'][] | Collections['team_de'][]
                }, {
                    key: `team-${locale.value}`,
                    server: true,
                    default: () => [],
                })

                if (process.client && shouldRefresh && refresh) {
                    try {
                        await refresh()
                    } catch (error) {
                        console.warn('Could not refresh data:', error)
                    }
                }

                this.team = team.value || []
                this.currentLocale = locale.value
                return this.team
            } catch (error) {
                console.error('Error fetching team:', error)
                return []
            }
        },

        async fetchPerson(slug: string, forceRefresh = false) {
            const {locale} = useI18n()

            try {
                if (process.client && forceRefresh) {
                    try {
                        await clearNuxtData(`person-${slug}-${locale.value}`)
                    } catch (error) {
                        console.warn('Could not clear cache:', error)
                    }
                }

                const {data: person, refresh} = await useAsyncData(`person-${slug}-${locale.value}`, () => {
                    return queryCollection(`team_${locale.value}`)
                        .where("slug", "=", slug)
                        .select("title", "slug", "description", "body", "meta")
                        .first()
                }, {
                    key: `person-${slug}-${locale.value}`,
                    server: true,
                    default: () => null,
                })

                if (process.client && forceRefresh && refresh) {
                    await refresh()
                }

                this.person = person.value
                return this.person
            } catch (error) {
                console.error('Error fetching person:', error)
                return null
            }
        },
    }
})