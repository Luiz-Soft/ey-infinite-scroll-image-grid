<template>
  <div class="character-card">
    <div v-if="!imageUrl || hasError" class="character-card__fallback">🙈</div>
    <img
      v-else
      :src="imageUrl"
      :alt="name"
      class="character-card__image"
      @error="hasError = true"
      v-show="!hasError"
    />

    <h2 class="character-card__name">{{ name }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{
  name: string
  imageUrl?: string
}>()

const hasError = ref(false)
</script>

<style lang="scss" scoped>
.character-card {
  background-color: #fff8dc;
  border: 3px solid #ffd700;
  border-radius: 20px;
  box-shadow: 4px 4px 0 #ff69b4;
  padding: 1rem;
  text-align: center;
  width: 200px;
  font-family: 'Comic Sans MS', 'Baloo 2', cursive;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 6px 6px 0 #ff69b4;
  }

  &__image,
  &__fallback {
    width: 100%;
    height: 200px;
    border-radius: 12px;
    border: 2px solid #ffeb3b;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    font-size: 3rem;
    background-color: #fff;
  }

  &__name {
    font-size: 1.2rem;
    font-weight: bold;
    color: #4a148c;
    text-shadow: 1px 1px #ffd700;
    margin: 0;
  }
}
</style>
