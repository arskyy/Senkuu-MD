module.exports = {
  name: "add",
	alias: ["add"],
	category: "group",
	desc: "add members to group",
	isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({msg, conn},{q, prefix}){
	  add = q ? q : msg.quoted ? msg.quoted : false;
	  if(!add) throw `Example : ${prefix + msg.command} 62811111111`
	  let chunk = [];
	  try {
	    q = msg.quoted ? msg.quoted.sender.split("@")[0] : q;
	  	let prk = q.replace(/[^a-zA-Z0-9 ]/g, "").split(" ");
	  	for(let i of prk){
	  	  i == " " ? "" : chunk.push(i + "@s.whatsapp.net");
	  	}
	  	let participant = await conn.groupParticipantsUpdate(msg.from, chunk, "add");
	  	await require("delay")(5000);
	  	const cek = await conn.groupMetadata(msg.from);
	  	if (global.statParticipant == true) {
		   	global.statParticipant = false;
		  	return;
	  	}
	  	for (let i of participant) {
	  	  if (!global.statParticipant && !cek.participants.includes(i)){
	  	    const code = await conn.groupInviteCode(msg.from);
		  		await msg.reply(" The number @" + i.split("@")[0] + " you added is private, inviting the user...", {withTag: true,});
			   	await conn.sendGroupV4Invite(msg.from, i, code, "", cek.subject);
	  	  }
	  	}
	  } catch (e){
	    global.error(msg.command, e, msg)
	  }
	}
}