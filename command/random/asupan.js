const fs = require('fs')

module.exports = {
  name: "randomasupan",
  alias: ["asupan"],
  category: "random",
  wait: true,
  async run({msg, conn},{cmdNya}){
    try {
      const asu = JSON.parse(fs.readFileSync('./lib/storage/asupan.json'))
      randIndex = Math.floor(Math.random() * asu.length);
      supan = asu[randIndex];
      await conn.sendMessage(msg.from, {video: {url : supan.url},caption: global.footer},{quoted: msg,})
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
