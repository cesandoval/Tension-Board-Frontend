<template>
  <div class="index">
    <div>
      <svg
        width="100vw"
        height="100vh"
        :style="{
          position: 'absolute',
        }"
      >
        <circle
          v-for="(d, i) in data"
          :key="i"
          :cy="y(i)"
          :cx="x(i)"
          r="2.5vh"
          :style="{
            stroke: 'orange',
            'stroke-width': '5px',
            'fill-opacity': 0,
          }"
          @click="test(i)"
        />
      </svg>
      <img
        src="/tension-board.png"
        style="width: auto; height: 98vh;"
        alt="Tension"
      />
    </div>
  </div>
</template>

<script>
const xSize = 3.46
const ySize = 6.15
export default {
  components: {
    //
  },
  data() {
    return {
      ledPos: [],
      data: [...Array(11 * 15).keys()],
    }
  },
  computed: {},
  methods: {
    x(i) {
      return (i % 11) * xSize + xSize + 'vw' // 3.47 is the width of each line
    },
    y(i) {
      return Math.floor(i / 11) * ySize + 2.7 + 'vh'
    },
    yCoord() {
      return 1.9 + ySize + 'vh' // each line is 3vh
    },
    test(i) {
      console.log('testestte' + i)
      console.log(i % 11)
    },
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
