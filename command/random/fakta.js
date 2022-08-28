const fetch = require("node-fetch")

module.exports = {
  name: "fakta",
  alias: ["fakta"],
  category: "random",
  async run({msg,conn}) {
    try {
   //   await msg.reply(respon.wait)
	fetch("https://raw.githubusercontent.com/ChandraSans/txt/main/fakta.txt")
		.then(res => res.text())
        	.then(body => {
            	let data = body.split('\n')
            	let sans = data[Math.floor(Math.random() * data.length)]
            	msg.reply(`${sans}`) // ChandraSans
        })
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
