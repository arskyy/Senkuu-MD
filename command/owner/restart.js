let cp = require("child_process");
let { promisify } = require("util");
let exec = promisify(cp.exec).bind(cp);


module.exports = {
  name: "restart",
  alias: ["restart","reboot"],
  category: "private",
  isOwner: true,
  async run({msg}){
    try {
      await msg.reply("_*Restarting..*_")
      process.send("reset")
    } catch (e) {
      //global.error(msg.command, e, msg)
      await exec("node .")
    }
  }
}