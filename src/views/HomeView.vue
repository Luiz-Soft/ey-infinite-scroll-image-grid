<template>
  <section class="home" data-cy="home">
    <h1 class="home__title" data-cy="home-title">{{ t('home.title') }}</h1>

    <div v-if="picsumItems.length || isLoading" class="home__grid" data-cy="grid">
      <transition-group
        name="card-fade"
        tag="div"
        class="home__grid-wrapper"
        appear
      >
        <card-component
          v-for="item in picsumItems"
          :key="`card-${item.id}`"
          :id="item.id"
          :title="item.author"
          data-cy="card"
          @remove="removeItemById(item.id)"
        />
      </transition-group>

      <template v-if="isLoading">
        <ContentLoader
          v-for="n in itemsPerPage"
          :key="`skeleton-${n}`"
          :speed="2"
          :width="100"
          :height="220"
          :viewBox="'0 0 100 220'"
          preserveAspectRatio="none"
          class="home__card-skeleton"
          aria-hidden="true"
          data-cy="loading"
        >
          <rect x="0" y="0" rx="12" ry="12" width="100" height="220" />
        </ContentLoader>
      </template>
    </div>

    <div
      v-else-if="!isLoading && !isError"
      class="home__status home__status--empty"
      data-cy="empty"
      role="button"
      tabindex="0"
      @click="fetchPicsumItems(true)"
    >
      {{ t('home.empty') }}
    </div>

    <div
      v-if="isError"
      class="home__status home__status--error"
      data-cy="error"
      role="button"
      tabindex="0"
      @click="fetchPicsumItems(true)"
    >
      {{ t('home.error') }}
    </div>

    <p
      v-else-if="!hasMore && picsumItems.length"
      class="home__status home__status--end"
      data-cy="end"
    >
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
import { ContentLoader } from 'vue-content-loader'

const { t } = useI18n()

const store = usePicsumStore()
const { picsumItems, isLoading, isError, hasMore, itemsPerPage } = storeToRefs(store)
const { fetchPicsumItems, removeItemById } = store

onMounted(() => {
  fetchPicsumItems(true)
})

useInfiniteScroll(
  window,
  async () => {
    if (!isLoading.value && hasMore.value && !isError.value) {
      await fetchPicsumItems()
    }
  },
  {
    distance: 300,
    interval: 200,
    canLoadMore: () => hasMore.value && !isError.value
  }
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

  &__grid-wrapper {
    display: contents;
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

  &__card-skeleton {
    width: 100%;
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
.card-fade-enter-active {
  transition: opacity 0.4s ease;
}
.card-fade-enter-from {
  opacity: 0;
}
</style>
