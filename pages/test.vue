<template>
  <div id="vueapp">
    <pre>{{ jsonstr }}</pre>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  components: {
    //
  },
  // filters: {
  //   pretty(value) {
  //     return JSON.stringify(JSON.parse(value), null, 2)
  //   },
  // },
  data() {
    return {
      jsonstr:
        '{"id":1,"name":"A green door","price":12.50,"tags":["home","green"]}',
    }
  },
}
</script>
