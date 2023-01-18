module.exports = {
  name: ["menfess", "confess"],
  alias: ["confes", "menfes"],
  category: "pesan rahasia",
  desc: "Pesan rahasia",
  isPrivate: true,
  async run( {msg,conn},{args,prefix,q}){
    const desc = `*乂 M E N F E S S - C H A T*\n\n*_Tersedia Category :_*\n   ◦ *${prefix}menfess*\n   ◦ *${prefix}menfesschat*\n\n*_Example :_*\n   ◦ *${prefix}menfess number|name|chat [ 628xxx|${config.botname}|Lu kontol ]*\n   ◦ *${prefix}menfesschat number [ 628xxx ]*\n\n${config.ownername}
 `.trim()
    text = q;
    text1 = text.split('|')[0]
    text2 = text.split('|')[1]
    text3 = text.split('|')[2]
    if(!text) msg.reply(desc)
    if(!text1.startsWith('628')) return msg.reply("*⚠️ Can only be filled with numbers Indonesian people!, for example: 628xxx*")
    if(!text2) return msg.reply("*⚠️ Please enter your name!*")
    if(!text3) return msg.reply("*⚠️ Please fill in the message!*")
    
    teks = "*乂 M E N F E S S - C H A T*\n\n"
    teks += "  ◦ *Pesan :* " + text3 + "\n"
    teks += "  ◦ *Dari :* " + text2 + "\n\n"
    teks += footer
    conn.sendMessage(text1 + "@s.whatsapp.net", {text: teks},{ adReply: true})
    await conn.sendMessage(msg.from,{
	          text: "*乂 M E N F E S S - C H A T*\n\n*Done mengirim pesan menfess kepada " + text1 + "*",
            footer: config.botname,
            buttons: [
              { buttonId: `.menfesschat ${text1}`, buttonText: { displayText: 'Ajak Chat' }, type: 1 }
              ],
            headerType: 1,
            withTag : true 
	        },{quoted : m});
    //msg.reply("*Done mengirim pesan menfess kepada " + text1 + "*")
  }
}
