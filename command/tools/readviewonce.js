module.exports = {
  name: "readviewonce",
  alias: ["rvo"],
  category: "tools",
  async run({msg, conn}){
    if(!msg.quoted) throw "Reply a viewOnceMessage"
    if(!/view_once/.test(msg.quoted.type)) throw "Reply a viewOnceMessage"
    let mtype = Object.keys(msg.quoted.message)[0]
    let buffer = await msg.quoted.download()
    let caption = msg.quoted.message[mtype].caption || ''
    conn.sendMessage(msg.from, { [mtype.replace(/Message/, '')]: buffer, caption }, { quoted: msg })
  }
}
