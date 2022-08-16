module.exports = {
  name: "localonly",
  alias: ["localonly","antiluar"],
  category: "group",
  desc: "activate the number localonly group",
  use: "<on / off>",
  query: "enter options\non = aktif\noff = nonaktif",
  isGroup: true,
	isBotAdmin: true,
	isAdmin: true,
	async run({msg, conn},{args}){
	  let data = JSON.parse(require("fs").readFileSync("./lib/database/localonly.json"));
		let data2 = data.includes(msg.from);
	  if(args[0] == "on"){
	    if (data2) throw "been active before";
			db.modified("localonly", msg.from);
			await msg.reply(`Local only turned on successfully`);
	  } else if(args[0] == "off"){
	    if (!data2) throw "not active before";
			data.splice(data.indexOf(msg.from), 1);
			require("fs").writeFileSync("./lib/database/localonly.json", JSON.stringify(data, null, 2));
			await msg.reply("successfully delete session Local only in this group");
	  }
	}
}