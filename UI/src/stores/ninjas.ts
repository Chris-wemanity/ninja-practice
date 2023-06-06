// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Url } from 'url'

export const useNinjasStore = defineStore('ninjas', () => {
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  async function registerNinja(
    ninjaData: {
      firstName: string
      lastName: string
      seniority: number
      devStack: string[]
      description: string
      availabilityDate: string
      isInMission: boolean
    },
    API_URL: Url
  ) {
    const ninja = {
      firstName: ninjaData.firstName,
      lastName: ninjaData.lastName,
      seniority: ninjaData.seniority,
      stack: ninjaData.devStack,
      description: ninjaData.description,
      availabilityDate: ninjaData.availabilityDate,
      isInMission: ninjaData.isInMission
    }

    //handle token flow here

    const response = await fetch(API_URL + `/ninja`, {
      // add when auth .json?auth=${token}
      method: 'POST',
      body: JSON.stringify(ninja)
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(
        responseData.message ||
          "Impossible d'enregistrer un ninja, veuillez réessayer ultérieurement"
      )

      throw error
      //this.router.replace('/ninja') when we will add router in middleware
    }
  }

  return { registerNinja }
})
