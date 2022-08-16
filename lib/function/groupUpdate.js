const fs = require("fs")

const welcome = async (conn, msg) => {
  require("moment").locale("id");
	let groupData = await conn.groupMetadata(msg.id);
	let participant = msg.participants;
  let dataWelcome = db.cekDatabase("welcome", "id", msg.id) || { id: "" };
	for (let i of participant){
	  let ppimg;
	  try {
	    ppimg = await conn.profilePictureUrl(i, "image");
	  } catch {
	    ppimg = "https://telegra.ph/file/f9b2ed3ff30d538f086ae.jpg"
	  }
	  if (msg.action == "add" && dataWelcome.id.includes(msg.id)) {
	    let teks = dataWelcome.teks.replace("@ownergc", `${groupData.owner.split("@")[0]}`).replace("@creation",require("moment")(new Date(parseInt(groupData.creation) * 1000)).format("DD MMM YYYY HH:mm:ss")).replace("@user", `@${i.split("@")[0]}`).replace("@desc", groupData.desc.toString() || "no description").replace("@subject", groupData.subject) 
			return conn.sendMessage(msg.id, {
				image: { url: ppimg },
				withTag: true,
				caption:teks});
	  }
	}
}


const left = async(conn, msg) => {
  require("moment").locale("id");
	let groupData = await conn.groupMetadata(msg.id);
	let participant = msg.participants;
	let dataLeft = db.cekDatabase("left", "id", msg.id) || { id: "" };
	for (let i of participant) {
	  try {
	    ppimg = await conn.profilePictureUrl(i, "image");
	  } catch {
	    ppimg = "https://telegra.ph/file/f9b2ed3ff30d538f086ae.jpg"
	  }
	  if (msg.action == "remove" && dataLeft.id.includes(msg.id)) {
	    let txt = dataLeft.teks.replace("@ownergc", `${groupData.owner.split("@")[0]}`).replace("@creation",require("moment")(new Date(parseInt(groupData.creation) * 1000)).format("DD MMM YYYY HH:mm:ss")).replace("@user", `@${i.split("@")[0]}`).replace("@desc", groupData.desc.toString() || "no description").replace("@subject", groupData.subject) 
			return conn.sendMessage(msg.id, {
				image: { url: ppimg },
				withTag: true,
				caption:txt});
	  }
	}
}

const antiluar = async(conn, msg) => {
  let localOnly = JSON.parse(require("fs").readFileSync("./lib/database/localonly.json"));
  let local = localOnly.includes(msg.id);
	let groupData = await conn.groupMetadata(msg.id);
	let participant = msg.participants;
	for (let i of participant) {
	  if (msg.action == "add"){
	    if(!local && i.startsWith('51') || i.startsWith('52') || i.startsWith('212') || i.startsWith('91') || i.startsWith('92') || i.startsWith('1') || i.startsWith('60') || i.startsWith('65') || i.startsWith('265')) {
	     let luar = `*Sorry @${i.split("@")[0]}⁩, this group is only for Indonesian people and you will removed automatically.*`
		    await conn.sendMessage(msg.id,{text : luar, mentions : [i]})
		    await require("delay")(2000);
		    await conn.groupParticipantsUpdate(msg.id, [i], "remove")
		    await conn.updateBlockStatus(i, "block");
	    }
	  }
	}
}


module.exports = { welcome, left, antiluar }
