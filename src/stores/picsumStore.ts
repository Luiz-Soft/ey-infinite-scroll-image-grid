import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getPicsumItems, type PicsumItem } from '@/services/picsumService'

export const usePicsumStore = defineStore('picsum', () => {
  const isLoading: Ref<boolean> = ref(false)
  const isError: Ref<boolean> = ref(false)
  const picsumItems: Ref<PicsumItem[]> = ref([])

  const page: Ref<number> = ref(1)
  const itemsPerPage: Ref<number> = ref(20)
  const hasMore: Ref<boolean> = ref(true)

  const fetchPicsumItems = async (reset = false): Promise<void> => {
    if (isLoading.value || (!hasMore.value && !reset)) return

    if (reset) {
      page.value = 1
      hasMore.value = true
      picsumItems.value = []
    }

    isLoading.value = true
    isError.value = false

    try {
      const result = await getPicsumItems(page.value, itemsPerPage.value)

      picsumItems.value.push(...result.items)
      hasMore.value = result.hasMore
      page.value += 1
    } catch (err) {
      isError.value = true
    } finally {
      isLoading.value = false
    }
  }




const removeItemById = (id: PicsumItem['id']): void => {
  /* this delete would usually be done by on the api side, but picsum doesn't support it.
     This is the most performatic way of removing an item from the array locally
  */
  const arr = picsumItems.value
  const index = arr.findIndex(item => item.id === id)
  if (index !== -1) {
    arr.splice(index, 1)
  }
}

  return {
    isLoading,
    isError,
    picsumItems,
    page,
    hasMore,
    fetchPicsumItems,
    removeItemById,
  }
})
