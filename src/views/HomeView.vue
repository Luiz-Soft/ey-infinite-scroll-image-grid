<template>
  <section class="home">
    <h1 class="home__title">{{ t('home.title') }}</h1>

    <div class="home__grid">
      <card-component
        v-for="item in placeholderItems"
        :key="item.id"
        :title="item.title"
        :thumbnailUrl="item.thumbnailUrl"
      />
    </div>

    <div v-if="isError" class="home__status home__status--error">
      {{ t('home.error') }}
    </div>
    <p v-if="isLoading" class="home__status home__status--loading">
      {{ t('home.loading') }}
    </p>
    <p v-else-if="!hasMore" class="home__status home__status--end">
      {{ t('home.end') }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useInfiniteScroll } from '@vueuse/core'
import { usePlaceholderStore } from '@/stores/placeholderStore'
import CardComponent from '@/components/CardComponent.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const store = usePlaceholderStore()
const { placeholderItems, isLoading, isError, hasMore } = storeToRefs(store)
const { fetchPlaceholderItems } = store

onMounted(() => {
  fetchPlaceholderItems(true)
})

useInfiniteScroll(
  window,
  async () => {
    if (!isLoading.value && hasMore.value) await fetchPlaceholderItems()
  },
  { distance: 300, interval: 200, canLoadMore: () => hasMore.value }
)
</script>


<style scoped lang="scss">
.home {
  padding: 1rem;

  &__title {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: #111827;
  }

  &__grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (min-width: 640px) { grid-template-columns: repeat(3, 1fr); }
    @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }
    @media (min-width: 1024px) { grid-template-columns: repeat(5, 1fr); }
  }

  &__status {
    text-align: center;
    margin-top: 1rem;
    font-size: .95rem;

    &--loading { color: #4b5563; }
    &--end     { color: #065f46; font-weight: 600; }
    &--error   { color: #991b1b; font-weight: 600; }
  }
}
</style>
