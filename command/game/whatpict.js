const axios = require('axios')

module.exports = {
  name: "whatpict",
  alias: ["whatpict","pictclue","pictskip"],
  category: "game",
  desc: "Games tebakbendera",
  isLimit: true,
  async run({msg,conn},{prefix}){
    const { reply, from, sender, command } = msg
    conn.whatpict = conn.whatpict ? conn.whatpict : {}
    let id = from;
    let timeout = 120000
    switch(command){
      case "whatpict":
        if (id in conn.whatpict) {
          conn.sendMessage(from, {text: "*^ Pertanyaan sebelumnya belum terjawab..*"},{quoted: conn.whatpict[id][0]})
          throw false
        }
        const {data} = await axios.get('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')
        rand = data[Math.floor(Math.random() * data.length)]
        txt = `*SILAHKAN JAWAB GAMBAR DIATAS*\n\n`
        txt += `Timeout : *${(timeout / 1000).toFixed(2)} detik*\n`
        txt += `Balas pesan ini untuk menjawab, ketik *.pictclue* untuk bantuan dan *.pictskip* untuk menghapus sesi permainan\n\n*~ Whatpict*`
        conn.whatpict[id] = [
          await conn.sendMessage(msg.from,{image:{url: rand.img}, caption: txt},{quoted: msg}),
          rand,
          setTimeout(() => {
            if (conn.whatpict[id]) conn.sendMessage(from,{text: `*Waktu habis, jawabannya adalah ${rand.jawaban}*`},{adReply: true,quoted: conn.whatpict[id][0]},timeout)
            delete conn.whatpict[id]
          }, timeout)
          ]
        break

      case "pictclue":
        try {
          clue = conn.whatpict[id]
          if(clue === undefined) return reply("*Tidak ada sesi permainan yang berlangsung di group ini ^_^*")
          reply(`*${clue[1].deskripsi}*`)
        } catch (e) {
          global.error(msg.command, e, msg)
        }
        break

      case 'pictskip':
        try {
          skip = conn.whatpict[id]
          if(skip === undefined) return reply("*Tidak ada sesi permainan yang berlangsung di group ini ^_^*")
          delete conn.whatpict[id]
          reply("*^ Done..*")
        } catch (e){
          global.error(msg.command, e, msg)
        }
        break
    }
  }
}