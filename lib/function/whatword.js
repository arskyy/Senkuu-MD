const similarity = require('similarity')
const threshold = 0.72

module.exports = async function(msg, conn){
  const { sender, body, from, quoted } = msg
    conn.whatword = conn.whatword ? conn.whatword : {}
    let id = msg.from
		if (!msg.quoted || !msg.quoted.isSelf || !/~ Whatword/i.test(msg.quoted.text)) return !0;
		if (/Balas/.test(msg.quoted.text) && !(id in conn.whatword)) return msg.reply('Soal itu telah berakhir')
		if (msg.quoted.stanzaId == conn.whatword[id][0].key.id) {
		  let json = JSON.parse(JSON.stringify(conn.whatword[id][1]))
		  if (msg.body.toLowerCase() == json.jawaban.toLowerCase().trim()) {
		    var hadiah = Math.floor(Math.random() * 1000000);
		    addBalance(sender, hadiah, balance);
		    await msg.reply(`*^ Benar..*\n*Hadiah + $${hadiah} Balance*`)
        clearTimeout(conn.whatword[id][3])
        delete conn.whatword[id]
		  }else if (similarity(msg.body.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) msg.reply(`*Dikit Lagi!*`)
      else msg.reply(`*Salah!*`)
		}
		//return !0
}