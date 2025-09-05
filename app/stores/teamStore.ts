import {defineStore} from 'pinia'
import type {Collections} from '@nuxt/content'

export const useTeamStore = defineStore('teamStore', {
    state: () => ({
        team: [],
        person: null,
    }),
    actions: {
        async fetchTeam() {
            const {locale} = useI18n()
            const {data: team} = await useAsyncData(async () => {
                const collection = ('team_' + locale.value) as keyof Collections
                return await queryCollection(collection)
                    .all() as Collections['team_en'][] | Collections['team_de'][]
            }, {
                watch: [locale],
                key: `team-${locale.value}`,
                server: true, // SSR dla wydajności
            })
            this.team = team.value || []
            console.log('Team fetched:', this.team)
        },

        async fetchPerson(slug: string) {
            const {locale} = useI18n()
            console.log('Fetching person for slug:', slug)

            const {data: person} = await useAsyncData(async () => {
                return await queryCollection(`team_${locale.value}`)
                    .where("slug", "=", slug)
                    .select(
                        "title",
                        "slug",
                        "description",
                        "body",
                        "meta"
                    )
                    .first()


            }, {
                watch: [locale],
            })

            console.log('Person query result:', person.value)
            this.person = person.value
            return this.person
        },
    }
})