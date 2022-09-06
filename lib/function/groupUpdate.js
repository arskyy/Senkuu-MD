const fs = require("fs");

module.exports = async (conn, msg) => {
	let meta = await (await conn.groupMetadata(msg.id))
  let member = msg.participants[0]
  let dataLeft = db.cekDatabase("left", "id", msg.id) || { id: "" };
	let dataWelcome = db.cekDatabase("welcome", "id", msg.id) || { id: "" };
	let localonly = JSON.parse(fs.readFileSync("./lib/database/localonly.json"));
	let ppimg;
		try {
			ppimg = await conn.profilePictureUrl(member, "image");
		} catch {
			ppimg = config.thumb;
		}
	if(msg.action == "add"){
	  if(localonly.includes(msg.id)){
	    luar = `*Sorry @${member.split("@")[0]}⁩, this group is only for indonesian people and you will removed automatically.*`
		  await conn.sendMessage(msg.id,{text : luar, mentions : [member]})
		  await conn.groupParticipantsUpdate(msg.id, [member], "remove")
	  }
	  let txt = dataWelcome.teks.replace('@user', `@${member.split`@`[0]}`).replace('@subject', `${meta.subject}`).replace("@desc", meta.desc || "no description")
	  if(dataWelcome.id.includes(msg.id))conn.sendMessage(msg.id, {
				image: { url: ppimg },
				withTag: true,
				caption:txt},{adReply : true});
	} else if(msg.action == "remove"){
	  let txt = dataLeft.teks.replace('@user', `@${member.split`@`[0]}`).replace('@subject', `${meta.subject}`).replace("@desc", meta.desc || "no description")
	  if(dataLeft.id.includes(msg.id)) conn.sendMessage(msg.id, {
				image: { url: ppimg },
				withTag: true,
				caption:txt},{adReply:true});
	}
};
