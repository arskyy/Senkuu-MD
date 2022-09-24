module.exports = {
  name: "savefile",
  alias: ["sf","sv","safe","save"],
  category: "private",
  query: `Enter a file name, Example : \n × .save index.js\n × .save command/main/main.js ( Command )\n × .save lib/function/function.js\n × .save lib/function.js\n\n*Note : _Above is just an example!*_`,
  isOwner: true,
  isQuoted: true,
  async run({msg, conn},{q, args}){
    try {
      teks = `./${q}`
      await require("fs").writeFileSync(teks, msg.quoted.text);
	  	await msg.reply(`_*Saved successfully..*_`);
	  //	process.send("reset");
    } catch (e) {
      global.error(msg.command, e, msg)
    }
  }
}
