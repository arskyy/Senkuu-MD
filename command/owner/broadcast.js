module.exports = {
  name: "bc",
  alias: ["bc","bcgc"],
  category: "private",
  desc: "broadcast",
  isOwner: true,
  async run({msg, conn},{q , map}){
    bc = "*" + config.namebot + " Broadcast*\n\n"
    bc += q ? q : ""
    
    switch(msg.command){
      case "bcgc":
        id = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id) 
        if(msg.quoted && (msg.quoted.mtype == 'videoMessage' || msg.quoted.mtype == 'imageMessage')) {
          down = await tool.telegraph(await msg.quoted.download())
          for (let i of id){
            conn.sendFile(i, await conn.getBuffer(down), "", bc)
            await tool.sleep(1000)
          }
        } else {
          for(let i of id){
            conn.sendMessage(i,{text: bc})
            await tool.sleep(1000)
          }
        }
        break;
      
      case "bc":
        id = await store.chats.all().map(v => v.id)
        if(msg.quoted && (msg.quoted.mtype == 'videoMessage' || msg.quoted.mtype == 'imageMessage')) {
          down = await tool.telegraph(await msg.quoted.download())
          for (let i of id){
            conn.sendFile(i, await conn.getBuffer(down), "", bc)
            await tool.sleep(1000)
          }
        } else {
          for(let i of id){
            conn.sendMessage(i,{text: bc})
            await tool.sleep(1000)
          }
        }  
        break
    }
  }
}
