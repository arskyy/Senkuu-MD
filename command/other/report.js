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
	        if(!q) throw "What do you want to report???"
	        let group = await conn.groupMetadata(from);
	        report = "├ User  : @" + sender.split("@")[0] + "\n";
	        report += "├ Laporan : " + q + "\n"
	        //report += "├ Group : " + group.subject + "\n"
	        report += "╰ Id : " + from 
	        conn.sendMessage(config.owner[0],{
	          text: report,
            footer: global.footer,
            buttons: [
              { buttonId: `.reportreject ${msg.from} ${sender} ${msg.key.id}`, buttonText: { displayText: 'Reject' }, type: 1 },
              { buttonId: `.reportblock ${group.id} ${sender} ${msg.key.id}`, buttonText: { displayText: 'Reject (Block)' }, type: 1 },
              { buttonId: `.reportacc ${group.id} ${msg.key.id}`, buttonText: { displayText: 'Accept' }, type: 1 }
              ],
            headerType: 1,
            withTag : true 
	        },{quoted : msg});
	        await reply('The report has been submitted to the Owner')
	        break;
	        
	      case "reportacc":
	        if(!own)return reply(respon.owner)
	        if(!msg.quoted) throw "Reply to the message"
          if(!args[0]) return
          if(!args[1]) return
          lap = '*The report has been received by the owner and will be processed*\n\n'
          lap += "Report details\n"
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
          lap = '*Report rejected, you will be blocked by bot*\n\n'
          lap += `Report Details\n`
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
          lap = '*Report rejected*\n\n'
          lap += `Report Details\n`
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
