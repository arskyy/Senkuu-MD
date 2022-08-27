const { default: Axios } = require("axios")

module.exports = {
  name: "ppcouple",
  alias: ["ppcp","ppcouple"],
  category: "random",
  async run({msg,conn}) {
    try {
      await msg.reply(respon.wait)
      const { data } = await Axios.get("https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json")
      let random = data[Math.floor(Math.random() * data.length)]
      conn.sendFile(msg.from, random.male, "","*Male*",msg)
      conn.sendFile(msg.from, random.female, "","*Female*",msg)
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}