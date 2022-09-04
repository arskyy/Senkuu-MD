module.exports = async function (msg,conn){
  const { sender, body, from, quoted } = msg
  conn.math = conn.math ? conn.math : {}
  let id = msg.from
  if (!msg.quoted || !msg.quoted.isSelf || !/~ Math/i.test(msg.quoted.text)) return !0;
  if (/Balas/.test(msg.quoted.text) && !(id in conn.math)) return msg.reply('Soal itu telah berakhir')
  if (msg.quoted.stanzaId == conn.math[id][0].key.id) {
    let json = JSON.parse(JSON.stringify(conn.math[id][1]))
    if (msg.body == json.jawaban) {
      var hadiah = Math.floor(Math.random() * 1000000);
		    addBalance(sender, hadiah, balance);
		    await msg.reply(`*^ Benar..*\n*Hadiah + $${hadiah} Balance*`)
        clearTimeout(conn.math[id][3])
        delete conn.math[id]
		  }else msg.reply(`*Salah!*`)
  }
}