const fetch = require("node-fetch")

module.exports = {
  name: "galau",
  alias: ["katagalau","galau"],
  category: "random",
  async run({msg,conn}) {
    try {
   //   await msg.reply(respon.wait)
	fetch("https://raw.githubusercontent.com/ChandraSans/txt/main/katagalau.json")
		.then(res => res.json())
        	.then(body => {
            	let sans = body[Math.floor(Math.random() * body.length)]
            	msg.reply(`${sans}`) // ChandraSans
        })
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
