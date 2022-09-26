module.exports = {
	name: "eval",
	alias: [">>", ">","eval"],
	category: "default",
	noPrefix: true,
	isOwner: true,
	desc: "running javascript code via command can also test something code",
	use: `">" <code javascript> with await and ">>" <code> live return or immediately show the result`,
	query: `Masukan Parameter Code`,
	async run({ msg, conn }, { q, map, args, Baileys, arg, prefix, response, chat }) {
	  function _(stdout){
	    msg.reply("```" + `root@tioxd:\n${stdout}` + "```")
	  }
		let kode = msg.body.trim().split(/ +/)[0];
		let teks;
		try {
			teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`);
		} catch (e) {
			teks = e;
		} finally {
			await _(require("util").format(teks).trim());
		}
	},
};
