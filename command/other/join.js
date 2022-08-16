module.exports = {
  name: "join",
	alias: ["join","accgc","rejectgc"],
	category: "other",
	desc: "Join to group using invite url.",
	isPrivate: true,
	async run({msg,conn},{args, q, cmdNya}) {
	  let { from, reply, sender, body} = msg;
	  let own = config.owner.includes(sender);
	  try {
	    switch(cmdNya){
	      case "join":
	        const rex = /chat.whatsapp.com\/([\w\d]*)/g;
	        let cod = q.match(rex);
	        if (cod === null) return await msg.reply("No invite url detected.");
	        txt = "*Invitation to join WhatsApp group*\n\n"
	        txt += " • User : @" + msg.sender.split("@")[0] + "\n"
	        txt += " • From : " + msg.from + "\n"
	        txt += " • Link Group : " + q
          reply("*Done, Tunggu sampai owner accept link nya :)*")
          return conn.sendMessage(config.owner[0], {
                 text: txt,
                 footer: global.footer,
                 buttons: [ 
                     { buttonId: `.accgc ${q} ${msg.from} ${msg.key.id}`, buttonText: { displayText: 'Terima (Join)' }, type: 1 },
                     { buttonId: `.rejectgc ${msg.from} ${msg.key.id}`, buttonText: { displayText: 'Tolak (Reject)' }, type: 1 }
                   ],
                  headerType: 1
                 ,withTag : true },{quoted : msg })
	        break;
	        
	      case "accgc":
	        if(!own)return reply(respon.owner)
	        const rex1 = /chat.whatsapp.com\/([\w\d]*)/g;
  	    	lap = '*Group Telah di accept oleh Owner*\n\n'
          lap += "*Detail*"
          lap +=  " " + msg.quoted.message.buttonsMessage.contentText.split("*Invitation to join WhatsApp group*")[1]
          let su = store.messages[args[1]].array.find(pe => pe.key.id === args[2]) 
          conn.sendMessage(args[1], {text: lap, withTag : true}, {quoted: su})
	      	let code = q.match(rex1);
		      if (code === null) return await msg.reply("No invite url detected.");
	      	code = code[0].replace("chat.whatsapp.com/", "");
		      let anu = await conn.groupAcceptInvite(code);
	       	if (!anu) return msg.reply("Looks like the group already full or became invalid when I'm trying to join :/")
           await msg.reply("Done..")
	        break;
	        
	      case "rejectgc":
	        if(!own)return reply(respon.owner)
	        lap = '*Group di Tolak oleh Owner*\n\n'
          lap += "*Detail*"
          lap +=  " " + msg.quoted.message.buttonsMessage.contentText.split("*Invitation to join WhatsApp group*")[1]
          let suu = store.messages[args[0]].array.find(pe => pe.key.id === args[1]) 
          let y = await conn.sendMessage(args[0], {text: lap, withTag : true}, {quoted: suu})
          let w = await conn.sendContact(args[0], config.owner, y);
          conn.sendMessage(args[0], { text: `_Chat owner jika ingin memasukkan BOT_` }, { quoted: w });
          await msg.reply("Done..")
	       break
	    }
	    
	  } catch (e){
	    global.error(cmdNya, e, msg)
	  }
	}
}

