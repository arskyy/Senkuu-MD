module.exports = {
	name: "addcmd",
	alias: ["addcmd"],
	category: "private",
	desc: "Menyimpan / menambah file",
	isOwner: true,
	query: "Masukkan nama path file,\n example: .addcmd main/fitur",
	use: "<name file>\nExample .addcmd main/menu",
	isQuoted: true,
	async run({ msg, conn }, { q, map, args, cmdNya }) {
	  try {
	    q = q.split("/");
	    teks = `./command/${q[0]}/${q[1]}.js`
	   	await require("fs").writeFileSync(teks, msg.quoted.text);
	  	await msg.reply(`Saved successfully, and is restarting`);
	  	process.send("reset");
	  } catch (e){
	    global.error(cmdNya, e, msg)
	  }
	},
};
