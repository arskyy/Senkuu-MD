const { sticker } = require("../../lib/convert");
const { modStick, createExif } = require("../../lib/exif2");
const fs = require("fs");
const ra = require('ra-api')


module.exports = {
  name: "takestick",
  alias: ["take","wm"],
  category: "sticker",
  async run({msg, conn},{q}){
    const { quoted, from, type , reply} = msg;
    const content = JSON.stringify(quoted);
		const isQStic = type === "extendedTextMessage" && content.includes("stickerMessage");
    q = q.split("|");
		const packInfo = {
			packname: q[0] ? q[0] : "",
			author: q[1] ? q[1] : "",
		};
    
    if(isQStic){
      await reply(respon.wait)
			buff = await Buffer.from(await msg.quoted.download(), 'base64')
       const filepath = `./temp/${msg.command}-${msg.sender}.jpg`
       await fs.writeFileSync(filepath, buff)
        let file = await ra.UploadFile(filepath);
        const stickerBuff = await sticker(await conn.getBuffer(file.result.namaFile), {
                isImage: true,
                withPackInfo: true,
                packInfo,
                cmdType: "1"
            });
        await conn.sendMessage(msg.from, {sticker: stickerBuff}, {quoted: msg})
    } else {
      msg.reply("Reply sticker nya dengan caption ." + msg.command)
    }
  }
}