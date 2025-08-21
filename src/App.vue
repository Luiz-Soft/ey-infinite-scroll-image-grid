<template>
  <Navbar />
  <router-view />
  <ModalMessage />
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import ModalMessage from '@/components/ModalMessage.vue'
</script>