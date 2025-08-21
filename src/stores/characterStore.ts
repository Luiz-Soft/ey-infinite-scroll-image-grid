import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import {
  getCharacters,
  getCharacterByName,
  getCharacterById,
  type Character,
  type CharactersResponse,
} from '@/services/charactersService'

export const useCharacterStore = defineStore('character', () => {
  const search: Ref<string> = ref('')
  const loading: Ref<boolean> = ref(false)
  const isError: Ref<boolean> = ref(false)
  const results: Ref<Character[]> = ref([])
  const page: Ref<number> = ref(1)
  const totalPages: Ref<number> = ref(1)
  const itemsPerPage: Ref<number> = ref(9)

  const searchCharacters = async (newPage?: number): Promise<void> => {
    page.value = newPage ?? 1
    const query: string = (search.value || '').trim()

    loading.value = true
    isError.value = false

    try {
      let res: CharactersResponse

      if (!query) {
        res = await getCharacters(page.value, itemsPerPage.value)
      } else {
        res = await getCharacterByName(query, page.value, itemsPerPage.value)
      }

      results.value = res.data
      totalPages.value = res.info.totalPages
    } catch (error) {
      console.error('Error fetching characters:', error)
      isError.value = true
    } finally {
      loading.value = false
    }
  }

  const fetchCharacterById = async (id: string): Promise<Character | null> => {
    loading.value = true
    isError.value = false

    try {
      return await getCharacterById(id)
    } catch (error) {
      console.error('Error fetching character by ID:', error)
      isError.value = true
      return null
    } finally {
      loading.value = false
    }
  }

  const goToPage = async (newPage: number): Promise<void> => {
    await searchCharacters(newPage)
  }

  return {
    search,
    loading,
    isError,
    results,
    page,
    totalPages,
    searchCharacters,
    goToPage,
    fetchCharacterById,
  }
})
