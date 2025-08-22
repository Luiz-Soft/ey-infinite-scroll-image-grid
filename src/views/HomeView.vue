<template>
  <section class="home">
    <h1 class="home__title">{{ t('home.title') }}</h1>

    <transition-group
      v-if="picsumItems.length"
      name="card-fade"
      tag="div"
      class="home__grid"
    >
      <card-component
        v-for="item in picsumItems"
        :key="item.id"
        :id="item.id"
        :title="item.author"
        @remove="removeItemById(item.id)"
      />
    </transition-group>

    <div
      v-else-if="!isLoading && !isError"
      class="home__status home__status--empty"
      role="button"
      tabindex="0"
      @click="fetchPicsumItems(true)"
    >
     {{ t('home.empty') }}
    </div>

    <div
      v-if="isError"
      class="home__status home__status--error"
      role="button"
      tabindex="0"
      @click="fetchPicsumItems()"
    >
      {{ t('home.error') }}
    </div>

    <p v-if="isLoading" class="home__status home__status--loading">
      {{ t('home.loading') }}
    </p>

    <p v-else-if="!hasMore && picsumItems.length" class="home__status home__status--end">
      {{ t('home.end') }}
    </p>
  </section>
</template>


<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useInfiniteScroll } from '@vueuse/core'
import { usePicsumStore } from '@/stores/picsumStore'
import CardComponent from '@/components/CardComponent.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const store = usePicsumStore()
const { picsumItems, isLoading, isError, hasMore } = storeToRefs(store)
const { fetchPicsumItems, removeItemById } = store

onMounted(() => {
  fetchPicsumItems(true)
})

useInfiniteScroll(
  window,
  async () => {
    if (!isLoading.value && hasMore.value) await fetchPicsumItems()
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
    &--error   { color: #991b1b; font-weight: 600; text-decoration: underline; cursor: pointer; }
    &--empty   { color: #374151; font-weight: 500; cursor: pointer; }

  }
}

.card-fade-leave-active {
  transition: all 0.4s ease;
}
.card-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.card-fade-move {
  transition: none;
}
</style>
