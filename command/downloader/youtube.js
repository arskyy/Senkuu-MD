let { monospace } = require('../../lib/function')

module.exports = {
  name: "play",
  alias: ["play","video","audio"],
  category: "downloader",
  use: "<query> / <link>",
  async run({msg,conn},{q,args, map}){
   let { prefix } = map;
   let { from, reply, sender, command} = msg;
   if(!q) throw `× Example : .${command} Duka`
   try {
     switch(command){
       case "play":
         await reply(respon.wait)
         require('yt-search').search(q).then(async i => {
         result = i.all[0]
         let y = await sc.youtube("mp3",result.url, "265")
         txt = "*乂 YouTube - Downloader*\n\n"
         txt += "``` × Title : " + y.title + "```\n"
         txt += "``` × Genre : " + y.genre + "```\n"
         txt += "``` × Size : " + y.size + "```\n"
         p = await tool.formatRupiah(`${y.views}`, ".")
         txt += "``` × Views : " + p + "```\n"
         txt += "``` × Quality : " + y.quality + "```\n"
         txt += "``` × Durasi : " + y.seconds + " sec " + ` ( ${y.timestamp} ) ` + "```\n"
         txt += "``` × Upload : " + y.uploadDate + ` ( ${y.ago} ) ` + "```\n"
         txt += "``` × Url : " + y.url + "```"
         const buttons = [
           { buttonId: `${prefix}audio ${result.url} ${sender}`,buttonText:{displayText: 'Audio'}, type : 1},
           { buttonId: `${prefix}video ${result.url} ${sender}`,buttonText:{displayText: 'Video'}, type : 1}
           ]
        const buttonMessage = {
           image: {url: y.thumb},
           caption: txt,
           footer: global.footer,
           buttons: buttons,
           headerType: 1
         }
       conn.sendMessage(msg.from, buttonMessage, {quoted : msg})
         })
         break;
         
       case "audio":
         if(sender != args[1])return msg.reply("Anda belum request lagu, silahkan request terlebih dahulu..")
         await reply(respon.wait)
         let audio = await sc.youtube("mp3",q, "265")
         conn.sendFile(msg.from, audio.link, "yt.mp3","", msg)
         break;
         
       case "video":
         if(sender != args[1])return msg.reply("Anda belum request video, silahkan request terlebih dahulu..")
         await reply(respon.wait)
         let video = await sc.youtube("mp4",q, "480")
         conn.sendFile(msg.from, video.link, "","", msg)
         break;
      
         
     }
   } catch (e){
     global.error(command, e, msg)
   }
  }
}
