const fs = require('fs')

module.exports = {
  name: "blacklist",
  alias: ["blacklist", "addtoxic","deltoxic", "deletetoxic","listtoxic"],
  category: "group",
  desc: ['To add/remove forbidden word filter in group', '.addtoxic <word>'],
  isAdmin: true,
  isGroup: true,
  async run({conn, msg},{args, q}){
    const { sender, reply, command, from} = msg;
    
    switch(command){
      case "blacklist":
        txt = global.footer + "\n\n"
        txt += "*⚠️ Blacklist available :*\n"
        txt += " × addtoxic" + "\n"
        txt += " × deletetoxic" + "\n"
        txt += " × listtoxic" + "\n\n"
        txt += "*Example Penggunaan :* \n"
        txt += " × .addtoxic <kata toxic>" + "\n"
        txt += " × .deletetoxic <kata yg tersedia>" + "\n"
        txt += " × .listtoxic [ Showing the registered toxic word ]"
        reply(txt)
        break;
      
      case "addtoxic":
        if(!q) throw "Enter forbidden words!!"
          try {
            const word = JSON.parse(fs.readFileSync('./lib/database/toxic.json'))
            if(word[from] == undefined){
              word[from] = {
                kata: [],
                warning: {}
              }
            await fs.writeFileSync('./lib/database/toxic.json',JSON.stringify(word))
            }
            if(word[from].kata.includes(q)) return reply(`Kata ${q} already on the blacklist!`)
            word[from].kata.push(q)
            await fs.writeFileSync('./lib/database/toxic.json',JSON.stringify(word))
            reply(`Kata ${q} successfully entered into the forbidden word`)
            
          } catch (e){
            global.error(command, e, msg)
          }
        break

     case "deletetoxic":
     case "deltoxic":
       if(!q) throw "Enter forbidden words!!"
       try {
         const word = JSON.parse(fs.readFileSync('./lib/database/toxic.json'))
         if(!word[from].kata.includes(q)) return msg.reply(`Kata ${q} not in the word blacklist!`)
         word[from].kata.splice(word[from].kata.indexOf(q), 1)
         await fs.writeFileSync('./lib/database/toxic.json',JSON.stringify(word))
         reply(`Kata ${q} berhasil dihapus dari kata blacklist`)
       } catch (e){
         global.error(command, e, msg)
       }
       break

    case "listtoxic":
      const data = await conn.groupMetadata(from)
      const word = JSON.parse(require("fs").readFileSync('./lib/database/toxic.json'))
      txt = "*Black list in Group : " + data.subject + "*\n\n"
      txt += "*Total : " + word[from].kata.length + "*\n"
      txt += "*List :* \n"
      txt += " × " + word[from].kata.join(`\n × `) + "\n\n"
      txt += global.footer
      reply(txt)
      break
        
    }
  }
}
