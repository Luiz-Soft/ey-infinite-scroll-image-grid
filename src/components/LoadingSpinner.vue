<template>
  <div class="loading-spinner">
    <div class="loading-spinner__icon"></div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff69b4;
  font-family: 'Comic Sans MS', 'Baloo 2', cursive;
  text-shadow: 1px 1px #fff;

  &__icon {
    width: 60px;
    height: 60px;
    background-color: #ffeb3b;
    border-radius: 50%;
    animation: loading-spinner-bounce 0.6s infinite alternate;
    box-shadow: 0 0 0 5px #ff69b4;
  }
}

@keyframes loading-spinner-bounce {
  to {
    transform: translateY(-30px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
}
</style>
