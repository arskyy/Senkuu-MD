module.exports = {
  name: "buylimit",
  alias: ["buylimit"],
  category: "other",
  use: "<angka>",
  async run({msg, conn},{q, prefix}){
    if(!q) throw `Send an order *${prefix + msg.command}* the limit amount you want to buy\n\nPrice 1 limit = $10000 balance`
    if (q.includes("-")) throw `Don't use -`;
		if (isNaN(q)) throw `Must be a number`;
		let ane = Number(Math.floor(q) * 10000)
    if (getBalance(msg.sender, balance) < ane) throw `Balance kamu tidak mencukupi untuk pembelian ini`;
    try {
      kurangBalance(msg.sender, ane, balance);
	  	giveLimit(msg.sender, Math.floor(q), limit);
      teks = "*Buy Limit Successful✓*\n\n"
      teks += " *× User : @" + msg.sender.split("@")[0] + "*\n"
      teks += " *× Beli sebanyak : " + q + "*\n"
      teks += " *× Remaining balance : $" + getBalance(msg.sender,balance) + "*\n"
      teks += " *× Remaining limit : " + `${getLimit(msg.sender, limitCount, limit)}/${limitCount}` + "*\n\n"
      teks += global.footer
      msg.reply(teks,{withTag : true})
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}