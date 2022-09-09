const { isUrl, monospace } = require("../function")
const instagramGetUrl = require ("instagram-url-direct")

exports.tiktok = async (isCmd, msg, conn) => {
  const { body , sender, from} = msg;
  if(!isCmd && isUrl(body) && /tiktok.com/i.test(body)) {
    if (!msg.quoted || !msg.quoted.isSelf || !msg.quoted.text.split("*").includes("[ TIKTOK DOWNLOADER ]")) return;
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
    if (!msg.quoted || !msg.quoted.isSelf || !msg.quoted.text.split("*").includes("[ FACEBOOK DOWNLOADER ]")) return;
    await msg.reply(respon.wait)
    try {
      var bod = isUrl(body);
      fbdl = await facebookDl(bod)
      txt = "*乂 Facebook - Downloader*"
      await conn.sendFile(msg.from, fbdl?.["720p"], "", txt, msg)
    } catch (e) {
      global.error("facebook", e, msg)
    }
  }
}

exports.instagram = async(isCmd, msg, conn) => {
  const { body , sender, from} = msg;
  if(!isCmd && isUrl(body) && /instagram.com/i.test(body)) {
    if (!msg.quoted || !msg.quoted.isSelf || !msg.quoted.text.split("*").includes("[ INSTAGRAM DOWNLOADER ]")) return;
    await msg.reply(respon.wait)
    try {
      var bod = isUrl(body);
      var result = await instagramGetUrl(bod)
      txt = "*乂 I N S T A - D O W N L O A D E R*"
      if(/reel/.test(bod)) return await conn.sendFile(from, result.url_list,"", txt, msg)
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



cheerio = require("cheerio")
fetch = require("node-fetch")
async function facebookDl(url) {
	let res = await fetch('https://fdownloader.net/')
	let $ = cheerio.load(await res.text())
	let token = $('input[name="__RequestVerificationToken"]').attr('value')
	let json = await (await fetch('https://fdownloader.net/api/ajaxSearch', {
		method: 'post',
		headers: {
			cookie: res.headers.get('set-cookie'),
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			referer: 'https://fdownloader.net/'
		},
		body: new URLSearchParams(Object.entries({ __RequestVerificationToken: token, q: url }))
	})).json()
	let $$ = cheerio.load(json.data)
	let result = {}
	$$('.button.is-success.is-small.download-link-fb').each(function () {
		let quality = $$(this).attr('title').split(' ')[1]
		let link = $$(this).attr('href')
		if (link) result[quality] = link
	})
	return result
}
