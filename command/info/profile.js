const phoneNum = require("awesome-phonenumber");

module.exports = {
  name: "profile",
  alias: ["me","profile"],
  category: "info",
  //isGroup: true,
  async run({msg,conn},{args, q}){
     try {
      block = await conn.fetchBlocklist()
     // const gc = await conn.groupMetadata(msg.from)
		  var tol = `${msg.sender.split("@")[0]}`;
      try {
        bio = await conn.fetchStatus(msg.sender);
      } catch {
        bio = "Bio Not found";
      }
      try {
        pp = await conn.profilePictureUrl(msg.sender, "image");
      } catch {
        pp = "https://i.ibb.co/Tq7d7TZ/age-hananta-495-photo.png";
      }
      gender = await require("axios").get(
			"https://api.genderize.io/?name=" + encodeURIComponent(conn.getName(msg.sender)));
      from = await phoneNum("+" + msg.sender.split("@")[0]).getRegionCode();
      Country = await require("country-language").getCountry(from);
      txt = `乂  *U S E R - P R O F I L E*\n\n`
      txt += `  ◦ *Name :* ${conn.getName(msg.sender)}\n`
      txt += `  ◦ *Tag :* @${msg.sender.split("@")[0]}\n`
      txt += `  ◦ *Bio :* ${bio.status || bio}\n`
      txt += `  ◦ *Number :* ${phoneNum("+" + tol.replace("@s.whatsapp.net", "")).getNumber("international")}\n`
      txt += `  ◦ *Gender :* ${gender.data.gender || "male" == "male" ? "Laki-Laki" : "Perempuan"}\n`
      txt += `  ◦ *From :* ${Country.name}\n\n`
      txt += `乂  *U S E R - S T A T U S*\n`
      txt += `  ◦ *Blocked :* ${block.includes(msg.sender) ? '√' : '×'}\n`
      txt += `  ◦ *Limit : ${prem.checkPremiumUser(msg.sender, premium) ? "unlimited" : `${getLimit(msg.sender, limitCount, limit)}/${limitCount}`}*` + "\n"
      txt += `  ◦ *Limit Game : ${cekGLimit(msg.sender, gcount, glimit)}/${gcount}*` + "\n"
      txt += `  ◦ *Balance : $${getBalance(msg.sender,balance)}*` + "\n\n"
      txt += "*Simple WhatsApp - Bot*"
      conn.sendMessage(msg.from, {
	  		image: { url: pp },
	  		caption: txt,
		  	mentions: [msg.sender],
	    	},{quoted:msg});
     } catch (e){
       global.error(msg.command, e, msg)
     }
  }
}