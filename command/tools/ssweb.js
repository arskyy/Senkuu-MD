const far = require("xfarr-api")

module.exports = {
  name: "ssweb",
  alias: ["ss"],
  category: "tools",
  async run({msg,conn},{q}){
    if(!q) throw `Example : .${msg.command} <url>`
    msg.reply(respon.wait)
    try {
      ss = await far.tools.ssweb(q)
      buffer = ss.result
      await conn.sendFile(msg.from,buffer,"",q,msg)
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}