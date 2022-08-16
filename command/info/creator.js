module.exports = {
	name: "owner",
	alias: ["pemilik"],
	category: "info",
	async run({ msg, conn }, { q, map, args }) {
		var msga = await conn.sendContact(msg.from, config.owner, msg);
	},
};
