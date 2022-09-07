module.exports = {
  name: "stopmenfess",
  alias: ["stopmenfess","menfessstop"],
  category: "anonymous",
  desc: "Menfess chat",
  isPrivate: true,
  async run({msg,conn}){
    conn.menfess = conn.menfess ? conn.menfess : {}
    const { body, reply, from, sender, command } = msg;
    find = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender))
    if(!find) return msg.reply("Kamu belum memulai menfess..")
    conn.sendMessage(find.a, {text: "_Partner meninggalkan Obrolan.._"})
    await reply("*^Done..*")
    delete conn.menfess[find.id]
    return !0
  }
}