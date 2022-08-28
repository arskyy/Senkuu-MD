const fetch = require("node-fetch")

module.exports = {
  name: "darkjokes",
  alias: ["darkjokes"],
  category: "random",
  async run({msg,conn}) {
    try {
      await msg.reply(respon.wait)
	fetch("https://raw.githubusercontent.com/ChandraSans/txt/main/darkjokes.txt")
		.then(res => res.text())
        	.then(body => {
            	let data = body.split('\n')
            	let sans = data[Math.floor(Math.random() * data.length)]
            	conn.sendFile(msg.from, `${sans}`, 'darkjokes.jpg', '*Dark Jokes :D*\n\n© ChandraSans', msg) // ChandraSans
        })
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
