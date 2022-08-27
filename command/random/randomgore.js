const { monospace } = require('../../lib/function')

module.exports = {
  name: "randomgore",
  alias: ["gore","randomgore"],
  category: "random",
  wait: true,
  async run({msg, conn},{cmdNya}){
    try {
      gore = await sc.randomgore()
      result = gore.data
      txt = "*乂 Random - Gore*\n\n"
      txt += monospace(` × Judul : ${result.judul}`) + "\n" 
      txt += monospace(` × Views : ${result.views}`) + "\n"
      txt += monospace(` × Comment : ${result.comment}`) + "\n"
      txt += monospace(` × Link : ${result.link}`)
      await conn.sendFile(msg.from, result.link, "", txt, msg)
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}