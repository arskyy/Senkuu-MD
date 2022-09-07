const far = require("xfarr-api")

module.exports = {
  name: "source",
  alias: ["sc","source"],
  category: "info",
  async run({msg, conn}){
    ss = await far.tools.ssweb("https://github.com/xzeera-id/Senkuu-MD")
    repo = await sc.ghrepo("Senkuu-MD")
    txt = "*乂 S O U R C E - B O T*\n\n"
    txt += ` • *SC : https://github.com/xzeera-id/Senkuu-MD*\n`
    txt += ` • *Watch : ${repo.items[0].watchers}*\n`
    txt += ` • *Forks : ${repo.items[0].forks}*\n`
    txt += ` • *Language : ${repo.items[0].language}*\n`
    txt += ` • *Create : ${repo.items[0].createdAt}*\n`
    txt += ` • *Update : ${repo.items[0].updatedAt}*`
    try {
      buffer = ss.result
      await conn.sendFile(msg.from,buffer,"",txt,msg)
    } catch (e){
      msg.reply(txt)
    }
  }
}
