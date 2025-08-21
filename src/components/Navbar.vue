<template>
  <header class="header">
    <div class="header__content">
      <router-link to="/" class="header__title">
        {{ $t('title') }}
      </router-link>

      <div class="header__search">
        <input
          v-model="search"
          @input="onSearch"
          type="text"
          :placeholder="$t('searchPlaceholder')"
          class="header__input"
        />

        <select v-model="locale" class="header__lang-selector">
          <option value="en">EN</option>
          <option value="es">ES</option>
          <option value="pt">PT</option>
        </select>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { useCharacterStore } from '@/stores/characterStore'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const characterStore = useCharacterStore()
const { search } = storeToRefs(characterStore)

const onSearch = () => {
  characterStore.searchCharacters()
}

onMounted(() => {
  characterStore.searchCharacters()
})

const { locale } = useI18n()
</script>

<style lang="scss" scoped>
.header {
  background: linear-gradient(135deg, #57a9ff, #0047ab);
  color: #fff;
  font-family: 'Comic Sans MS', 'Baloo 2', cursive;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 100%;
  margin: 0;
  padding: 1.5rem 0;
  border-bottom: 4px solid #ffd700;

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: 900;
    letter-spacing: 2px;
    color: #ffeb3b;
    text-shadow: 2px 2px 0 #000, 4px 4px 0 #ff69b4;
    margin: 0;
    text-decoration: none;
  }

  &__search {
    display: flex;
    align-items: center;
    flex: 1 1 auto;
    max-width: 400px;
    margin-top: 1rem;
    gap: 0.5rem;

    @media (min-width: 600px) {
      margin-top: 0;
      margin-left: 2rem;
    }
  }

  &__input {
    flex: 1;
    padding: 0.75rem 1.2rem;
    border: none;
    border-radius: 2rem;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
    background-color: #fff;
    color: #333;
    transition: box-shadow 0.3s ease, transform 0.2s ease;
    box-shadow: 0 0 0 3px #ffeb3b, 0 0 10px rgba(255, 255, 255, 0.4);

    &::placeholder {
      color: #999;
      font-style: italic;
    }

    &:focus {
      box-shadow: 0 0 0 3px #ff69b4, 0 0 12px rgba(255, 105, 180, 0.7);
      transform: scale(1.02);
    }
  }

  &__lang-selector {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    border: none;
    font-size: 0.9rem;
    background-color: #ffeb3b;
    color: #000;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
