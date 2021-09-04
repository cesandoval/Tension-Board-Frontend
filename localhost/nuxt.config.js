import path from 'path'
import fs from 'fs'

import config from '../nuxt.config.js'

const plugins = config.plugins.map(filepath => {
  const localFilePath =
    filepath.replace('@/plugins/', './plugins/local/') + '.js'

  const hasLocalFile = fs.existsSync(localFilePath)
  console.log(filepath, localFilePath, hasLocalFile)
  return hasLocalFile ? localFilePath : filepath
})
console.log({ plugins })

export default {
  ...config,
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt')),
    },
  },
  plugins,
}
