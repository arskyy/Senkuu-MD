const prettyms = require("pretty-ms")
const { monospace } = require('../../lib/function')

module.exports = {
	name: "dashboard",
	alias: ["db"],
	desc: "display " + config.namebot + " bot dashboard info",
	category: "info",
	isSpam: true,
	wait: false,
	async run({ msg, conn }) {
		dashboard.sort(function (a, b) {
			return b.success - a.success;
		});
		let success = dashboard.map((a) => a.success);
		let failed = dashboard.map((a) => a.failed);
		let jumlah = require("mathjs").evaluate(success.join("+")) + require("mathjs").evaluate(failed.join("+"));
		
		txt = "*" + config.namebot + " Dashboard*\n\n"
		txt += "*乂 Global HIT*\n";
		txt += monospace(`   × Global : ${jumlah}`) + `\n`
		txt += monospace(`   × Success : ${require("mathjs").evaluate(success.join("+"))}`) + `\n`
		txt += monospace(`   × Failed : ${require("mathjs").evaluate(failed.join("+"))}`) + "\n\n";
		let dbny = dashboard.length > 5 ? 5 : dashboard.length;
		for(let i = 0; i < dbny; i++){
		  txt += `*乂 Command : ${dashboard[i].name}*\n`
		  txt += monospace(`   × Total : ${dashboard[i].success + dashboard[i].failed}`) + `\n`;
		  txt += monospace(`   × Success : ${dashboard[i].success}`) + `\n`; 
		  txt += monospace(`   × Failed : ${dashboard[i].failed}`) +`\n`;
		  txt += monospace(`   × Last Used : ${await prettyms(Date.now() - dashboard[i].lastUpdate, {
				verbose: true,
			})}`) + `\n\n`;
		}
		await msg.reply(txt, {adReply : true});
	},
};
