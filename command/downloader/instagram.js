let { monospace, isUrl } = require('../../lib/function')
let instagramGetUrl = require ("instagram-url-direct")

module.exports = {
  name: "ig",
  alias: ["ig","igdl"],
  category: "downloader",
  use: "<url>",
  async run({msg,conn},{q}){
    if(!q) throw "*[ INSTAGRAM DOWNLOADER ]*\n\nReply pesan ini dan kirim link url Instagram untuk Download.."
	  try {
	    await msg.reply(respon.wait)
	    var result = await instagramGetUrl(q)
            txt = "*乂 I N S T A - D O W N L O A D E R*"
            if(/reel/.test(q)) return await conn.sendFile(msg.from, result.url_list,"", txt, msg)
            chat = result.url_list.length > 1 ? true : false
            if(chat) await msg.reply(`Jumlah media ${result.url_list.length}, media akan dikirim lewat private chat (PC)\nSilahkan cek chat dari bot><!`)
            for(let i of result.url_list) {
              conn.sendFile(chat ? msg.sender : msg.from, i,"", txt,msg)
            }
	  } catch (e){
	    global.error(msg.command, e, msg)
	  }
	}
}
