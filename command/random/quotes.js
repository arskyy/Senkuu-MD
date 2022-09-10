const fs = require('fs')

module.exports = {
  name: "quotes",
  alias: ["quotes"],
  category: "random",
  wait: false,
  async run({msg, conn},{cmdNya}){
    try {
	let quotes = JSON.parse(fs.readFileSync(`./lib/storage/quotes.json`))
	let getData = quotes[Math.floor(Math.random() * quotes.length)]
	msg.reply(`${getData.quotes}\n\n~ ${getData.author}`); // ChandraSans
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
