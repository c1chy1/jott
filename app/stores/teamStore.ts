import { defineStore } from 'pinia'

export const useTeamStore = defineStore('teamStore', {
    state: () => ({
        team: [],
        person: null,
    }),
    actions: {
        async fetchTeam() {
            const { data: team } = await useAsyncData('team', () =>
                queryCollection('team').all()
            )
            this.team = team.value || []
            console.log('Team fetched:', this.team)
        },
        async fetchPerson(routePath: string) {
            console.log('Fetching person for path:', routePath)
            const { data: person } = await useAsyncData(`person-${routePath}`, () =>
                queryCollection('team')
                    .path(routePath)
                    .first()
            )
            console.log('Person query result:', person.value)
            this.person = person.value
            return this.person
        },
    }
})