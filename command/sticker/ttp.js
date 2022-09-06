const far = require("xfarr-api")
const { sticker } = require("../../lib/convert");

module.exports = {
  name: "ttp",
  alias: ["ttp"],
  category: "sticker",
  async run({msg, conn},{q}){
    const packInfo = {
        packname: config.packInfo.packname,
	  		author: config.packInfo.author,
       };
    if(!q) throw `Example : .${msg.command} ngentot`
  try{
    ttp = await far.maker.ttp(q)
    const stickerBuff = await sticker(await conn.getBuffer(ttp.result), {
                isImage: true,
                withPackInfo: true,
                packInfo,
                cmdType: "1"
            });
        await conn.sendMessage(msg.from, {sticker: stickerBuff}, {quoted: msg})
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
