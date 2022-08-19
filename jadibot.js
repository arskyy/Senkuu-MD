/*

   * Monggoh di copas, tapi kasih kredit y bang :)
   * Thanks to : Senkuu, Fajar Ihsana, Zeera ID
   * Klo ada Bug / Error, chat wa aja bang wa.me/6281312960392
   * Yang pasti ada error nya, Karena masih tahap perkembangan..

*/

// BIG THANKS TO : RIZKYFDLH

require('./global')
const attr = {};
      attr.prefix = ".";
      attr.uptime = new Date();
      attr.command = new Map();
      attr.isSelf = config.self
   
const path = require("path");
const log = (pino = require("pino"));
let qrcode = require('qrcode')
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const utils = require("./lib/utils");
    
const { 
  default: makeWaSocket, 
  fetchLatestBaileysVersion, 
  makeInMemoryStore, 
  jidDecode,
  useMultiFileAuthState, 
  DisconnectReason
} = require("@adiwajshing/baileys")


const ReadFitur = () => {
	let pathdir = path.join(__dirname, "./command");
	let fitur = fs.readdirSync(pathdir);
	fitur.forEach(async (res) => {
		const commands = fs.readdirSync(`${pathdir}/${res}`).filter((file) => file.endsWith(".js"));
		for (let file of commands) {
			const command = require(`${pathdir}/${res}/${file}`);
			if (typeof command.run != "function") continue;
			const cmdOptions = {
				name: "command",
				alias: [""],
				desc: "",
				use: "",
				type: "", // default: changelog
				category: typeof command.category == "undefined" ? "No Category" : res.toLowerCase(),
				wait: false,
				isOwner: false,
				isAdmin: false,
				isQuoted: false,
				isGroup: false,
				isBotAdmin: false,
				query: false,
				isPrivate: false,
				noPrefix: false,
				isMedia: {
					isQVideo: false,
					isQAudio: false,
					isQImage: false,
					isQSticker: false,
					isQDocument: false,
				},
				disable: false,
				isUrl: false,
				run: () => {},
			};
			let cmd = utils.parseOptions(cmdOptions, command);
			let options = {};
			for (var k in cmd)
				typeof cmd[k] == "boolean"
					? (options[k] = cmd[k])
					: k == "query" || k == "isMedia"
					? (options[k] = cmd[k])
					: "";
			let cmdObject = {
				name: cmd.name,
				alias: cmd.alias,
				desc: cmd.desc,
				use: cmd.use,
				type: cmd.type,
				category: cmd.category,
				options: options,
				run: cmd.run,
			};
			attr.command.set(cmd.name, cmdObject);
			require("delay")(100);
			global.reloadFile(`./command/${res}/${file}`);
		}
	});
};
ReadFitur();

const decodeJid = (jid) => {
  if (/:\d+@/gi.test(jid)) {
    const decode = jidDecode(jid) || {};
    return ((decode.user && decode.server && decode.user + "@" + decode.server) || jid).trim();
  } else return jid.trim();
}


if(global.conns instanceof Array) console.log()
else global.conns = []

const jadibot = async (msg, conn) => {
  const { sendFile , sendMessage} = conn;
  const { reply, from, command, sender } = msg;
  const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, `./lib/storage/session-${sender.split("@")[0]}`), log({ level: "silent" }));
  try {
    const start = async() => {
      let { version, isLatest } = await fetchLatestBaileysVersion();
      const conn = await makeWaSocket({
        auth: state,
        browser: [`Jadibot`, "Chrome", "1.0.0"],
	    	logger: log({ level: "silent" }),
	    	version,
      })
      
      conn.store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) });
      
      conn.store.bind(conn.ev);
      conn.ev.on("creds.update", saveCreds);
      conn.ev.on("connection.update", async up => {
        const { lastDisconnect, connection } = up;
        if(connection == "connecting") return await msg.reply("_*Connecting to Jadibot..*_");
        if(connection){
          if (connection != "connecting") console.log("Connecting to jadibot..")
        }
        console.log(up)
        if(up.qr) await sendFile(msg.from, await qrcode.toDataURL(up.qr,{scale : 8}),"", 'Scan QR ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk WhatsApp Web\n3. Scan QR ini \nQR Expired dalam 20 detik', msg)
        console.log(connection)
        if (connection == "open") {
          conn.id = decodeJid(conn.user.id)
          conn.time = Date.now()
          global.conns.push(conn)
	  await msg.reply(`*Connected to Whatsapp - Bot*\n\n*User :*\n _*× id : ${decodeJid(conn.user.id)}*_`)
	  user = `${decodeJid(conn.user.id)}`
	  txt = `*Terdeteksi menumpang Jadibot*\n\n _× User : @${user.split("@")[0]}_`
	  sendMessage(config.owner[0],{text: txt,  withTag : true})
        }
        if(connection == "close") {
          let reason = new Boom(lastDisconnect.error).output.statusCode;
          if (reason === DisconnectReason.restartRequired) {
            msg.reply("_*Restart Required, Restarting...*_")
            start();
          } else if (reason === DisconnectReason.timedOut) {
            msg.reply("_*Connection Timeout..*_")
			    	conn.logout()
          } else {
            conn.end(`Unknown DisconnectReason: ${reason}|${lastDisconnect.error}`);
          }
        }
      })
      
  conn.ev.on("contacts.update", (m) => {
		for (let kontak of m) {
			let jid = decodeJid(kontak.id);
			if (conn.store && conn.store.contacts) conn.store.contacts[jid] = { jid, name: kontak.notify };
		}
	});

	conn.ev.on("group-participants.update", async (msg) => {
		require("./lib/function/groupUpdate").welcome(conn, msg);
		require("./lib/function/groupUpdate").left(conn, msg);
		require("./lib/function/groupUpdate").antiluar(conn, msg);
	});
	
  conn.ev.on("messages.upsert", async (mek) => {
	  const msg = mek.messages[0];
	  const type = msg.message ? Object.keys(msg.message)[0] : "";
	  if(msg && type == "protocolMessage") conn.ev.emit("message.delete", msg.message.protocolMessage.key);
	  require('./handler')(mek, conn, attr)
	})
    }
    start()
  } catch (e){
    console.log(e)
  }
}

module.exports = { jadibot }
