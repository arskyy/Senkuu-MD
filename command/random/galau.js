const fs = require('fs')

module.exports = {
  name: "galau",
  alias: ["galau", "katagalau"],
  category: "random",
  wait: false,
  async run({msg, conn},{cmdNya}){
    try {
	let galau = JSON.parse(fs.readFileSync(`./lib/storage/galau.json`))
	let getData = galau[Math.floor(Math.random() * galau.length)]
	msg.reply(getData); // ChandraSans
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
