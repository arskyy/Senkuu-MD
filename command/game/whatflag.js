module.exports = {
  name: "whatflag",
  alias: ["whatflag","flagclue","flagskip"],
  category: "game",
  desc: "Game tebakbendera",
  isLimit: true,
  async run({msg, conn},{prefix}){
    const { reply, from, sender, command } = msg
    conn.whatflag = conn.whatflag ? conn.whatflag : {}
    let id = from;
    let timeout = 120000
    switch(command){
      case "whatflag":
        if (id in conn.whatflag) {
          conn.sendMessage(from, {text: "*^ Pertanyaan sebelumnya belum terjawab..*"},{quoted: conn.whatflag[id][0]})
          throw false
        }
        
        flag = await rzky.game.tebakbendera()
        txt = flag.bendera + "\n\n"
        txt += `Timeout : *${(timeout / 1000).toFixed(2)} detik*\n`
        txt += `Balas pesan ini untuk menjawab, ketik *.flagclue* untuk bantuan dan *.flagskip* untuk menghapus sesi permainan\n\n*~ Whatflag*`
        conn.whatflag[id] = [
          await reply(txt),
          flag,setTimeout(() => {
            if (conn.whatflag[id]) conn.sendMessage(from,{text: `*Waktu habis, jawabannya adalah ${flag.jawaban}*`},{adReply: true,quoted: conn.whatflag[id][0]})
            delete conn.whatflag[id]
          }, timeout)
          ]
        break
      
      
      case "flagskip":
        try {
          skip = conn.whatflag[id]
          if(skip === undefined) return reply("*Tidak ada permainan yang berlangsung di group ini ^_^*")
          delete conn.whatflag[id]
          reply("*^ Done..*")
        } catch (e){
          global.error(msg.command, e, msg)
        }
        break

      case "flagclue":
        try {
          clue = conn.whatflag[id]
          if(clue === undefined) return reply("*Tidak ada permainan yang berlangsung di group ini ^_^*")
          reply(`*${clue[1]. pertanyaan}*`)
        } catch (e){
          global.error(msg.command, e, msg)
        }
        break
    }
  }
}