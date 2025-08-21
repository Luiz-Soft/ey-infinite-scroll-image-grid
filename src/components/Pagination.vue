<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="page === 1">
      {{ $t('paginationPrev') }}
    </button>
    <span>
      {{ $t('paginationPageInfo', { page, totalPages }) }}
    </span>
    <button @click="nextPage" :disabled="page === totalPages">
      {{ $t('paginationNext') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useCharacterStore } from '@/stores/characterStore'
import { storeToRefs } from 'pinia'

const store = useCharacterStore()
const { page, totalPages } = storeToRefs(store)

const prevPage = () => {
  if (page.value > 1) store.goToPage(page.value - 1)
}

const nextPage = () => {
  if (page.value < totalPages.value) store.goToPage(page.value + 1)
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-family: 'Comic Sans MS', 'Baloo 2', cursive;

  button {
    padding: 0.5rem 1rem;
    border: none;
    background-color: #ffeb3b;
    color: #000;
    border-radius: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover:enabled {
      transform: scale(1.1);
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
