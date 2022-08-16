const { monospace, isUrl } = require("../../lib/function")

module.exports = {
  name: "goredl",
  alias: ["goredl"],
  category: "downloader",
  desc: "Downloader gore",
  async run({msg, conn},{q}){
    if(!q) throw `_× Example : .${msg.command} <link>_`
    if(!isUrl(q) && q.includes("seegore.com")) throw 'Link invalid!!'
    await msg.reply(respon.wait)
    try {
      gor = await sc.goredl(q)
      gore = gor.data
      txt = "*乂 Gore - Downloader*\n\n"
      txt += monospace(` × Judul : ${gore.judul}`) + "\n"
      txt += monospace(` × Views : ${gore.views}`) + "\n"
      txt += monospace(` × Comment : ${gore.comment}`) + "\n"
      txt += monospace(` × Link : ${gore.link}`) + "\n\n"
      txt += "*_乂 Simple WhatsApp - Bot By Senkuu_*"
      conn.sendFile(msg.from, gore.link, "", txt,msg)
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}