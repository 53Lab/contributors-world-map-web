const PATH = './src/env.json'
const fs = require('fs')
const env = process.argv.length > 1 ? process.argv[2] : 'dev'
const json = getConfiguration(env)

fs.writeFileSync(PATH, json)
console.log(`${env} configuration file has been saved!`)

function getConfiguration (env) {
  const HOSTS = {
    dev: 'http://localhost:3005/',
    prod: 'http://contributors-world-map.julces.com:3005/'
  }
  const conf = {
    HOST: HOSTS[env] || HOSTS.dev
  }
  return JSON.stringify(conf, null, '\t')
}
