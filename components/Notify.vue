<template>
  <transition name="slide-fade" mode="out-in">
    <div v-show="show" class="notify w-full my-16 pointer-events-none">
      <!--  -->
      <!-- eslint-disable vue/no-v-html -->
      <span
        class="msg m-4 px-4 py-2 border border-gray-100 shadow-lg bg-white"
        v-html="mdMsg"
      />
      <!-- eslint-enable vue/no-v-html -->
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
    showSec: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    mdMsg() {
      return this.msg.replace(/\*(.*?)\*/g, '<b>$1</b>')
    },
  },
  watch: {
    msg(msg) {
      // console.log('Notify watch', { msg })
      if (msg) {
        this.showMsg()
      } else this.show = false
    },
  },
  mounted() {
    if (this.msg) this.showMsg()
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  },
  methods: {
    showMsg() {
      this.show = true

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.show = false
      }, this.showSec * 1000)
    },
  },
}
</script>

<style lang="postcss" scoped>
.notify {
  @apply fixed top-0 left-0 z-50;
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
  transform: translateY(-10px);
  opacity: 0;
}
</style>
