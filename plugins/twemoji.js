import Vue from 'vue'

import twemoji from 'twemoji'

import '@/assets/css/twemoji.css'

const options = {
  folder: 'svg',
  ext: '.svg',
}

export default () => {
  twemoji.className = 'twemoji'

  Vue.directive('twemoji', {
    inserted(el) {
      el.innerHTML = twemoji.parse(el.innerHTML, options)
    },
  })

  Vue.directive('twemoji-svg-image', {
    bind(el, binding) {
      // console.log('twemoji-svg-image', binding.arg, binding.value)
      const emoji = binding.value
      if (!emoji) return

      const twemojiDom = twemoji.parse(emoji, options)

      const regexpImgSrc = /src="(?<imgSrc>\S+)"/
      const regexpImgSrcMatches = regexpImgSrc.exec(twemojiDom)
      if (!regexpImgSrcMatches) return

      const twemojiSrc = regexpImgSrcMatches.groups.imgSrc

      const defaultTwemojiSrc =
        'https://twemoji.maxcdn.com/v/13.0.0/svg/1f642.svg'

      if (twemojiSrc) el.setAttribute('xlink:href', twemojiSrc)
      else el.setAttribute('xlink:href', defaultTwemojiSrc)

      if (twemojiSrc) el.setAttribute('href', twemojiSrc)
      else el.setAttribute('href', defaultTwemojiSrc)

      if (twemojiSrc) el.setAttribute('src', twemojiSrc)
      else el.setAttribute('src', defaultTwemojiSrc)
    },
  })
}
