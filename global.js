const fs = require('fs');
const { color } = require("./lib/function");

const {
  isLimit:isLimit,
  limitAdd:limitAdd,
  getLimit:getLimit,
  giveLimit:giveLimit,
  addBalance:addBalance,
  kurangBalance:kurangBalance,
  getBalance:getBalance,
  isGame:isGame,
  gameAdd:gameAdd,
  givegame:givegame,
  cekGLimit:cekGLimit
} = require("./lib/function/functionLimit")
global.prem = require("./lib/function/premium")
global.limit = JSON.parse(fs.readFileSync("./lib/database/limit.json"))
global.glimit = JSON.parse(fs.readFileSync("./lib/database/glimit.json"))
global.balance = JSON.parse(fs.readFileSync("./lib/database/balance.json"))
global.premium = JSON.parse(fs.readFileSync("./lib/database/premium.json"))
global.isLimit = isLimit
global.limitAdd = limitAdd
global.getLimit = getLimit
global.giveLimit = giveLimit
global.addBalance = addBalance
global.kurangBalance = kurangBalance
global.getBalance = getBalance
global.isGame = isGame
global.gameAdd = gameAdd
global.givegame = givegame
global.cekGLimit = cekGLimit;


global.shp = " ×"
global.config = require("./lib/config.json");
global.sc = require('./lib/scrape');
global.tool = require('./lib/tools');
global.footer = "*_乂 Simple WhatsApp - Bot_*"
const IkyyClient = require("ikyy");
global.rzky = new IkyyClient();
const Database = require('./lib/Database')
global.db = new Database()
global.conns = []

global.printLog = async(isCmd, sender, msg, body, groupName, isGc) => {
	if(isCmd && isGc) {
		return console.log(color("[ COMMAND GC ]", "aqua"),color(sender.split("@")[0], "lime"),color(body, "aqua"),"in",color(groupName, "lime"));
	}
	if(isCmd && !isGc) {
		return console.log(color("[ COMMAND PC ]", "aqua"), color(sender.split("@")[0], "lime"), color(body, "aqua"));
	}
}

global.reloadFile = (file, options = {}) => {
    nocache(file, module => {
    console.log(`File "${file}" has updated!\nRestarting!`)
    process.send("reset")
    })
}

function nocache(module, cb = () => {}) {
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
