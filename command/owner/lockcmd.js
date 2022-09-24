module.exports = {
	name: "lockcmd",
	category: "private",
	isOwner: true,
	desc: "disable features ",
	use: `<name command | alasan>`,
	query: `Enter Command Name Parameters and reason, example: #lockcmd help | off`,
	async run({ msg, conn }, { q, map, args, arg }) {
		if (!args[2]) throw "Enter reason, example: #lockcmd play | tidur";
		var data = [...map.command.keys()];
		[...map.command.values()]
			.map((x) => x.alias)
			.join(" ")
			.replace(/ +/gi, ",")
			.split(",")
			.map((a) => data.push(a));
		if (!data.includes(q.split("|")[0].trim())) throw "Command tidak ditemukan";
		if (map.lockcmd.has(q.split("|")[0].trim())) throw "Command ini sudah di lock sebelumnya";
		map.lockcmd.set(q.split("|")[0].trim(), q.split("|")[1].trim());
		await msg.reply(`Succes Lock Command "${q.split("|")[0].trim()}" dengan alasan "${q.split("|")[1].trim()}"`);
	},
};
