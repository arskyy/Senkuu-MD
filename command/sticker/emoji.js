module.exports = {
  name: "emoji",
  alias: ["emo"],
  category: "sticker",
  async run({msg, conn},{q, args, cmdNya}){
    if(!args[0]) throw `Example: .${cmdNya} 😭`
    await msg.reply(respon.wait)
    try {
      emo = await sc.emoji(args[0])
      const packInfo = {
        packname: config.packInfo.packname,
	  		author: config.packInfo.author,
       };
       const { sticker } = require("../../lib/convert");
       const { modStick, createExif } = require("../../lib/exif2");
       emoji = emo.result
       st = await sticker(await conn.getBuffer(emoji.whatsapp), {  withPackInfo: true, packInfo, cmdType: "1" });
       conn.sendMessage(msg.from, { sticker: st}, { quoted: msg});
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}