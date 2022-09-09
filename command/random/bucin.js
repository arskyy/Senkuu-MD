const fs = require('fs')

module.exports = {
  name: "bucin",
  alias: ["bucin", "katabucin"],
  category: "random",
  wait: false,
  async run({msg, conn},{cmdNya}){
    try {
	let bucin = JSON.parse(fs.readFileSync(`./lib/storage/bucin.json`))
	let getData = bucin[Math.floor(Math.random() * bucin.length)]
	msg.reply(getData); // ChandraSans
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
