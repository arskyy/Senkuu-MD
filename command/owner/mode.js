module.exports = {
  name: "mode",
  alias: ["self","public","publik"],
  category: "owner",
  isOwner: true,
  async run({conn, msg},{q,map}){
    try {
      switch(msg.command){
        case "mode":
          msg.reply(".self / .public")
         break

        case "self":
          if (map.isSelf) throw "Already in self mode";
				  map.isSelf = true;
			  	await msg.reply("Successfully change to self mode");
          break

        case 'publik':
        case "public":
          if (!map.isSelf) throw "Already in public mode";
			   	map.isSelf = false;
			  	await msg.reply("Successfully changing to public mode");
          break
      }
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}
