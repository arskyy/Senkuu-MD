let fs = require("fs")
let { exec } = require("child_process")

module.exports = {
  name: "toimg",
  alias: ["toimg","toimage"],
  category: "converter",
  desc: "Mengubah sticker menjadi gambar",
  isSpam: true,
  async run({msg,conn}){
    if(msg.quoted && /sticker/.test(msg.quoted.mtype) && !msg.quoted.text.isAnimated){
      let img = await msg.quoted.download()
      await conn.sendMessage(msg.from, { image: img, jpegThumbnail: img }, { quoted: msg, adReply:true })
    } else if(msg.quoted && /sticker/.test(msg.quoted.mtype) && msg.quoted.text.isAnimated){
      await msg.reply("_Tunggu sebentar.._")
      let img = await msg.quoted.download()
      let out = await webpToVideo(img)
      await conn.sendMessage(msg.from, { video: out}, { quoted: msg })
    } else throw "Reply sticker nya"
  }
}


function webpToVideo(bufferImage) {
	return new Promise((resolve, reject) => {
		try {
			let pathFile = "./temp/" + ~~(Math.random() * 1000000 + 1) + ".webp"
			fs.writeFileSync(pathFile, bufferImage)
			exec(`convert ${pathFile} ${pathFile}.gif`, (error, stdout, stderr) => {
				exec(`ffmpeg -i ${pathFile}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${pathFile}.mp4`, (error, stdout, stderr) => {
					if (!fs.existsSync(pathFile + ".gif") || !fs.existsSync(pathFile + ".mp4")) {
						reject("Failed convert file!")
						fs.unlinkSync(pathFile)
						return
					}
					let videoBuffer = fs.readFileSync(pathFile + ".mp4")
					fs.unlinkSync(pathFile)
					fs.unlinkSync(pathFile + ".gif")
					fs.unlinkSync(pathFile + ".mp4")
					resolve(videoBuffer)
				})
			})
		} catch(e) {
			reject(e)
		}
	})
}