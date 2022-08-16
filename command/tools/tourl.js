module.exports = {
	name: "tourl",
	alias: ["tourl", "tolink","upload"],
	desc: "Convert media to url",
	use: "reply media message",
	isMedia: {
		isQVideo: true,
		isQImage: true,
	},
	category: "tools",
	wait: true,
	async run({ msg, conn }, { q, cmdNya }) {
	  try {
		 y = await msg.quoted.download()
     buff = await tool.telegraph (y)
     msg.reply(buff)
	  } catch (e){
	    global.error(cmdNya, e, msg)
	  }
	},
};
