const fs = require('fs')

module.exports = {
  name: "bijak",
  alias: ["bijak", "katabijak"],
  category: "random",
  wait: false,
  async run({msg, conn},{cmdNya}){
    try {
	let bijak = JSON.parse(fs.readFileSync(`./lib/storage/bijak.json`))
	let getData = bijak[Math.floor(Math.random() * bijak.length)]
	msg.reply(getData); // ChandraSans
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
