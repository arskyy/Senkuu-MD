const fs = require('fs')
module.exports = async function(msg,conn){
  try{
    const anony = JSON.parse(fs.readFileSync('./lib/database/anonymous.json'))
            const find = Object.values(anony).find(anon => [anon.a, anon.b].includes(msg.sender) && anon.status == 'chatting')
            if(msg.isGroup) return
            if(find == undefined) return
            const to = find.a == msg.sender ? find.b : find.a
            conn.copyNForward(to, msg, true)
  } catch {}
}