<template>
  <div class="index">
    <div class="fixed top-0 p-2">
      <div>
        <label for="">Name of Climb</label>
        <input v-model="climbName" type="string" />
      </div>
    </div>
    <svg
      width="100%"
      height="100%"
      :style="{
        position: 'absolute',
      }"
      viewBox="0 0 1080 1645"
    >
      <image x="0" y="0" width="1080" height="1545" href="/tension-board.png" />
      <circle
        v-for="(d, i) in data"
        :key="i"
        :cx="x(i)"
        :cy="y(i)"
        r="33"
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
        r="33"
        :style="{
          stroke: colorData[d[0] + ',' + d[1]],
          'stroke-width': '5px',
          fill: 'transparent',
        }"
        @click="addHold(i, d[0] + ',' + d[1])"
      />

      <text
        x="270"
        y="1605"
        font-size="80"
        dominant-baseline="middle"
        text-anchor="middle"
        @click="clearAll"
      >
        🗑️
      </text>

      <text
        x="540"
        y="1605"
        font-size="80"
        dominant-baseline="middle"
        text-anchor="middle"
        @click="flip"
      >
        🔁
      </text>

      <text
        x="810"
        y="1605"
        font-size="80"
        dominant-baseline="middle"
        text-anchor="middle"
        @click="lightUp"
      >
        💡
      </text>
    </svg>

    <!-- <div class="fixed left-0 bottom-0 p-4">
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
    </div> -->
    <!-- <div class="fixed bottom-0 p-2 container-controls">
      <div class="tension-controls">
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
          id="green"
          type="radio"
          name="color"
          value="green"
          @change="color = 'green'"
        />
        <label for="green" style="color:green">&#9632;</label>
        <input
          id="blue"
          type="radio"
          name="color"
          value="blue"
          @change="color = 'blue'"
        />
        <label for="blue" style="color:blue">&#9632;</label>
        <input
          id="red"
          type="radio"
          name="color"
          value="red"
          @change="color = 'red'"
        />
        <label for="red" style="color:red">&#9632;</label>
      </div> -->
  </div>
</template>

<script>
import { ref, uploadBytes } from 'firebase/storage'

import { storage } from '@/services/firebase'

