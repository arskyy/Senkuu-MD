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
                        teks = global.footer + " *[ Beta ✓ ]*\n\n"
		  	teks += monospace(" ❏ Library : Baileys-MD") + "\n"
		  	teks += monospace(" ❏ Author : " + "@" + config.owner[0].split("@")[0] )+ "\n"
		  	teks += monospace(" ❏ Prefix : [ " + pref + " ]") + "\n\n"
		  	teks += monospace(`Hello, @${sender.split("@")[0]}!`) +`\n\n`;
		  	teks += `*乂 ${q.toUpperCase()}*\n`
		  	nganu = category[q]
		  	if(nganu == undefined) throw "Category tidak ditemukan!!"
        for(let i of nganu){
          teks += monospace(` × ${pref + i.name} ${map.lockcmd.get(i.name) ? "❌" : ""}`) + "\n"
        }
        teks += "\n*Bot masih dalam tahap Pengembangan!*"
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
			menu = global.footer + " *[ Beta ✓ ]*\n\n"
			menu += monospace(" ❏ Library : Baileys-MD") + "\n"
			menu += monospace(" ❏ Author : " + "@" + config.owner[0].split("@")[0] )+ "\n"
			menu += monospace(" ❏ Prefix : [ " + pref + " ]") + "\n"
			menu += monospace(" ❏ Date : " + date) + "\n"
			menu += monospace(" ❏ Time : " + time) + "\n"
		        menu += monospace(" ❏ Speed :  " + processTime(msg.messageTimestamp, moment()) + " Seccond") + "\n\n"
			menu += monospace(`Hello, @${sender.split("@")[0]}!`) +`\n\n`;
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
			menu += `Note : Ketik ${prefix}help <command> untuk melihat bantuan`
			
			const buttons = [
           { buttonId: `.owner`,buttonText:{displayText: 'Owner'}, type : 1},
           { buttonId: `.ping`,buttonText:{displayText: 'Speed'}, type : 1}
           ]
        const buttonMessage = {
           image: {url: "https://telegra.ph/file/642a95448d0d2d4750a37.jpg"},
           caption: menu,
           footer: "Bot masih dalam tahap Pengembangan!",
           buttons: buttons,
           headerType: 1,
           withTag: true
         }
       conn.sendMessage(msg.from, buttonMessage, {quoted : msg})
      }
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}