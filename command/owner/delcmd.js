module.exports = {
	name: "delcmd",
	alias: ["dcmd"],
	category: "private",
	desc: "Menghapus file",
	isOwner: true,
	use: "<name file>\nExample .delcmd main/menu",
	async run({ msg, conn }, { q, cmdNya }) {
	  if(!q) throw `Example : ${msg.command} main/menu`
	  try {
	    q = q.split("/");
	    teks = `./command/${q[0]}/${q[1]}.js`
	   	await require("fs").unlinkSync(teks);
	  	await msg.reply(`Delete successfully, and is restarting`);
	  	process.send("reset");
	  } catch (e){
	    await msg.reply("*Error, mungkin file tidak ada!!*\n\n" + String(e))
	    //global.error(cmdNya, e, msg)
	  }
	},
};
