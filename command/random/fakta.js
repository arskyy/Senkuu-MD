const fs = require('fs')

module.exports = {
  name: "fakta",
  alias: ["fakta"],
  category: "random",
  wait: false,
  async run({msg, conn},{cmdNya}){
    try {
	let fakta = JSON.parse(fs.readFileSync(`./lib/storage/fakta.json`))
	let getData = fakta[Math.floor(Math.random() * fakta.length)]
	msg.reply(getData); // ChandraSans
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
