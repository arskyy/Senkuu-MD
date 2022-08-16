const { monospace } = require("../../lib/function")

module.exports = {
  name: ["help"].map((v) => v + " <command>"),
  alias: ["help"],
  category: "main",
  desc: ['Melihat informasi dari Command', '.help <Command>'],
  async run({msg,conn},{ args, q, map}) {
      if(!q) return msg.reply("Example : .help menu",{adReply: true})
			const name = q.toLowerCase();
			const { command, prefix } = map;
			const cmd = command.get(name) || [...command.values()].find((x) => x.alias.find((x) => x == args[0]));
			if (!cmd || (cmd.category === "private" && !config.owner.includes(msg.sender)))
				return await msg.reply("Command not found");
			helpcmd = global.footer + "\n\n"
			helpcmd += "*Helper Command*\n\n"
			helpcmd += monospace(` × Command : ${q}`) + "\n"
			helpcmd += monospace(` × Triger Command : ${cmd.alias.join(", ")}`) + "\n"
			helpcmd += monospace(` × Category : ${cmd.category}`) + "\n\n"
			helpcmd += "*Command Atribute*\n"
			helpcmd += monospace(` × isOwner : ${cmd.options.isOwner ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × isAdmin : ${cmd.options.isAdmin ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × isBotAdmin : ${cmd.options.isBotAdmin ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × isGroup : ${cmd.options.isGroup ? '✅' : '❌'}`) + "\n"
			helpcmd += monospace(` × isPrivate : ${cmd.options.isPrivate ? '✅' : '❌'}`) + "\n\n"
			helpcmd += "*Command Description*\n"
			helpcmd += monospace(` × Deskripsi : ${cmd.desc}`) + "\n"
			helpcmd += monospace(` × Usage : ${prefix}${cmd.name} ${cmd.use}`) + "\n\n"
			helpcmd += "*Note :*\n"
			helpcmd += ` ➠ *[ ]* = Optional\n ➠ *|* = Or\n ➠ *<>* = Must be filled`
      msg.reply(helpcmd)
  }
}
