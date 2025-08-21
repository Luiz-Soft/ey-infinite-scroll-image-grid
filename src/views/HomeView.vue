<template>
  <div class="home">
    <LoadingSpinner v-if="loading" />

    <div v-else-if="isError" class="home__error" @click="characterStore.searchCharacters">
      <p>{{ $t('characterDetails.errorRetry') }}</p>
    </div>

    <div v-else-if="characters.length === 0" class="home__empty">
      <p>{{ $t('emptyContent') }}</p>
    </div>

    <div v-else>
      <div class="home__grid">
        <CharacterCard
          v-for="character in characters"
          :key="character._id"
          :name="character.name"
          :image-url="character.imageUrl"
          @click="(e) => onCardClick(e, character._id)"
        />
      </div>
      <Pagination />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
import Pagination from '@/components/Pagination.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'
import { useRouter, type Router } from 'vue-router'
import confetti from 'canvas-confetti'

const characterStore = useCharacterStore()
const {
  results: characters,
  loading,
  isError,
} = storeToRefs(characterStore)

const router: Router = useRouter()

const onCardClick = (event: MouseEvent, id: number): void => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()

  const x = (rect.left + rect.width / 2) / window.innerWidth
  const y = (rect.top + rect.height / 2) / window.innerHeight

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x, y },
  })

  router.push({ name: 'CharacterDetails', params: { id } })
}
</script>

<style scoped lang="scss">
.home {
  padding: 2rem;

  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    justify-content: center;
  }

  &__empty,
  &__error {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Comic Sans MS', 'Baloo 2', cursive;
    text-shadow: 1px 1px #fff;
  }

  &__empty {
    color: #ff69b4;
  }

  &__error {
    color: #ff4d4d;
  }
}
</style>
