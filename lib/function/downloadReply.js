const { isUrl, monospace } = require("../function")
const instagramGetUrl = require ("instagram-url-direct")

exports.tiktok = async (isCmd, msg, conn) => {
  const { body , sender, from} = msg;
  if(!isCmd && isUrl(body) && /tiktok.com/i.test(body)) {
    if (!msg.quoted.text.split("*").includes("[ TIKTOK DOWNLOADER ]")) return;
    await msg.reply(respon.wait)
    try {
      var bod = isUrl(body);
      var result = await rzky.downloader.tiktok(bod);
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
    } catch (e) {
      global.error("tiktok", e, msg)
    }
  }
}

exports.facebook = async (isCmd, msg, conn) => {
  const { body, from } = msg;
  if(!isCmd && isUrl(body) && /facebook.com/i.test(body)) {
    if (!msg.quoted.text.split("*").includes("[ FACEBOOK DOWNLOADER ]")) return;
    await msg.reply(respon.wait)
    try {
      var bod = isUrl(body);
      fbdl = await sc.facebook2(bod)
      txt = "*乂 Facebook - Downloader*\n\n"
      txt += ` _× Title : ${fbdl.title}_\n`
      txt += ` _× Url : ${fbdl.hd != '' ? fbdl.hd : fbdl.sd}_`
      fbdl.hd != '' ? await conn.sendFile(from, fbdl.hd, "", txt, msg) : await conn.sendFile(from, fbdl.sd, "", txt, msg)
    } catch (e) {
      global.error("facebook", e, msg)
    }
  }
}

exports.instagram = async(isCmd, msg, conn) => {
  const { body , sender, from} = msg;
  if(!isCmd && isUrl(body) && /instagram.com/i.test(body)) {
    if (!msg.quoted.text.split("*").includes("[ INSTAGRAM DOWNLOADER ]")) return;
    await msg.reply(respon.wait)
    try {
      var bod = isUrl(body);
      var result = await instagramGetUrl(bod)
      txt = "*乂 I N S T A - D O W N L O A D E R*"
      if(/reel/.test(q)) return await conn.sendFile(from, result.url_list,"", txt, msg)
      chat = result.url_list.length > 1 ? true : false
      if(chat) await msg.reply(`Jumlah media ${result.url_list.length}, media akan dikirim lewat private chat (PC)\nSilahkan cek chat dari bot><!`)
      for(let i of result.url_list) {
        conn.sendFile(chat ? sender : from, i,"", txt,msg)
      }
    } catch (e) {
      global.error("instagram", e, msg)
    }
  }
}
