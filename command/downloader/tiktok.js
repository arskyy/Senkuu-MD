let { monospace, isUrl } = require('../../lib/function')

module.exports = {
  name: "tiktok",
  alias: ["tiktok","tiktoknowm","tiktokwm","tiktokmp3","donlodtt"],
  category: "downloader",
  query: "Not query url",
  use: "<url tiktok>",
  async run({msg, conn},{q, args, map, respon}){
    try {
      let { prefix } = map;
      let { from, reply, sender} = msg;
      command = msg.body.split(/ +/)[0].slice(1);
      switch(command){
        case "tiktok":
          if(!q) throw "Not query Url"
          if(!isUrl(q) && q.includes("tiktok.com")) throw "link invalid"
          await reply(respon.wait)
          var result = await rzky.downloader.tiktok(q);
          txt = "*乂 Tiktok - Downloader*\n\n"
          txt += monospace(` • Name : ${result.author_name}`) + "\n"
          txt += monospace(` • Author : ${result.author}`) + "\n"
          txt += monospace(` • Desc : ${result.desc}`)
          video = result.result.video
          audio = result.result.audio
          const buttons = [
            { buttonId: `.donlodtt ${video.wm.video_url} ${sender}` , buttonText: { displayText: 'Wm' }, type: 1 },
            { buttonId: `.donlodtt ${video.nowm.video_url} ${sender}`, buttonText: { displayText: 'No Wm' }, type: 1 },
            { buttonId: `.donlodtt ${audio.audio_url} ${sender}`, buttonText: { displayText: 'Audio' }, type: 1 }
            ]
            const buttonMessage = {
             image: {url: result.thumbnail},
             caption: txt,
             footer: "Get Wm / NoWm / Audio",
             buttons: buttons,
             headerType: 1
            }
          conn.sendMessage(from, buttonMessage, {quoted : msg})
          break;
          
        case "tiktokwm":
          if(!q) throw "Not query Url"
          if(!isUrl(q) && q.includes("tiktok.com")) throw "link invalid"
          await reply(respon.wait)
          result = await rzky.downloader.tiktok(q);
          get_result = result.result.video
          await conn.sendMessage(from,{video:{url : get_result.wm.video_url},caption : "Done WM"}, {quoted : msg})
          break;
          
        case "tiktoknowm":
          if(!q) throw "Not query Url"
          if(!isUrl(q) && q.includes("tiktok.com")) throw "link invalid"
          await reply(respon.wait)
          result = await rzky.downloader.tiktok(q);
          get_result = result.result.video
          await conn.sendMessage(from,{video:{url : get_result.nowm.video_url},caption : "Done NoWM"}, {quoted : msg})
          break;
          
        case "tiktokmp3":
          if(!q) throw "Not query Url"
          if(!isUrl(q) && q.includes("tiktok.com")) throw "link invalid"
          await reply(respon.wait)
          result = await rzky.downloader.tiktok(q);
          get_result = result.result.audio
          conn.sendFile(from, get_result.audio_url, get_result.audio_name,"",msg)
          break

        case "donlodtt":
          if(sender != args[1])return msg.reply("Anda belum request Tiktok Downloader, silahkan request terlebih dahulu..")
          await reply(respon.wait)
          await conn.sendFile(from, q, "","",msg)
          break;
          
      }
    } catch (e){
      global.error(command, e, msg)
    }
  }
}