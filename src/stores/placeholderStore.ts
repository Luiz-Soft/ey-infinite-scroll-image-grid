// stores/placeholderStore.ts
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import {
  getPlaceholderItems,
  type PlaceholderItem,
} from '@/services/placeholderService'

export const usePlaceholderStore = defineStore('placeholder', () => {
  const loading: Ref<boolean> = ref(false)
  const isError: Ref<boolean> = ref(false)
  const placeholderItems: Ref<PlaceholderItem[]> = ref([])

  const page: Ref<number> = ref(1)
  const itemsPerPage: Ref<number> = ref(20)
  const hasMore: Ref<boolean> = ref(true)

  // reset = true when you want to reload from page 1
  const fetchPlaceholderItems = async (reset = false): Promise<void> => {
    if (loading.value || !hasMore.value && !reset) return

    if (reset) {
      page.value = 1
      hasMore.value = true
      placeholderItems.value = []
    }

    loading.value = true
    isError.value = false

    try {
      const items = await getPlaceholderItems(page.value, itemsPerPage.value)

      // Append new page
      placeholderItems.value = placeholderItems.value.concat(items)

      // If we got less than requested, no more pages
      if (items.length < itemsPerPage.value) hasMore.value = false

      page.value += 1
    } catch (err) {
      console.error('Error fetching placeholder items:', err)
      isError.value = true
    } finally {
      loading.value = false
    }
  }

  return {
    // state
    loading,
    isError,
    placeholderItems,
    page,
    itemsPerPage,
    hasMore,
    // actions
    fetchPlaceholderItems,
  }
})
