import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getPlaceholderItems, type PlaceholderItem } from '@/services/placeholderService'

export const usePlaceholderStore = defineStore('placeholder', () => {
  const isLoading: Ref<boolean> = ref(false)
  const isError: Ref<boolean> = ref(false)
  const placeholderItems: Ref<PlaceholderItem[]> = ref([])

  const page: Ref<number> = ref(1)
  const itemsPerPage: Ref<number> = ref(20)
  const hasMore: Ref<boolean> = ref(true)

  const fetchPlaceholderItems = async (reset = false): Promise<void> => {
    if (isLoading.value || (!hasMore.value && !reset)) return

    if (reset) {
      page.value = 1
      hasMore.value = true
      placeholderItems.value = []
    }

    isLoading.value = true
    isError.value = false

    try {
      const { items, totalCount } = await getPlaceholderItems(page.value, itemsPerPage.value)

      placeholderItems.value.push(...items)

      hasMore.value = placeholderItems.value.length < totalCount

      page.value += 1
    } catch (err) {
      console.error('Error fetching placeholder items:', err)
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isError,
    placeholderItems,
    page,
    itemsPerPage,
    hasMore,
    fetchPlaceholderItems,
  }
})
