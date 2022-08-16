const { monospace } = require('../../lib/function')
const fs = require("fs");
let multi_pref = new RegExp("^[" + "!#%&?/;:,.~-+=".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");

module.exports = {
  name: ['menu'].map((v) => v + ''),
  alias: ["cmd","menu"],
  category: "main",
  desc: "Menampilkan command",
  async run({msg,conn}, {map}) {
    let { body , reply} = msg
    let pref = multi_pref.test(body) ? body.split("").shift() : ".";
    let locale = "id"
    let d = new Date(new Date() + 3600000)
    let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        })
    const { pushName, sender } = msg;
	  const { prefix, command } = map;
		const cmds = command.keys();
		let category = [];
    
    for (let cmd of cmds) {
				let info = command.get(cmd);
				if (!cmd) continue;
				if (config.ignore.directory.includes(info.category.toLowerCase())) continue;
				cteg = info.category || "No Category";
				if (info.type == "changelog") continue;
				if (!cteg || cteg === "private") cteg = "owner";
				if (Object.keys(category).includes(cteg)) category[cteg].push(info);
				else {
					category[cteg] = [];
					category[cteg].push(info);
				}
			}
			
			menu = global.footer + " *[ Beta✓ ]*\n\n"
			menu += monospace(" ❏ Library : Baileys-MD") + "\n"
			menu += monospace(" ❏ Author : " + "@" + config.owner[0].split("@")[0] )+ "\n"
			menu += monospace(" ❏ Prefix : [ " + pref + " ]") + "\n"
			menu += monospace(" ❏ Date : " + date) + "\n"
			menu += monospace(" ❏ Time : " + time) + "\n\n"
			menu += monospace(`Halo, @${sender.split("@")[0]} Here my Command List`) +`\n\n`;
			const keys = Object.keys(category)
			for(let key of keys){
			  menu += `*乂 ${key.toUpperCase()}*\n`
			  menu += `${category[key].map((cmd) => monospace(` × ${cmd.options.noPrefix ? "" : pref}${cmd.name}`)).join("\n")}` + "\n\n"
			}
			menu += `_Note : Ketik ${prefix}help <command> untuk melihat info command_`
			
			
			const buttons = [
           { buttonId: `.owner`,buttonText:{displayText: 'Owner'}, type : 1},
           { buttonId: `.ping`,buttonText:{displayText: 'Speed'}, type : 1}
           ]
        const buttonMessage = {
           image: {url: "https://telegra.ph/file/642a95448d0d2d4750a37.jpg"},
           caption: menu,
           footer: "Bot Masih dalam tahap Perkembangan",
           buttons: buttons,
           headerType: 1,
           withTag: true
         }
       conn.sendMessage(msg.from, buttonMessage, {quoted : msg})

/*const { generateWAMessageFromContent } = require ("@adiwajshing/baileys")

prep = generateWAMessageFromContent(msg.from, { liveLocationMessage: { 
degreesLatitude: 0, degreesLongitude: 0,
caption: menu,
sequenceNumber: 0, timeOffset: 0, jpegThumbnail: null
}}, { quoted: msg
					})

return conn.relayMessage(msg.from, prep.message, { messageId: prep.key.id })*/


  }
}
