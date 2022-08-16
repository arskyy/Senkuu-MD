let { areJidsSameUser } = require("@adiwajshing/baileys")

module.exports = {
  name: "linkgroup",
  alias: ["linkgc","linkgroup","grouplink"],
  category: "group",
  desc: "Get link group",
  async run({msg, conn},{args}) {
    let group = msg.from
    if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0]
    if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw 'Hanya bisa untuk id grup'
    let groupMetadata = await conn.groupMetadata(group)
    if (!groupMetadata) throw 'groupMetadata is undefined :\\'
    if (!('participants' in groupMetadata)) throw 'participants is not defined :('
    let me = groupMetadata.participants.find(user => areJidsSameUser(user.id, conn.user.id))
    if (!me) throw 'Aku tidak ada di grup itu :('
    if (!me.admin) throw 'Aku bukan admin T_T'
    msg.reply('https://chat.whatsapp.com/' + await conn.groupInviteCode(group), {adReply : true})
  }
}