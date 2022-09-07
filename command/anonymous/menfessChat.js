module.exports = {
  name: "menfesschat",
  alias: ["menfesschat","accmenfess","tolakmenfess"],
  category: "anonymous",
  desc: "Menfess chat",
  isPrivate: true,
  async run({msg,conn},{prefix,q}){
    conn.menfess = conn.menfess ? conn.menfess : {}
    const { body, reply, from, sender, command } = msg;
    const desc = `*Menfess Bot*\n\n*Example :*\n ◦ ${prefix}menfess 628xxxxx`
    button = [
      { buttonId: `.accmenfess`, buttonText: { displayText: 'Terima' }, type: 1 },
      { buttonId: `.tolakmenfess`, buttonText: {
        displayText: 'Tolak'}, type: 1}
      ]
    let id = msg.sender
    find = Object.values(conn.menfess).find(menpes => menpes.status == 'wait')
    roof = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender))
    
    switch(command){
      case 'menfesschat':
        if(roof) return msg.reply('Kamu masih berada dalam Obrolan!')
        if(!q) throw desc;
        if(!q.startsWith('628')) throw desc
        text = q + "@s.whatsapp.net"
        txt = "*Menfess Chat*\n\n"
        txt += `_Hallo @${q}, Seseorang *( @${sender.split("@")[0]} )* telah mengajakmu bermain chat menfess di bot ini_\n\n`
        txt += `*Balas pesan ini ( terima / tolak )*`
        reply(`*^Done, silahkan tunggu @${q} menerima pesannya..*`,{withTag: true})
        conn.sendMessage(text, {text:txt,footer: global.footer,buttons: button,headerType: 1, withTag: true},{adReply: true})
        conn.menfess[id] = {
          id: id,
          a: msg.sender,
          b: text,
          status: "wait",
        }
        break;
       
      case 'accmenfess':
       if(!roof) return msg.reply("Kamu belum memulai menfess..")
       try {
        find.b = msg.sender
        find.status = 'chatting'
        conn.menfess[find.id] = {...find}
        find = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender))
        conn.sendMessage(find.a,{text: `_@${msg.sender.split("@")[0]} menerima chat dengan anda, sekarang anda bisa chat lewat bot dengan dia.._\n\n*NOTE : Jika ingin berhenti dari menfess, silahkan ketik _.stopmenfess_ Untuk hapus session kalian..*`, withTag: true},{adReply: true})
        await reply("*^Done..*")
       } catch (e){
         global.error(msg.command, e, msg)
       }
        break

      case 'tolakmenfess':
        if(!roof) return msg.reply("Kamu belum memulai menfess..")
        find = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender))
        await conn.sendMessage(find.a, {text: `_@${find.b.split("@")[0]} Menolak bermain menfess.._`,withTag: true})
        reply("*^Done..*")
        delete conn.menfess[find.id]
        return !0
        break
    }
  }
}