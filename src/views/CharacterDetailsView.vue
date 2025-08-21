<template>
  <div v-if="isError" class="character-details__error" @click="() => fetch()">
    {{ $t('characterDetails.errorRetry') }}
  </div>

  <div class="character-details" v-else-if="character">
    <h1 class="character-details__title">{{ character.data.name }}</h1>

    <img
      :src="character.data.imageUrl"
      :alt="character.data.name"
      class="character-details__image"
      @error="imageError = true"
    />
    <div v-if="imageError" class="character-details__fallback">🧚</div>

    <div class="character-details__section" v-if="character.data.films?.length">
      <h2>{{ $t('characterDetails.films') }}</h2>
      <ul>
        <li v-for="film in character.data.films" :key="film">{{ film }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.shortFilms?.length">
      <h2>{{ $t('characterDetails.shortFilms') }}</h2>
      <ul>
        <li v-for="short in character.data.shortFilms" :key="short">{{ short }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.tvShows?.length">
      <h2>{{ $t('characterDetails.tvShows') }}</h2>
      <ul>
        <li v-for="show in character.data.tvShows" :key="show">{{ show }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.videoGames?.length">
      <h2>{{ $t('characterDetails.videoGames') }}</h2>
      <ul>
        <li v-for="game in character.data.videoGames" :key="game">{{ game }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.parkAttractions?.length">
      <h2>{{ $t('characterDetails.parkAttractions') }}</h2>
      <ul>
        <li v-for="attraction in character.data.parkAttractions" :key="attraction">{{ attraction }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.allies?.length">
      <h2>{{ $t('characterDetails.allies') }}</h2>
      <ul>
        <li v-for="ally in character.data.allies" :key="ally">{{ ally }}</li>
      </ul>
      <hr />
    </div>

    <div class="character-details__section" v-if="character.data.enemies?.length">
      <h2>{{ $t('characterDetails.enemies') }}</h2>
      <ul>
        <li v-for="enemy in character.data.enemies" :key="enemy">{{ enemy }}</li>
      </ul>
    </div>
  </div>

  <div v-if="loading" class="character-details__loading">
    <LoadingSpinner  />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, type Ref } from 'vue'
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router'
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import type { Character } from '@/services/charactersService'

const route: RouteLocationNormalizedLoaded = useRoute()
const characterStore = useCharacterStore()
const { isError, loading } = storeToRefs(characterStore)

const character: Ref<Character | null> = ref(null)
const imageError: Ref<boolean> = ref(false)

const fetch = async (): Promise<void> => {
  const id: string = String(route.params.id)
  character.value = await characterStore.fetchCharacterById(id)
}

onMounted(fetch)
</script>

<style lang="scss" scoped>
.character-details {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff8dc;
  border: 4px dashed #ff69b4;
  border-radius: 20px;
  text-align: center;
  font-family: 'Comic Sans MS', 'Baloo 2', cursive;

  &__title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #4a148c;
  }

  &__image {
    width: 300px;
    height: auto;
    border-radius: 12px;
    border: 3px solid #ffd700;
    margin-bottom: 1rem;
  }

  &__fallback {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  &__section {
    max-width: 500px;
    margin: 2rem auto;
    text-align: center;

    h2 {
      font-size: 1.4rem;
      margin-bottom: 0.5rem;
      color: #d81b60;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin: 0.3rem 0;
        font-size: 1.1rem;
      }
    }

    hr {
      margin-top: 1.5rem;
      border: none;
      height: 2px;
      background-color: #ffb6c1;
      border-radius: 4px;
      width: 60%;
      margin-left: auto;
      margin-right: auto;
    }
  }

  &__loading,
  &__error {
    text-align: center;
    padding: 4rem;
    font-size: 1.5rem;
    color: #ff69b4;
    cursor: pointer;
  }

  &__error:hover {
    text-decoration: underline;
  }
}
</style>
