//WM JANGAN DI HAPUS DEKK

const { monospace } = require('../../lib/function')
const fs = require("fs");
let multi_pref = new RegExp("^[" + "!#%&?/;:,.~-+=".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");
const moment = require("moment");
const processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

module.exports = {
  name: ['menu'].map((v) => v + ''),
  alias: ["cmd","menu"],
  category: "main",
  desc: "Menampilkan command",
  async run({conn, msg},{map, q}){
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

    try {
      if(q){
        for(const cmd of cmds){
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
        teks = global.footer + " *[ Recode Dari Senkuu-MD]*\n\n"
		  	teks += monospace(" ❏ Library : Baileys-MD") + "\n"
		  	teks += monospace(" ❏ Author : " + "@" + config.owner[0].split("@")[0] )+ "\n"
		  	teks += monospace(" ❏ Prefix : [ " + pref + " ]") + "\n\n"
		  	teks += monospace(`Halo, @${sender.split("@")[0]} Here my Command`) +`\n\n`;
		  	teks += `*乂 ${q.toUpperCase()}*\n`
		  	nganu = category[q]
		  	if(nganu == undefined) throw "Category not found!!"
        for(let i of nganu){
          teks += monospace(` × ${pref + i.name} ${map.lockcmd.get(i.name) ? "❌" : ""}`) + "\n"
        }
        teks += "\n*Bot Still in Development stage*"
        msg.reply(teks,{withTag: true})
      } else {
        for (let cmd of cmds){
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
			menu = global.footer + " *[ BOTCAHX ]*\n\n"
			menu += monospace(" ❏ Library : Baileys-MD") + "\n"
			menu += monospace(" ❏ Author : " + "@" + config.owner[0].split("@")[0] )+ "\n"
			menu += monospace(" ❏ Prefix : [ " + pref + " ]") + "\n"
			menu += monospace(" ❏ Date : " + date) + "\n"
			menu += monospace(" ❏ Time : " + time) + "\n"
		  menu += monospace(" ❏ Speed :  " + processTime(msg.messageTimestamp, moment()) + " Seccond") + "\n\n"
		  menu += "*This Bot script is : https://github.com/xzeera-id/Senkuu-MD*\n*Script Recode  : https://github.com/BOTCAHX/Senkuu-MD*\n_The sign ❌ means the Error or Feature is being Disabled by the Owner!!_\n\n"
			menu += monospace(`Halo, @${sender.split("@")[0]} Here my Command List`) +`\n\n`;
			const keys = Object.keys(category)
			menu += "*乂 CATEGORY MENU*\n"
			for(let o of keys){
			  menu += monospace(` × ${pref + msg.command} ${o}`) + "\n"
			}
			menu += "\n"
			for(let key of keys){
			  menu += `*乂 ${key.toUpperCase()}*\n`
			  menu += `${category[key].map((cmd) => monospace(` × ${cmd.options.noPrefix ? "" : pref}${cmd.name} ${map.lockcmd.get(cmd.name) ? "❌" : ""}`)).join("\n")} ` + "\n\n"
			}
			menu += `*Thanks To:*\n• Senkuu\n• ZeraaID\n• Zynfinity\n• BOTCAHX\n\n`
			menu += `_Note : Type ${prefix}help <command> to view command info_`
			
		/*	const buttons = [
           { buttonId: `.owner`,buttonText:{displayText: 'Owner'}, type : 1},
           { buttonId: `.ping`,buttonText:{displayText: 'Speed'}, type : 1}
           ]
        const buttonMessage = {
           image: {url: "https://telegra.ph/file/642a95448d0d2d4750a37.jpg"},
           caption: menu,
           footer: "Bot Still in Development stage",
           buttons: buttons,
           headerType: 1,
           withTag: true
         }
       conn.sendMessage(msg.from, buttonMessage, {quoted : msg})*/
       
       const { generateWAMessageFromContent } = require ("@adiwajshing/baileys")
       prep = generateWAMessageFromContent(msg.from, { liveLocationMessage: { 
         degreesLatitude: 35.685506276233525,
         degreesLongitude: 139.75270667105852,
caption: menu,
sequenceNumber: 1656662972682001, timeOffset: 8600, jpegThumbnail: null,
contextInfo: {mentionedJid: await parseMention(menu)}
}}, { quoted: msg
					})

return conn.relayMessage(msg.from, prep.message, { messageId: prep.key.id })
      }
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}


async function parseMention(text = ""){
  return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
