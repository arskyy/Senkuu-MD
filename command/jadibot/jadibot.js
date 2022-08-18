module.exports = {
  name: "jadibot",
  alias: ["jadibot"],
  category: "jadibot",
  desc: "Numpang bot",
  isPrivate: true,
  async run({conn, msg},{map}){
   // if(config.botNumber != config.botNumber) return msg.reply("_Tidak bisa membuat bot di dalam bot.._")
    try {
      require("../../jadibot").jadibot(msg, conn)
    } catch(e) {
      global.error(msg.command, e, msg)
    }
  }
}



