const { sticker } = require("../../lib/convert");
const { modStick, createExif } = require("../../lib/exif2");
const fs = require("fs");
const encodeurl = require('encodeurl')
const ra = require('ra-api')

module.exports = {
  name: "meme",
  alias: ["meme","smeme"],
  category: "converter",
  desc: "Create meme image to sticker",
  async run({msg, conn},{q}){
    const { quoted, from, type , reply} = msg;
    const content = JSON.stringify(quoted);
    const isMedia = type === "imageMessage" || type === "videoMessage";
    const isQImg = type === "extendedTextMessage" && content.includes("imageMessage");
    const isQStic = type === "extendedTextMessage" && content.includes("stickerMessage");
    text = q;
    if(!text)return reply(`Wrong format!!\nExample : .${cmdNya} tes|ktl`)
    let t1 = await encodeurl(text.split('|')[0] ? text.split('|')[0] : '_')
    let t2 = await encodeurl(text.split('|')[1] ? text.split('|')[1] : '_')
    try {
      if (isQStic) {
        await reply(respon.wait)
				buff = await Buffer.from(await msg.quoted.download(), 'base64')
        const filepath = `./temp/${msg.command}-${msg.sender}.jpg`
        await fs.writeFileSync(filepath, buff)
	    	let file = await ra.UploadFile(filepath);
				const packInfo = {
          packname: "Senkuu BOT",
          author: "Beta✓",
        }
        //const url = await encodeurl(`https://api.memegen.link/images/custom/${t1}/${t2}.png?background=${file.result.namaFile}`)
        const stickerBuff = await sticker(await conn.getBuffer(`https://api.memegen.link/images/custom/${t1}/${t2}.png?background=${file.result.namaFile}`), {
                isImage: true,
                withPackInfo: true,
                packInfo,
                cmdType: "1"
            });
        await conn.sendMessage(msg.from, {sticker: stickerBuff}, {quoted: msg})
				
      } else if((isMedia && !msg.message.videoMessage) || isQImg){
        await reply(respon.wait)
        buffer = isQImg ? await quoted.download() : await msg.download();
				const upload = await tool.telegraph(buffer)
        const packInfo = {
          packname: "Senkuu BOT",
          author: "Beta✓",
        }
        const url = await encodeurl(`https://api.memegen.link/images/custom/${t1}/${t2}.png?background=${upload}`)
        const stickerBuff = await sticker(await conn.getBuffer(url), {
                isImage: true,
                withPackInfo: true,
                packInfo,
                cmdType: "1"
            });
        await conn.sendMessage(msg.from, {sticker: stickerBuff}, {quoted: msg})
      } else {
        msg.reply(`Wrong format!!\nExample : .${cmdNya} tes|ktl\nReply image/ stiker`)
      }
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
