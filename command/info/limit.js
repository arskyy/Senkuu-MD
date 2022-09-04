module.exports = {
  name: "limit",
  alias: ["limit","glimit"],
  category: "info",
  desc: "check limit",
  async run({msg, conn},{q, prefix}){
    if (msg.mentions.length !== 0){
      teks = "*INFO LIMIT USER*\n\n"
      teks += `*× Limit : ${prem.checkPremiumUser(msg.mentions[0], premium) ? "unlimited" : `${getLimit(msg.mentions[0], limitCount, limit)}/${limitCount}`}*` + "\n"
      teks += `*× Limit Game : ${cekGLimit(msg.mentions[0], gcount, glimit)}/${gcount}*` + "\n"
      teks += `*× Balance : $${getBalance(msg.mentions[0],balance)}*` + "\n\n"
      teks += `*You can buy limit with _${prefix}buylimit_ and _${prefix}buyglimit_ to buy game limit*`
      msg.reply(teks)
    } else {
      teks = "*INFO LIMIT USER*\n\n"
      teks += `*× Limit : ${prem.checkPremiumUser(msg.sender, premium) ? "unlimited" : `${getLimit(msg.sender, limitCount, limit)}/${limitCount}`}*` + "\n"
      teks += `*× Limit Game : ${cekGLimit(msg.sender, gcount, glimit)}/${gcount}*` + "\n"
      teks += `*× Balance : $${getBalance(msg.sender,balance)}*` + "\n\n"
      teks += `*You can buy limit with _${prefix}buylimit_ and _${prefix}buyglimit_ to buy game limit*`
      msg.reply(teks)
    }
  }
}