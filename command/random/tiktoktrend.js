const { monospace, random } = require("../../lib/function")
const { tiktoktrend } = require("../../lib/scrape");


module.exports = {
  name: "tiktoktrend",
  alias: ["tttrend","tiktoktrend"],
  category: "random",
  desc: "Unknown",
  wait: true,
  async run({msg,conn},{map, cmdNya}){
    try {
      var trend = await tiktoktrend();
      result = await random(trend.result)
      txt = "*乂 Tiktok - Trend*\n\n"
      txt += monospace(` • Username : ${result.username}`) + "\n"
      txt += monospace(` • Upload : ${result.upload_time}`) + "\n"
      txt += monospace(` • Views : ${result.views}`) + "\n"
      txt += monospace(` • Like : ${result.like}`) + "\n"
      txt += monospace(` • Comment : ${result.comment}`) + "\n"
      txt += monospace(` • Share : ${result.share}`) + "\n"
      txt += monospace(` • Caption : ${result.caption}`)
      conn.sendFile(msg.from, result.video, "tt.mp4",txt,msg)
    } catch (e){
      global.error(cmdNya, e, msg)
    }
  }
}
