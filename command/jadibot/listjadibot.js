module.exports = {
  name: "listjadibot",
  alias: ["listjadibot","listbot"],
  category: "jadibot",
  desc: "menampilkan user yang menumpang menjadi bot!!",
  async run({conn, msg}){
    try {
      let user = [... new Set([...global.conns.filter(conn => conn.user).map(conn => conn.user)])]
      te = "*List Jadibot*\n\n"
      for(let i of user){
        y = await conn.decodeJid(i.id)
        te += " × User : @" + y.split("@")[0] + "\n"
        te += " × Name : " + i.name + "\n\n"
      }
      user != "" ? await msg.reply(te,{withTag : true}) : await msg.reply("_*Tidak ada user yang menumpang..*_")
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
