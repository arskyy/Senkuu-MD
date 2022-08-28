const fetch = require("node-fetch")

module.exports = {
  name: "bucin",
  alias: ["katabucin","bucin"],
  category: "random",
  async run({msg,conn}) {
    try {
   //   await msg.reply(respon.wait)
	fetch("https://raw.githubusercontent.com/ChandraSans/txt/main/katabucin.json")
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
