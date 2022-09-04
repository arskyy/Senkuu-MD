const similarity = require('similarity')
const threshold = 0.72

module.exports = async function(msg, conn){
  const { sender, body, from, quoted } = msg
  conn.whatpict = conn.whatpict ? conn.whatpict : {}
  let id = msg.from
  if (!msg.quoted || !msg.quoted.isSelf || !/~ Whatpict/i.test(msg.quoted.text)) return !0;
  if (/Balas/.test(msg.quoted.text) && !(id in conn.whatpict)) return msg.reply('Soal itu telah berakhir')
  if (msg.quoted.stanzaId == conn.whatpict[id][0].key.id) {
    let json = JSON.parse(JSON.stringify(conn.whatpict[id][1]))
    if (msg.body.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      var hadiah = Math.floor(Math.random() * 1000000);
		  addBalance(sender, hadiah, balance);
		  await msg.reply(`*^ Benar..*\n*Hadiah + $${hadiah} Balance*`)
        clearTimeout(conn.whatpict[id][3])
        delete conn.whatpict[id]
    } else if (similarity(msg.body.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) msg.reply(`*Dikit Lagi!*`)
      else msg.reply(`*Salah!*`)
  }
}