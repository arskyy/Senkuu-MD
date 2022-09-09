const { monospace, isUrl } = require("../../lib/function")

module.exports = {
  name: "fb",
  alias: ["fbdl","facebook","fb"],
  category: "downloader",
  desc: "Download from Facebook",
  async run({msg, conn},{q}){
    if(!q) throw "*[ FACEBOOK DOWNLOADER ]*\n\nReply pesan ini dan kirim link url Facebook untuk Download.."
    if(!isUrl(q) && q.includes("facebook.com")) throw 'Link invalid!!'
    await msg.reply(respon.wait)
    try {
      fbdl = await facebookDl(q)
      txt = "*乂 Facebook - Downloader*"
      await conn.sendFile(msg.from, fbdl?.["720p"], "", txt, msg)
    } catch (e){
      global.error(msg.command, e, msg)
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
