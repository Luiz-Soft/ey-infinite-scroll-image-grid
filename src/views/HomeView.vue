<template>
  <section>
    <h1>Home View</h1>

    <!-- (Optional) manual trigger for testing -->
    <button @click="fetchPlaceholderItems()" :disabled="loading || !hasMore">
      {{ loading ? 'Loading…' : hasMore ? 'Load more' : 'No more items' }}
    </button>

    <div v-if="isError">❌ Error loading items</div>

    <ul v-else>
      <li v-for="item in placeholderItems" :key="item.id">
        <strong>{{ item.id }}</strong> – {{ item.title }}
      </li>
    </ul>

    <!-- sentinel observed by IntersectionObserver -->
    <div ref="infiniteTrigger" style="height: 1px;"></div>

    <p v-if="loading" style="margin-top:.75rem;">Loading…</p>
    <p v-else-if="!hasMore" style="margin-top:.75rem;">You’ve reached the end 🎉</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { usePlaceholderStore } from '@/stores/placeholderStore'

const store = usePlaceholderStore()
const { placeholderItems, loading, isError, hasMore } = storeToRefs(store)
const { fetchPlaceholderItems } = store

const infiniteTrigger = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  // initial load (reset = true)
  fetchPlaceholderItems(true)

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) {
        // Next page
        fetchPlaceholderItems()
      }
    },
    {
      root: null,
      rootMargin: '200px', // prefetch before reaching bottom
      threshold: 0,
    }
  )

  if (infiniteTrigger.value) {
    observer.observe(infiniteTrigger.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped lang="scss">
ul { margin-top: 1rem; list-style: none; padding: 0; }
li { margin: .5rem 0; }
</style>
