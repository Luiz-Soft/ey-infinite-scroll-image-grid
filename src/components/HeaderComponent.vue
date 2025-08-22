<template>
  <header class="header">
    <div class="header__logo">  {{ t('header.title') }}
</div>
    <div class="header__lang">
      <select v-model="locale" class="header__lang-select">
        <option value="en">EN</option>
        <option value="es">ES</option>
        <option value="pt">PT</option>
      </select>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const { locale } = useI18n();
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1rem 2rem;
  background-color: #222;
  color: #fff;

  &__logo {
    font-size: 1.25rem;
    font-weight: bold;
  }

  &__nav {
    flex: 1;
    display: flex;
    justify-content: center;

  }

  &__link {
    text-decoration: none;
    color: #fff;
    transition: color 0.2s ease;

  }

  &__lang {
    &-select {
      background: #333;
      border: 1px solid #555;
      border-radius: 4px;
      color: #fff;
      padding: 0.25rem 0.5rem;
      cursor: pointer;
    }
  }
}
</style>
