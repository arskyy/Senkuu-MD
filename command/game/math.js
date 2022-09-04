let { genMath, modes } = require('../../lib/function/math')

module.exports = {
  name: "math",
  alias: ["math","kuismath","mathskip"],
  category: "game",
  desc: "Game matematika",
  isLimit: true,
  async run({msg, conn},{q, prefix}){
    conn.math = conn.math ? conn.math : {}
    const { reply, from, sender, command } = msg;
    let id = from;
    
      switch(msg.command){
        case "math": 
        case "kuismath":
          if (!q) throw `Mode: ${Object.keys(modes).join(' | ')}\nContoh penggunaan: ${prefix + msg.command} medium`
          if (id in conn.math) {
            conn.sendMessage(from, {text: "*^ Pertanyaan sebelumnya belum terjawab..*"},{quoted: conn.math[id][0]})
            throw false
           }
          let result = await genMath(q.toLowerCase())
          txt = `*Soal : ${result.soal}*\n\n`
          txt += `Timeout : *${(result.waktu / 1000).toFixed(2)} detik*\n`
          txt += "Balas pesan ini untuk menjawab, ketik *.mathskip* untuk menghapus sesi permainan\n\n*~ Math*"
          conn.math[id] = [
            await reply(txt),
            result,
            setTimeout(() => {
            if (conn.math[id]) conn.sendMessage(from,{text: `*Waktu habis, jawabannya adalah ${result.jawaban}*`},{adReply: true,quoted: conn.math[id][0]})
            delete conn.math[id]
          }, result.waktu)
      ]
          break
          
        case "mathskip":
          try {
            skip = conn.math[id]
            if(skip === undefined) return reply("*Tidak ada permainan yang berlangsung di group ini ^_^*")
            delete conn.math[id]
            reply("*^ Done..*")
          } catch (e){
            global.error(msg.command, e, msg)
          }
          break
      }
  }
}
