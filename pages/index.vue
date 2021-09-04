<template>
  <div class="index">
    <div class="title">
      <!-- <img class="w-40" src="@/assets/img/logo.svg" alt="" /> -->
      <h1 class="mt-4">Title</h1>
    </div>

    <div class="intro">
      <p class="text-sm">This is the start page</p>
    </div>

    <nuxt-link to="/app">
      <button class="start animated zoomIn faster">
        Start
      </button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  components: {
    //
  },
}
</script>

<style lang="postcss" scoped>
/* Sample `apply` at-rules with Tailwind CSS */

.index {
  @apply min-h-screen flex justify-center items-center text-center flex-col;
}

.title {
  @apply rounded-full p-8 m-8;
}

.intro {
  @apply tracking-wide;

  & strong {
    @apply text-xl;
  }
}

.start {
  @apply bg-indigo-400 text-white font-bold py-2 px-6 rounded cursor-pointer my-8;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
