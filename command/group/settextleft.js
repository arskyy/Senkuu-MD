module.exports = {
	name: "settextleft",
	alias: ["setleft"],
	desc: "Change Text On Left",
	category: "group",
	use: "<text>",
	query: "enter text\n@subject subject group\n@user tag participant is left\n@desc descripdescription",
        isAdmin: true,
	isGroup: true,
	async run({ msg, conn }, { q }) {
		let dataNeeded = db.cekDatabase("left", "id", msg.from);
		if (!dataNeeded) throw "Left This group is not activated yet,\nActived on command: *left on*";
		let data = JSON.parse(require("fs").readFileSync("./lib/database/left.json"));
		let da = data.find((a) => a.id == msg.from);
		da.teks = q;
		da.lastUpdate = Date.now();
		require("fs").writeFileSync("./lib/database/left.json", JSON.stringify(data, null, 2));
		await msg.reply("Done✓")
	},
};
