<template>
  <div class="index">
    <svg
      width="100%"
      height="100%"
      :style="{
        position: 'absolute',
      }"
      viewBox="0 0 1000 1000"
    >
      <image x="0" y="0" width="1000" height="1000" href="/tension-board.png" />

      <circle
        v-for="(d, i) in data"
        :key="i"
        :cx="x(i)"
        :cy="y(i)"
        r="26"
        :style="{
          stroke: colorData[i],
          'stroke-width': '5px',
          fill: 'transparent',
        }"
        @click="addHold(i)"
      />

      <circle
        v-for="(d, i) in setC"
        :key="d[0] + ',' + d[1]"
        :cx="setCX(d)"
        :cy="setCY(d)"
        r="26"
        :style="{
          stroke: colorData[d[0] + ',' + d[1]],
          'stroke-width': '5px',
          fill: 'transparent',
        }"
        @click="addHold(i, d[0] + ',' + d[1])"
      />
    </svg>

    <div class="fixed left-0 bottom-0 p-4">
      <div>
        <label for="">xSize</label>
        <input v-model="xSize" type="number" />
      </div>
      <div>
        <label for="">ySize</label>
        <input v-model="ySize" type="number" />
      </div>
      <div>
        <label for="">xOffset</label>
        <input v-model="xOffset" type="number" />
      </div>
      <div>
        <label for="">yOffset</label>
        <input v-model="yOffset" type="number" />
      </div>
      <div>
        <input
          id="magenta"
          type="radio"
          name="color"
          value="magenta"
          checked
          @change="color = 'magenta'"
        />
        <label for="magenta" style="color:magenta">&#9632;</label>

        <input
          id="blue"
          type="radio"
          name="color"
          value="blue"
          @change="color = 'blue'"
        />
        <label for="blue" style="color:blue">&#9632;</label>

        <input
          id="green"
          type="radio"
          name="color"
          value="green"
          @change="color = 'green'"
        />
        <label for="green" style="color:green">&#9632;</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    //
  },
  data() {
    return {
      ledPos: [],
      data: [...Array(11 * 15).keys()],
      xSize: 62.5,
      ySize: 62.5,
      xOffset: 211,
      yOffset: 31,
      color: 'magenta',
      colorData: {},
      selectedHolds: {},
      setC: [
        [2.5, 0.5],
        [4.5, 0.5],
        [7.5, 0.5],
        [9.5, 0.5],
        [2.5, 1.5],
        [3.5, 1.5],
        [5.5, 1.5],
        [6.5, 1.5],
        [8.5, 1.5],
        [9.5, 1.5],
        [2.5, 2.5],
        [4.5, 2.5],
        [5.5, 2.5],
        [6.5, 2.5],
        [7.5, 2.5],
        [9.5, 2.5],
        [2.5, 3.5],
        [3.5, 3.5],
        [4.5, 3.5],
        [5.5, 3.5],
        [6.5, 3.5],
        [7.5, 3.5],
        [8.5, 3.5],
        [9.5, 3.5],
        [1.5, 4.5],
        [4.5, 4.5],
        [5.5, 4.5],
        [6.5, 4.5],
        [7.5, 4.5],
        [10.5, 4.5],
        [1.5, 5.5],
        [2.5, 5.5],
        [5.5, 5.5],
        [6.5, 5.5],
        [9.5, 5.5],
        [10.5, 5.5],
        [1.5, 6.5],
        [2.5, 6.5],
        [4.5, 6.5],
        [5.5, 6.5],
        [6.5, 6.5],
        [7.5, 6.5],
        [9.5, 6.5],
        [10.5, 6.5],
        [1.5, 7.5],
        [2.5, 7.5],
        [5.5, 7.5],
        [6.5, 7.5],
        [9.5, 7.5],
        [10.5, 7.5],
        [3.5, 8.5],
        [4.5, 8.5],
        [5.5, 8.5],
        [6.5, 8.5],
        [7.5, 8.5],
        [8.5, 8.5],
        [1.5, 9.5],
        [5.5, 9.5],
        [6.5, 9.5],
        [10.5, 9.5],
        [1.5, 10.5],
        [3.5, 10.5],
        [4.5, 10.5],
        [5.5, 10.5],
        [6.5, 10.5],
        [7.5, 10.5],
        [8.5, 10.5],
        [10.5, 10.5],
        [1.5, 11.5],
        [2.5, 11.5],
        [4.5, 11.5],
        [5.5, 11.5],
        [6.5, 11.5],
        [7.5, 11.5],
        [9.5, 11.5],
        [10.5, 11.5],
      ],
      LEDIndex: {
        '1.5,11.5': 4,
        '1.5,10.5': 6,
        '1.5,9.5': 8,
        '1.5,7.5': 11,
        '1.5,6.5': 13,
        '1.5,5.5': 15,
        '1.5,4.5': 17,
        '2.5,11.5': 42,
        '2.5,7.5': 37,
        '2.5,6.5': 35,
        '2.5,5.5': 33,
        '2.5,3.5': 30,
        '2.5,2.5': 28,
        '2.5,1.5': 26,
        '2.5,0.5': 24,
        '3.5,10.5': 50,
        '3.5,8.5': 53,
        '3.5,3.5': 59,
        '3.5,1.5': 62,
        '4.5,11.5': 84,
        '4.5,10.5': 82,
        '4.5,8.5': 79,
        '4.5,6.5': 76,
        '4.5,4.5': 73,
        '4.5,3.5': 71,
        '4.5,2.5': 69,
        '4.5,0.5': 66,
        '5.5,11.5': 91,
        '5.5,10.5': 93,
        '5.5,9.5': 95,
        '5.5,8.5': 97,
        '5.5,7.5': 99,
        '5.5,6.5': 101,
        '5.5,5.5': 103,
        '5.5,4.5': 105,
        '5.5,3.5': 107,
        '5.5,2.5': 109,
        '5.5,1.5': 111,
        '6.5,11.5': 136,
        '6.5,10.5': 134,
        '6.5,9.5': 132,
        '6.5,8.5': 130,
        '6.5,7.5': 128,
        '6.5,6.5': 126,
        '6.5,5.5': 124,
        '6.5,4.5': 122,
        '6.5,3.5': 120,
        '6.5,2.5': 118,
        '6.5,1.5': 116,
        '7.5,11.5': 143,
        '7.5,10.5': 145,
        '7.5,8.5': 148,
        '7.5,6.5': 151,
        '7.5,4.5': 154,
        '7.5,3.5': 156,
        '7.5,2.5': 158,
        '7.5,0.5': 161,
        '8.5,10.5': 177,
        '8.5,8.5': 174,
        '8.5,3.5': 168,
        '8.5,1.5': 165,
        '9.5,11.5': 185,
        '9.5,7.5': 190,
        '9.5,6.5': 192,
        '9.5,5.5': 194,
        '9.5,3.5': 197,
        '9.5,2.5': 199,
        '9.5,1.5': 201,
        '9.5,0.5': 203,
        '10.5,11.5': 223,
        '10.5,10.5': 221,
        '10.5,9.5': 219,
        '10.5,7.5': 216,
        '10.5,6.5': 214,
        '10.5,5.5': 212,
        '10.5,4.5': 210,
        0: 22,
        1: 23,
        2: 64,
        3: 65,
        4: 113,
        5: 114,
        6: 162,
        7: 163,
        8: 204,
        9: 205,
        10: 241,
        11: 21,
        12: 25,
        13: 63,
        14: 67,
        15: 112,
        16: 115,
        17: 160,
        18: 164,
        19: 202,
        20: 206,
        21: 240,
        22: 20,
        23: 27,
        24: 61,
        25: 68,
        26: 110,
        27: 117,
        28: 159,
        29: 166,
        30: 200,
        31: 207,
        32: 239,
        33: 19,
        34: 29,
        35: 60,
        36: 70,
        37: 108,
        38: 119,
        39: 157,
        40: 167,
        41: 198,
        42: 208,
        43: 238,
        44: 18,
        45: 31,
        46: 58,
        47: 72,
        48: 106,
        49: 121,
        50: 155,
        51: 169,
        52: 196,
        53: 209,
        54: 237,
        55: 16,
        56: 32,
        57: 57,
        58: 74,
        59: 104,
        60: 123,
        61: 153,
        62: 170,
        63: 195,
        64: 211,
        65: 236,
        66: 14,
        67: 34,
        68: 56,
        69: 75,
        70: 102,
        71: 125,
        72: 152,
        73: 171,
        74: 193,
        75: 213,
        76: 235,
        77: 12,
        78: 36,
        79: 55,
        80: 77,
        81: 100,
        82: 127,
        83: 150,
        84: 172,
        85: 191,
        86: 215,
        87: 234,
        88: 10,
        89: 38,
        90: 54,
        91: 78,
        92: 98,
        93: 129,
        94: 149,
        95: 173,
        96: 189,
        97: 217,
        98: 233,
        99: 9,
        100: 39,
        101: 52,
        102: 80,
        103: 96,
        104: 131,
        105: 147,
        106: 175,
        107: 188,
        108: 218,
        109: 232,
        110: 7,
        111: 40,
        112: 51,
        113: 81,
        114: 94,
        115: 133,
        116: 146,
        117: 176,
        118: 187,
        119: 220,
        120: 231,
        121: 5,
        122: 41,
        123: 49,
        124: 83,
        125: 92,
        126: 135,
        127: 144,
        128: 178,
        129: 186,
        130: 222,
        131: 230,
        132: 3,
        133: 43,
        134: 48,
        135: 85,
        136: 90,
        137: 137,
        138: 142,
        139: 179,
        140: 184,
        141: 224,
        142: 229,
        143: 2,
        144: 44,
        145: 47,
        146: 86,
        147: 89,
        148: 138,
        149: 141,
        150: 180,
        151: 183,
        152: 225,
        153: 228,
        154: 1,
        155: 45,
        156: 46,
        157: 87,
        158: 88,
        159: 139,
        160: 140,
        161: 181,
        162: 182,
        163: 226,
        164: 227,
      },
    }
  },
  computed: {},
  methods: {
    x(i, n = null) {
      const { xSize, xOffset } = this
      return (i % 11) * xSize + xOffset // 3.47 is the width of each line
    },
    y(i, n = null) {
      const { ySize, yOffset } = this
      return Math.floor(i / 11) * ySize + yOffset
    },
    setCX(d) {
      const { xSize, xOffset } = this
      return (d[0] - 1) * xSize + xOffset // 3.47 is the width of each line
    },
    setCY(d) {
      const { ySize, yOffset } = this
      return d[1] * ySize + yOffset
    },
    yCoord() {
      const { ySize } = this

      return 1.9 + ySize // each line is 3vh
    },
    addHold(i, key = null) {
      if (key == null) key = i
      this.colorData[key] = this.color
      this.colorData = { ...this.colorData }
      this.selectedHolds[this.LEDIndex[key]] = this.color
    },
  },
}
</script>

<style lang="postcss" scoped>
/* Sample `apply` at-rules with Tailwind CSS */

.index {
  @apply min-h-screen w-screen flex justify-center items-center text-center flex-col;
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

input {
  @apply border-2;
}
</style>
