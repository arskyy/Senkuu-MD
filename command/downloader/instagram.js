let { monospace, isUrl } = require('../../lib/function')

module.exports = {
  name: "ig",
	alias: ["ig","igdl"],
	category: "downloader",
	use: "<url>",
	async run({msg,conn},{q,args,map,cmdNya}){
	  let { prefix } = map;
    let { from, reply} = msg;
    if(!q) throw "Not query Url"
	  try {
	    let igdl = await sc.instagram(q)
	    if(/reel/.test(q)) return await conn.sendFile(msg.from, igdl.media[0].url,"", "*Done*", msg)
	    ngontol = igdl.media.length > 1 ? true : false
      if(ngontol) await msg.reply("Jumlah media lebih dari 1, media akan dikirim lewat private chat (PC)\nSilahkan cek chat dari bot><!")
      for(let i of igdl.media) {
        conn.sendFile(ngontol ? msg.sender : msg.from, i.url,"", "*Done*",msg)
          }
	  } catch (e){
	    global.error(msg.command, e, msg)
	  }
	}
}
