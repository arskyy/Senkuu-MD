module.exports = async function (msg,conn){
  try {
    const { sender, body, from, quoted } = msg;
    conn.menfess = conn.menfess ? conn.menfess : {}
    const find = Object.values(conn.menfess).find(menpes => [menpes.a, menpes.b].includes(msg.sender) && menpes.status == 'chatting')
        if(msg.isGroup) return
        if(find == undefined) return
        const to = find.a == msg.sender ? find.b : find.a
        conn.copyNForward(to, msg, true)
  } catch {}
}
