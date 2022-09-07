const { isUrl, monospace } = require("../function")

exports.tiktok = async (isCmd, msg, conn) => {
  const { body , sender, from} = msg;
  if(!isCmd && isUrl(msg.body) && /tiktok.com/i.test(msg.body)) {
    if (!msg.quoted.text.split("*").includes("[ TIKTOK DOWNLOADER ]")) return;
    await msg.reply(respon.wait)
    try {
      var bod = isUrl(msg.body);
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
  const { body } = msg;
  if(!isCmd && isUrl(msg.body) && /facebook.com/i.test(msg.body)) {
    if (!msg.quoted.text.split("*").includes("[ FACEBOOK DOWNLOADER ]")) return;
    await msg.reply(respon.wait)
    try {
      var bod = isUrl(msg.body);
      fbdl = await sc.facebook2(q)
      txt = "*乂 Facebook - Downloader*\n\n"
      txt += ` _× Title : ${fbdl.title}_\n`
      txt += ` _× Url : ${fbdl.hd != '' ? fbdl.hd : fbdl.sd}_`
      fbdl.hd != '' ? await conn.sendFile(msg.from, fbdl.hd, "", txt, msg) : await conn.sendFile(msg.from, fbdl.sd, "", txt, msg)
    } catch (e) {
      global.error("facebook", e, msg)
    }
  }
}
