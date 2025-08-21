<template>
  <section>
    <h1>Home View</h1>

    <button @click="fetchPlaceholderItems()" :disabled="isLoading || !hasMore">
      {{ isLoading ? 'Loading…' : hasMore ? 'Load more' : 'No more items' }}
    </button>

    <div v-if="isError">❌ Error isLoading items</div>

    <ul v-else>
      <li v-for="item in placeholderItems" :key="item.id">
        <strong>{{ item.id }}</strong> – {{ item.title }}
      </li>
    </ul>

    <p v-if="isLoading" style="margin-top:.75rem;">Loading…</p>
    <p v-else-if="!hasMore" style="margin-top:.75rem;">You’ve reached the end 🎉</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useInfiniteScroll } from '@vueuse/core'
import { usePlaceholderStore } from '@/stores/placeholderStore'

const store = usePlaceholderStore()
const { placeholderItems, isLoading, isError, hasMore } = storeToRefs(store)
const { fetchPlaceholderItems } = store

onMounted(() => {
  fetchPlaceholderItems(true)
})


useInfiniteScroll(
  window,
  async () => {
    if (!isLoading.value && hasMore.value) {
      await fetchPlaceholderItems()
    }
  },
  {
    distance: 300,
    interval: 200,
    canLoadMore: () => hasMore.value
  }
)

</script>

<style scoped lang="scss">
ul { margin-top: 1rem; list-style: none; padding: 0; }
li { margin: .5rem 0; }
</style>