export default {
  components: {
    //
  },
  data() {
    return {
      ledPos: [],
      data: [...Array(11 * 15).keys()],
      xSize: 96.5,
      ySize: 96.5,
      xOffset: 95,
      yOffset: 44,
      climbName: '',
      color: 'magenta',
      colorData: {},
      selectedHolds: {},
      oldColorData: {},
      oldSelectedHolds: {},
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
        '6.5,11.5': 143,
        '6.5,10.5': 141,
        '6.5,9.5': 139,
        '6.5,8.5': 137,
        '6.5,7.5': 135,
        '6.5,6.5': 133,
        '6.5,5.5': 129,
        '6.5,4.5': 125,
        '6.5,3.5': 121,
        '6.5,2.5': 118,
        '6.5,1.5': 116,
        '7.5,11.5': 151,
        '7.5,10.5': 155,
        '7.5,8.5': 160,
        '7.5,6.5': 165,
        '7.5,4.5': 170,
        '7.5,3.5': 174,
        '7.5,2.5': 178,
        '7.5,0.5': 183,
        '8.5,10.5': 201,
        '8.5,8.5': 198,
        '8.5,3.5': 192,
        '8.5,1.5': 189,
        '9.5,11.5': 209,
        '9.5,7.5': 214,
        '9.5,6.5': 216,
        '9.5,5.5': 218,
        '9.5,3.5': 221,
        '9.5,2.5': 223,
        '9.5,1.5': 225,
        '9.5,0.5': 227,
        '10.5,11.5': 248,
        '10.5,10.5': 246,
        '10.5,9.5': 244,
        '10.5,7.5': 241,
        '10.5,6.5': 239,
        '10.5,5.5': 237,
        '10.5,4.5': 235,
        0: 22,
        1: 23,
        2: 64,
        3: 65,
        4: 113,
        5: 114,
        6: 185,
        7: 187,
        8: 228,
        9: 230,
        10: 266,
        11: 21,
        12: 25,
        13: 63,
        14: 67,
        15: 112,
        16: 115,
        17: 181,
        18: 188,
        19: 226,
        20: 231,
        21: 265,
        22: 20,
        23: 27,
        24: 61,
        25: 68,
        26: 110,
        27: 117,
        28: 180,
        29: 190,
        30: 224,
        31: 232,
        32: 264,
        33: 19,
        34: 29,
        35: 60,
        36: 70,
        37: 108,
        38: 119,
        39: 176,
        40: 191,
        41: 222,
        42: 233,
        43: 263,
        44: 18,
        45: 31,
        46: 58,
        47: 72,
        48: 106,
        49: 123,
        50: 172,
        51: 193,
        52: 220,
        53: 234,
        54: 262,
        55: 16,
        56: 32,
        57: 57,
        58: 74,
        59: 104,
        60: 127,
        61: 168,
        62: 194,
        63: 219,
        64: 236,
        65: 261,
        66: 14,
        67: 34,
        68: 56,
        69: 75,
        70: 102,
        71: 131,
        72: 167,
        73: 195,
        74: 217,
        75: 238,
        76: 260,
        77: 12,
        78: 36,
        79: 55,
        80: 77,
        81: 100,
        82: 134,
        83: 163,
        84: 196,
        85: 215,
        86: 240,
        87: 259,
        88: 10,
        89: 38,
        90: 54,
        91: 78,
        92: 98,
        93: 136,
        94: 162,
        95: 197,
        96: 213,
        97: 242,
        98: 258,
        99: 9,
        100: 39,
        101: 52,
        102: 80,
        103: 96,
        104: 138,
        105: 158,
        106: 199,
        107: 212,
        108: 243,
        109: 257,
        110: 7,
        111: 40,
        112: 51,
        113: 81,
        114: 94,
        115: 140,
        116: 157,
        117: 200,
        118: 211,
        119: 245,
        120: 256,
        121: 5,
        122: 41,
        123: 49,
        124: 83,
        125: 92,
        126: 142,
        127: 153,
        128: 202,
        129: 210,
        130: 247,
        131: 255,
        132: 3,
        133: 43,
        134: 48,
        135: 85,
        136: 90,
        137: 144,
        138: 149,
        139: 203,
        140: 208,
        141: 249,
        142: 254,
        143: 2,
        144: 44,
        145: 47,
        146: 86,
        147: 89,
        148: 145,
        149: 148,
        150: 204,
        151: 207,
        152: 250,
        153: 253,
        154: 1,
        155: 45,
        156: 46,
        157: 87,
        158: 88,
        159: 146,
        160: 147,
        161: 205,
        162: 206,
        163: 251,
        164: 252,
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

      // console.log(key in this.colorData, this.colorData)

      if (!(key in this.colorData)) this.color = 'magenta'
      else if (this.colorData[key] === 'magenta') this.color = 'green'
      else if (this.colorData[key] === 'green') this.color = 'blue'
      else if (this.colorData[key] === 'blue') this.color = 'red'
      else if (this.colorData[key] === 'red') this.color = 'green'

      if (!(this.colorData[key] === 'red')) {
        this.colorData[key] = this.color
        this.colorData = { ...this.colorData }

        this.selectedHolds[this.LEDIndex[key] - 1] = this.color
        this.selectedHolds = { ...this.selectedHolds }
      } else {
        delete this.colorData[key]
        this.colorData = { ...this.colorData }

        delete this.selectedHolds[this.LEDIndex[key] - 1]
        this.selectedHolds = { ...this.selectedHolds }
      }
    },
    // addHold(i, key = null) {
    //   if (key == null) key = i

    //   // console.log(key in this.colorData, this.colorData)
    //   if (!(key in this.colorData) || this.colorData[key] !== this.color) {
    //     this.colorData[key] = this.color
    //     this.colorData = { ...this.colorData }

    //     this.selectedHolds[this.LEDIndex[key] - 1] = this.color
    //     this.selectedHolds = { ...this.selectedHolds }
    //   } else if (this.colorData[key] === this.color) {
    //     delete this.colorData[key]
    //     this.colorData = { ...this.colorData }

    //     delete this.selectedHolds[this.LEDIndex[key] - 1]
    //     this.selectedHolds = { ...this.selectedHolds }
    //   }
    // },
    flip() {
      for (const [key, color] of Object.entries(this.colorData)) {
        delete this.colorData[key]
        delete this.selectedHolds[this.LEDIndex[key] - 1]

        if (key.includes(',')) {
          const newKey = Number.parseFloat(key.split(',')[0]) - 1
          const newY = key.split(',')[1]

          let mirroredKey =
            Number.parseFloat(newKey) - (newKey % 11) + (10 - (newKey % 11)) + 1
          mirroredKey = mirroredKey + ',' + newY
          this.updateObjects(mirroredKey, color)
        } else {
          const mirroredKey = parseInt(key) - (key % 11) + (10 - (key % 11))
          this.updateObjects(mirroredKey, color)
        }
      }
    },
    updateObjects(key, color) {
      this.colorData[key] = color
      this.colorData = { ...this.colorData }

      this.selectedHolds[this.LEDIndex[key] - 1] = color
      this.selectedHolds = { ...this.selectedHolds }
    },
    clearAll() {
      this.colorData = {}
      this.selectedHolds = {}
    },
    lightUp() {
      const climbName =
        this.climbName === ''
          ? (Math.random() + 1).toString(36).substring(2)
          : this.climbName
      const currentRef = ref(storage, 'current/test.json')
      const allRef = ref(storage, 'all/' + climbName + '.json')

      const jsonse = JSON.stringify(this.selectedHolds)
      const file = new Blob([jsonse], { type: 'application/json' })

      const d = new Date()

      // 'file' comes from the Blob or File API
      uploadBytes(currentRef, file).then(snapshot => {
        console.log('Uploaded a json at:' + d.getTime())
        uploadBytes(allRef, file).then(snapshot => {
          console.log('Uploaded a json to board at:' + d.getTime())
          this.oldColorData = { ...this.colorData }
          this.oldSelectedHolds = { ...this.selectedHolds }
        })
      })
    },
    undo() {
      this.colorData = { ...this.oldColorData }
      this.selectedHolds = { ...this.oldSelectedHolds }
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

.container-controls {
  width: 50%;
  overflow: hidden; /* contain floated elements */
}

.tension-controls {
  float: left;
  width: 20%;
}

input {
  @apply border-2;
}
</style>
