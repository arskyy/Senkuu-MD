const moment = require("moment-timezone");

const ping = function (timestamp, now) {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

const os = require("os");
let { performance } = require('perf_hooks')
const { sizeFormatter } = require("human-readable");
const formatSize = sizeFormatter({
	std: "JEDEC",
	decimalPlaces: "2",
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
});

// Check Bandwidth
async function checkBandwidth() {
var data = require("node-os-utils")
data = await data.netstat.stats()
let ind = 0
let out = 0
for (let i of data) {
ind = ind + i.inputBytes
out = out + i.outputBytes
}
return {
download: formatSize(ind),
upload: formatSize(out)
}
}


const { convertTime, monospace } = require("../../lib/function");

module.exports = {
	name: "ping",
	alias: ["ping", "speed"],
	category: "info",
	desc: "Bot response in second.",
	isSpam: true,
	async run({ msg }, {map}) {
	  try {
	    let old = performance.now()
      let neww = performance.now()
      let speed = neww - old
      var nodeos = require('node-os-utils')
      var { totalMemMb, usedMemMb, freeMemMb } = await nodeos.mem.info()
      var { upload, download } = await checkBandwidth()
                 
      text = "BOT STAT\n"
	  	text += ` × Ping : ${ping(msg.messageTimestamp, Date.now())} second(s)\n`
	  	text += ` × Speed : ${speed} milidetik\n`
	  	text += ` × Runtime : ${convertTime(map.uptime.getTime())}\n\n`
      text += "HOST\n"
      text += ` × Arch: ${os.arch()}\n`
      text += ` × CPU: ${os.cpus()[0].model}${
			os.cpus().length > 1 ? " (" + os.cpus().length + "x)" : ""}\n`
	  	text += ` × Release: ${os.release()}\n`
		  text += ` × Version: ${os.version()}\n`;
		  text += ` × Memory: ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}\n`;
	  	text += ` × Platform: ${os.platform()}\n\n`;
	  	text += `STATISTIK\n`
	  	text += ` × Download : ${download}\n`
	  	text += ` × Upload : ${upload}\n`
	  	text += ` × Storage : ${totalMemMb} MB\n`
	  	text += ` × Used Storage : ${usedMemMb} MB\n`
	  	text += ` × Free Storage : ${freeMemMb} MB`
	  	await msg.reply(monospace(text))
	  } catch (e){
	    global.error('ping',e, msg)
	  }
	},
};
