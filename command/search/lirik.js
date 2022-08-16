const lyrics = require("music-lyrics")

module.exports = {
  name: "lirik",
  alias: ["lirik","liric"],
  category: "search",
  desc: "Search lirik",
  async run({msg},{q, cmdNya}){
    if(!q) throw "Example: .lirik melukis senja"
        try{
            lir = await lyrics.search(q)
            lir != '' ? await msg.reply(lir) : await msg.reply('Lirik tidak ditemukan')
        }catch(e){
            global.error(cmdNya, e, msg)
        }
  }
}