<template>
  <article class="card" role="group" :aria-label="title">
    <div class="card__media">
      <div v-if="!loaded && !error" class="card__placeholder">{{ t('card.loading') }}</div>

      <div
        v-else-if="error"
        class="card__placeholder card__placeholder--error"
        @click="retryImage"
      >
        {{ t('card.errorLoading') }}<br />
        <span class="card__retry">{{ t('card.retry') }}</span>
      </div>

      <img
        v-if="!error && showImg"
        class="card__image"
        :class="{
          'card__image--visible': loaded,
          'card__image--loading': !loaded
        }"
        :src="thumbnailUrl"
        :alt="title"
        width="150"
        height="150"
        loading="lazy"
        decoding="async"
        @load="onLoad"
        @error="onError"
      />
    </div>

    <h3 class="card__title">{{ title }}</h3>
  </article>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  title: string
  id: string
}

const { title, id } = defineProps<Props>()

const { t } = useI18n()

const loaded = ref(false)
const error = ref(false)
const showImg = ref(true)

const baseUrl = import.meta.env.VITE_PICSUM_API_URL

const thumbnailUrl = computed(() => {
  return `${baseUrl}/id/${id}/150/150`
})

const onLoad = async (e: Event) => {
  const img = e.target as HTMLImageElement
  try { await img.decode?.() } catch {}
  loaded.value = true
  error.value = false
}

const onError = () => {
  error.value = true
  loaded.value = false
}

const retryImage = async () => {
  error.value = false
  loaded.value = false
  showImg.value = false
  await nextTick()
  showImg.value = true
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .5rem;
  padding: 1rem;
  background: #fff;
  border: 1px solid #0000002b;
  border-radius: 12px;
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0,0,0,.1);
    border-color: #d1d5db;
  }

  &__media {
    width: 150px;
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    background: #f3f4f6;
    display: grid;
    place-items: center;
    position: relative;
  }

  &__placeholder {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: .875rem;
    color: #6b7280;
    text-align: center;
    padding: 0.5rem;

    &--error {
      color: #b91c1c;
      background: #fee2e2;
      cursor: pointer;
      font-weight: 500;

      &:hover {
        background: #fecaca;
      }
    }
  }

  &__retry {
    text-decoration: underline;
    font-size: .8rem;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: 0;
    transition: opacity .2s ease;

    &--visible { opacity: 1; }
    &--loading { opacity: 0; }
  }

  &__title {
    margin: 0;
    text-align: center;
    font-size: .95rem;
    font-weight: 600;
    color: #111827;
    line-height: 1.2;
    min-height: 2.4em;
    overflow: hidden;
    word-break: break-word;
  }
}
</style>
