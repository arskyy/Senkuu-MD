module.exports = {
  name: "report",
  alias: ["reportacc","reportreject","report","reportblock"],
  category: "other",
  async run({msg,conn},{q,args, respon, cmdNya}){
    let { from, reply, sender, body} = msg;
    let own = config.owner.includes(sender);
	  try {
	    switch(cmdNya){
	      case "report":
	        if(!q) throw "Mau laporin apa??"
	        let group = await conn.groupMetadata(from);
	        report = "├ User  : @" + sender.split("@")[0] + "\n";
	        report += "├ Laporan : " + q + "\n"
	        //report += "├ Group : " + group.subject + "\n"
	        report += "╰ Id : " + from 
	        conn.sendMessage(config.owner[0],{
	          text: report,
            footer: global.footer,
            buttons: [
              { buttonId: `.reportreject ${msg.from} ${sender} ${msg.key.id}`, buttonText: { displayText: 'Tolak' }, type: 1 },
              { buttonId: `.reportblock ${group.id} ${sender} ${msg.key.id}`, buttonText: { displayText: 'Tolak (Block)' }, type: 1 },
              { buttonId: `.reportacc ${group.id} ${msg.key.id}`, buttonText: { displayText: 'Terima' }, type: 1 }
              ],
            headerType: 1,
            withTag : true 
	        },{quoted : msg});
	        await reply('Laporan sudah disampaikan kepada Owner')
	        break;
	        
	      case "reportacc":
	        if(!own)return reply(respon.owner)
	        if(!msg.quoted) throw "Reply pesan nya"
          if(!args[0]) return
          if(!args[1]) return
          lap = '*Laporan sudah diterima oleh Owner dan akan diproses*\n\n'
          lap += "Detail laporan\n"
          lap +=  msg.quoted.message.buttonsMessage.contentText
          su = store.messages[args[0]].array.find(pe => pe.key.id === args[1]) 
          conn.sendMessage(args[0], {text: lap, withTag : true}, {quoted: su})
          await msg.reply("Done..")
	        break;
	        
	      case "reportblock":
	        if(!own)return reply(respon.owner)
	        if(!msg.quoted) throw "Reply pesan nya"
          if(!args[0]) return
          if(!args[1]) return
          if(!args[2]) return
          lap = '*Laporan ditolak, anda akan diblock oleh bot*\n\n'
          lap += `Detail Laporan\n`
          lap +=  msg.quoted.message.buttonsMessage.contentText
          su = store.messages[args[0]].array.find(pe => pe.key.id === args[2]) 
          conn.sendMessage(args[0], {text: lap, withTag : true}, {quoted: su})
          await conn.updateBlockStatus(args[1], "block")
          await msg.reply("Done..")
	        break;
	        
	      case "reportreject":
	        if(!own)return reply(respon.owner)
	        if(!msg.quoted) throw "Reply pesan nya"
          if(!args[0]) return
          if(!args[1]) return
          if(!args[2]) return
          lap = '*Laporan ditolak*\n\n'
          lap += `Detail Laporan\n`
          lap +=  msg.quoted.message.buttonsMessage.contentText
          su = store.messages[args[0]].array.find(pe => pe.key.id === args[2]) 
          conn.sendMessage(args[0], {text: lap, withTag : true}, {quoted: su})
          await msg.reply("Done..")
	        break
	    }
	  } catch (e){
	    global.error(cmdNya, e, msg)
	  }
  }
}