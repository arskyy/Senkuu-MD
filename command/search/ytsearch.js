let yts = require("yt-search")
let { monospace } = require('../../lib/function')


module.exports = {
  name: "ytsearch",
  alias: ["yts","ytsearch","youtubesearch","getmp3","getmp4","getmusic","getvideo"],
  category: "search",
  desc: "Search on youtube",
  async run({msg, conn},{q, cmdNya}) {
    let { quoted, from, reply } = msg;
    switch(cmdNya){
      case "yts":
      case "ytsearch":
      case "youtubesearch":
        if(!q) throw `Example : .${cmdNya} <query>`
        try {
          await msg.reply(respon.wait)
          let yt = await yts(q)
          let txt = `*YouTube Search*\n\n`
          txt += monospace(`Search in ${q}\nUntuk mengambil media, Silahkan reply pesan dengan Contoh :\n.getmp3 <urutan>\n.getmp4 <urutan>\n\n\n`)
          n = 0
          for ( var i of yt.all ) {
            txt += monospace(`No.${n+=1}\n`)
            txt += monospace(' × Title : ' + i.title + '\n')
            txt += monospace(' × Url : ' + i.url + '\n')
            txt += monospace(' × Id : ' + i.videoId + '\n')
            txt += monospace(' × Upload : ' + i.ago + '\n')
            p = await tool.formatRupiah(`${i.views}`, ".")
            txt += monospace (' × Views : ' + p + '\n\n')
           }
           await conn.sendFile(msg.from, yt.all[0].thumbnail, "",txt,msg)
        } catch (e){
          global.error(cmdNya, e, msg)
        }
        break;
        
        case "getmp3":
        case "getmusic":
          if(!q) throw `Example : .${cmdNya} 1`
          if(!msg.quoted) throw "Reply pesan"
          if(!msg.quoted.isSelf) throw "Reply pesan BOT"
          await reply(respon.wait)
          urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
          if (!urls) throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`
          y = await sc.youtube("mp3",urls[q - 1], "265")
          txt = "*乂 YouTube - Downloader*\n\n"
          txt += "``` × Title : " + y.title + "```\n"
          txt += "``` × Genre : " + y.genre + "```\n"
          txt += "``` × Size : " + y.size + "```\n"
          p = await tool.formatRupiah(`${y.views}`, ".")
          txt += "``` × Views : " + p + "```\n"
          txt += "``` × Quality : " + y.quality + "```\n"
          txt += "``` × Durasi : " + y.seconds + " sec " + ` ( ${y.timestamp} ) ` + "```\n"
          txt += "``` × Upload : " + y.uploadDate + ` ( ${y.ago} ) ` + "```\n"
          txt += "``` × Url : " + y.url + "```\n"
          await conn.sendFile(from, y.thumb, "", txt,msg)
          await conn.sendFile(msg.from, y.link, "yt.mp3","", msg)
          break
        
        case "getmp4":
        case "getvideo":
          if(!q) throw `Example : .${cmdNya} 1`
          if(!msg.quoted) throw "Reply pesan"
          if(!msg.quoted.isSelf) throw "Reply pesan BOT"
          await reply(respon.wait)
          urls = quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
          if (!urls) throw `Mungkin pesan yang anda reply tidak mengandung result ytsearch`
          y = await sc.youtube("mp4",urls[q - 1], "480")
          txt = "*乂 YouTube - Downloader*\n\n"
          txt += "``` × Title : " + y.title + "```\n"
          txt += "``` × Genre : " + y.genre + "```\n"
          txt += "``` × Size : " + y.size + "```\n"
          p = await tool.formatRupiah(`${y.views}`, ".")
          txt += "``` × Views : " + p + "```\n"
          txt += "``` × Quality : " + y.quality + "```\n"
          txt += "``` × Durasi : " + y.seconds + " sec " + ` ( ${y.timestamp} ) ` + "```\n"
          txt += "``` × Upload : " + y.uploadDate + ` ( ${y.ago} ) ` + "```\n"
          txt += "``` × Url : " + y.url + "```\n"
          await conn.sendFile(from, y.thumb, "", txt,msg)
          await conn.sendFile(msg.from, y.link, "yt.mp4","", msg)
          break
    }
  }
}
