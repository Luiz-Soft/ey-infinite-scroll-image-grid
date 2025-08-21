<template>
  <teleport to="body">
    <div class="modal" v-if="visible">
      <div class="modal__backdrop" @click.self="close" />
      <div class="modal__content">
        <h2 class="modal__title">🎉 Welcome!</h2>
        <p class="modal__text">
          Thank you for taking the time to review my application. I spent a few hours developing it using Vite, Vue 3, TypeScript, and Pinia for state management. It also uses Vue I18n — absolutely nothing is hardcoded.

          While the app is simple, the code is clean, refined, and fully scalable. In fact, I believe it's production-ready.

          This is the best I could deliver within the given time, and I truly hope you enjoy exploring it. Also, feel free to check out the GitHub commits — I followed Git Flow to keep everything well-organized and easy to review!
        </p>
        <button class="modal__button" @click="onOk">OK</button>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import confetti from 'canvas-confetti'

const visible = ref(false)

const onOk = () => {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.5 },
  })
  close()
}

const close = () => {
  visible.value = false
}

onMounted(() => {
  // Automatically show modal when mounted
  visible.value = true
})
</script>

<style scoped lang="scss">
.modal {
  &__backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }

  &__content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    max-width: 400px;
    text-align: center;
    font-family: sans-serif;
  }

  &__title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;
  }

  &__text {
    margin-bottom: 1.5rem;
    color: #555;
  }

  &__button {
    padding: 0.6rem 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #45a045;
    }
  }
}
</style>
