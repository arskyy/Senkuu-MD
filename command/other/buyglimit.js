module.exports = {
  name: "buyglimit",
  alias: ["buyglimit"],
  category: "other",
  use: "<angka>",
  async run({msg, conn},{q, prefix}){
    if(!q) throw `Send an order *${prefix + msg.command}* the limit amount you want to buy\n\nPrice for 1 game limit = $20000 balance`
    if (q.includes("-")) throw `Don't use -`;
		if (isNaN(q)) throw `Must be a number`;
		let ane = Number(Math.floor(q) * 20000);
		if (getBalance(msg.sender, balance) < ane) throw `Your balance is not sufficient for this purchase`;
    try {
      kurangBalance(msg.sender, ane, balance);
	  	givegame(msg.sender, Math.floor(q), glimit);
	  	teks = "*Buy Limit Game Successful✓*\n\n"
      teks += " *× User : @" + msg.sender.split("@")[0] + "*\n"
      teks += " *× Beli sebanyak : " + q + "*\n"
      teks += " *× Remaining balance : $" + getBalance(msg.sender,balance) + "*\n"
      teks += " *× Remaining game limit : " + `${cekGLimit(msg.sender, gcount, glimit)}/${gcount}` + "*\n\n"
      teks += global.footer
      msg.reply(teks,{withTag : true})
    } catch (e) {
      global.error(msg.command, e, msg)
    }
  }
}