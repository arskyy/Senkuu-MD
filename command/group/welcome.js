const getPosition = (name, _dir) => {
	let position = null;
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === name) {
			position = i;
		}
	});
	if (position !== null) {
		return position;
	}
};

module.exports = {
	name: "welcome",
	alias: ["welcome"],
	desc: "activate the new member welcome feature",
	use: "on/off",
	category: "group",
	query: "enter options\non = aktif\noff = nonaktif",
	isAdmin: true,
	isSpam: true,
	async run({ msg, conn }, { args, prefix }) {
		let data = JSON.parse(require("fs").readFileSync("./lib/database/welcome.json"));
		let data2 = db.cekDatabase("welcome", "id", msg.from);
		if (args[0] == "on") {
			if (data2) throw "been active before";
			db.modified("welcome", { id: msg.from, teks: "Welcome to @subject good luck @user", lastUpdate: false });
			await msg.reply(`Welcome turned on successfully`);
		} else if (args[0] == "off") {
			if (!data2) throw "not active before";
			data.splice(getPosition(msg.from, data), 1);
			require("fs").writeFileSync("./lib/database/welcome.json", JSON.stringify(data, null, 2));
			await msg.reply("successfully delete session welcome in this group");
		}
	},
};
