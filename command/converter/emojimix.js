const { sticker } = require("../../lib/convert");
const { modStick, createExif } = require("../../lib/exif2");
let fetch = require("node-fetch");

module.exports = {
	name: "emojimix",
	alias: ["emojimix"],
	use: "<emoji || emoji+emoji>",
	category: "converter",
	desc: "Sending Emoji stickers plus other emojis",
	wait: true,
	query: "Enter Emoji\nExample: .emojimix ☹️+😅",
	isSpam: true,
	async run({ msg, conn }, { q, map, args, cmdNya }) {
		try {
		 const packInfo = {
  			packname: "Senkuu BOT",
	  		author: "Beta✓",
       };
     emojis = await emojiStringToArray(await q.replace('+', ''))
     emo = await emojimix(emojis[0], emojis[1])
     st = await sticker(emo, {  withPackInfo: true, packInfo, cmdType: "1" });
     conn.sendMessage(msg.from, { sticker: st}, { quoted: msg , adReply : true});
		} catch (e) {
			console.log(e);
			global.error(cmdNya, e, msg)
			//await msg.reply(String(e));
		}
	},
};




function emojiStringToArray(str) {
                split = str.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/)
                arr = []
                for (var i = 0; i < split.length; i++) {
                  char = split[i]
                  if (char !== '') {
                    arr.push(char)
                  }
                }
                return arr
              }
              
              
 const emojimix = async(emo1, emo2) =>{
    let result = await fetch(`https://emojimix-api.justcaliph.tech/api/v1/${encodeURIComponent(emo1)}/${encodeURIComponent(emo2)}`);
     if (result.status != 200) throw await result.json();
     return result.buffer();
  }         
          