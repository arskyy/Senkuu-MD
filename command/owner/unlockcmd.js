module.exports = {
	name: "unlockcmd",
	alias: ["ulockcmd"],
	category: "private",
	isOwner: true,
	desc: "unlock features ",
	use: `<name command>`,
	query: `Enter Parameter Name Command`,
	async run({ msg, conn }, { q, map, args, arg }) {
		var data = [...map.command.keys()];
		[...map.command.values()]
			.map((x) => x.alias)
			.join(" ")
			.replace(/ +/gi, ",")
			.split(",")
			.map((a) => data.push(a));
		if (!data.includes(q)) throw "Command not found";
		if (!map.lockcmd.has(q)) throw "This command has not been locked before";
		map.lockcmd.delete(q);
		await msg.reply(`Succes Membuka Lock Command "${q}"`);
	},
};
