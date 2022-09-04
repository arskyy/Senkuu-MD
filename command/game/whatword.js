const fs = require("fs")

module.exports = {
  name: "whatword",
  alias: ["whatword","wordclue","wordskip"],
  category: "game",
  desc: "Games susunkata",
  //isGroup: true,
  isLimit: true,
  async run({msg, conn}){
    const { reply, from, sender, command } = msg
    conn.whatword = conn.whatword ? conn.whatword : {}
    let id = from;
    let timeout = 120000
    let src
    switch(command){
      case "whatword":
        if (id in conn.whatword) {
          conn.sendMessage(from, {text: "*^ Pertanyaan sebelumnya belum terjawab..*"},{quoted: conn.whatword[id][0]})
          throw false
        }
        if (!src) src = JSON.parse(require("fs").readFileSync("./lib/storage/whatword.json"));
        let json = src[Math.floor(Math.random() * src.length)]
        if (!json) return;
        txt = json.soal + "\n\n"
        txt += `Timeout : *${(timeout / 1000).toFixed(2)} detik*\n`
        txt += `Balas pesan ini untuk menjawab, ketik *.wordclue* untuk bantuan dan *.wordskip* untuk menghapus sesi permainan\n\n*~ Whatword*`
        conn.whatword[id] = [
          await reply(txt),
          json,setTimeout(() => {
            if (conn.whatword[id]) conn.sendMessage(from,{text: `*Waktu habis, jawabannya adalah ${json.jawaban}*`},{adReply: true,quoted: conn.whatword[id][0]})
            delete conn.whatword[id]
          }, timeout)
        ]
        break
      
      case "wordskip":
        try {
          skip = conn.whatword[id]
          if(skip === undefined) return reply("*Tidak ada permainan yang berlangsung di group ini ^_^*")
          delete conn.whatword[id]
          reply("*^ Done..*")
        } catch (e){
          global.error(msg.command, e, msg)
        }
        break

      case "wordclue":
        try {
          clue = conn.whatword[id]
          if(clue === undefined) return reply("*Tidak ada permainan yang berlangsung di group ini ^_^*")
          reply(`*${clue[1].clue}*`)
        } catch (e){
          global.error(msg.command, e, msg)
        }
        break
    }
  }
}