<template>
  <transition name="slide-fade" mode="out-in">
    <div v-if="visible" class="show-full-modal" @click.stop="">
      <div class="header">
        <span class="title">
          {{ title }}
        </span>
        <span
          class="close animated rollIn faster"
          @click.stop="() => $emit('close')"
        >
          <fa-icon icon="times-circle" />
        </span>
      </div>
      <div class="body">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: undefined,
    },
    title: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="postcss" scoped>
.show-full-modal {
  @apply fixed top-0 left-0 z-30;
  @apply bg-white;

  height: 100vh;
  width: 100vw;
}

.header {
  @apply h-12 p-3;
  @apply flex justify-between items-center;
  @apply shadow-md;

  & .close {
    @apply text-xl px-2 py-4 cursor-pointer;
  }
}

.body {
  @apply pb-12;
  @apply h-full;
  @apply overflow-x-hidden overflow-y-auto;

  &::-webkit-scrollbar {
    @apply w-1 h-1;
  }
  &::-webkit-scrollbar-track {
    @apply m-2 mt-6 ml-6;
  }

  &::-webkit-scrollbar-thumb {
    @apply rounded-full bg-gray-300;
  }
}
</style>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.1s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(10px);
  opacity: 0;
}
</style>
