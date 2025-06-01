<template>
  <div
    class="relative h-screen w-full bg-cover bg-center overflow-hidden"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- Header -->
    <header
      class="relative z-20 flex justify-between items-center px-6 py-4 md:px-16 text-white"
    >
      <!-- Logo -->
      <div class="flex items-center space-x-2 text-2xl font-bold">
        <span>ZapLocator</span>
      </div>

      <!-- Nav Links -->
      <nav class="hidden md:flex space-x-8 text-base font-light">
        <a href="#" class="hover:text-green-400 font-semibold text-lg">Home</a>
        <a href="#" class="hover:text-green-400 font-semibold text-lg">Introduction</a>
        <a href="#" class="hover:text-green-400 font-semibold text-lg">About</a>
        <a href="#" class="hover:text-green-400 font-semibold text-lg">Help</a>
      </nav>

      <!-- Contact Button -->
      <button
        class="flex items-center gap-2 bg-green-400 rounded-full px-4 py-1  text-md text-black hover:bg-white hover:text-black transition cursor-pointer"
      >
        Contact us
      </button>
    </header>

    <!-- Hero Content -->
    <section
      class="relative z-10 h-full w-full flex flex-col justify-center md:justify-start md:pt-40 px-6 md:px-16 text-white"
    >
      <!-- Left Badge -->
      <div
        class="mb-4 bg-white/10 backdrop-blur-md text-lime-400 px-4 py-2 rounded-full w-fit text-sm font-medium"
      >
        ⚡ Fast charge support
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl md:text-6xl font-semibold max-w-2xl">
        Tomorrow runs <br class="hidden md:block" />
        on electricity
      </h1>

      <!-- Description -->
      <p class="mt-6 max-w-md text-sm md:text-lg text-gray-200">
        Discover a new era of mobility where innovation meets sustainability.
      </p>

      <!-- Call to Action -->
      <button
        @click="goToLogin"
        class="mt-8 flex items-center gap-2 text-sm md:text-base border border-white rounded-full px-6 py-2 hover:bg-white hover:text-black transition w-fit cursor-pointer"
      >
        Get Started
        <v-icon name="bi-arrow-right" scale="1.2" fill="currentColor" />
      </button>
    </section>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import homepageImage from '../assets/images/home.jpeg';
const router = useRouter();

function goToLogin() {
  router.push('/login');
}

const backgroundImage = homepageImage;
</script>
