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
          if (map.isSelf) throw "Sudah berada dalam mode self";
				  map.isSelf = true;
			  	await msg.reply("Sukses mengubah ke mode self");
          break

        case 'publik':
        case "public":
          if (!map.isSelf) throw "Sudah berada dalam mode public";
			   	map.isSelf = false;
			  	await msg.reply("Sukses mengubah ke mode public");
          break
      }
    } catch (e){
      global.error(msg.command, e, msg)
    }
  }
}