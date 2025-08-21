<template>
  <section>
    <h1>Home View</h1>

    <button @click="fetchPlaceholderItems()" :disabled="loading || !hasMore">
      {{ loading ? 'Loading…' : hasMore ? 'Load more' : 'No more items' }}
    </button>

    <div v-if="isError">❌ Error loading items</div>

    <ul v-else>
      <li v-for="item in placeholderItems" :key="item.id">
        <strong>{{ item.id }}</strong> – {{ item.title }}
      </li>
    </ul>

    <p v-if="loading" style="margin-top:.75rem;">Loading…</p>
    <p v-else-if="!hasMore" style="margin-top:.75rem;">You’ve reached the end 🎉</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useInfiniteScroll } from '@vueuse/core'
import { usePlaceholderStore } from '@/stores/placeholderStore'

const store = usePlaceholderStore()
const { placeholderItems, loading, isError, hasMore } = storeToRefs(store)
const { fetchPlaceholderItems } = store

// Initial load
onMounted(() => {
  fetchPlaceholderItems(true)
})

/**
 * Infinite scroll on the window.
 * It will call fetchPlaceholderItems() when the user is within 300px of the bottom,
 * but only if not already loading and there are more pages.
 */
useInfiniteScroll(
  window,
  async () => {
    if (!loading.value && hasMore.value) {
      await fetchPlaceholderItems()
    }
  },
  {
    distance: 300,                       // start loading a bit before the bottom
    interval: 200,                       // poll interval (ms) – lightweight
    canLoadMore: () => hasMore.value,    // stop automatically at the end
  }
)
</script>

<style scoped lang="scss">
ul { margin-top: 1rem; list-style: none; padding: 0; }
li { margin: .5rem 0; }
</style>
