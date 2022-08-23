require("./global");
const fs = require("fs");
const Baileys = require("@adiwajshing/baileys");
const {   getBinaryNodeChild,  areJidsSameUser,  generateWAMessage,  proto } = require("@adiwajshing/baileys");
const { logger } = Baileys.DEFAULT_CONNECTION_CONFIG;

const { serialize } = require("./lib/serialize");
const { color, getAdmin, isUrl } = require("./lib/function");

const prefix = ".";
const multi_pref = new RegExp("^[" + "!#%&?/;:,.~-+=".replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") + "]");
const owner = config.owner

module.exports = handler = async (mek, conn, map) => {
  try {
    if(mek.type !== "notify") return;
    let msg = await serialize(JSON.parse(JSON.stringify(mek.messages[0])), conn);
    const customLanguage = "en"
    if(!msg.message) return;
    if(Object.keys(msg.message)[0] == "senderKeyDistributionMessage") delete msg.message.senderKeyDistributionMessage;
    if(Object.keys(msg.message)[0] == "messageContextInfo") delete msg.message.messageContextInfo;
		if(msg.key && msg.key.remoteJid === "status@broadcast") return;
		if(msg.type === "protocolMessage" || msg.type === "senderKeyDistributionMessage" || !msg.type ||msg.type === "")
			return;
			
		global.dashboard = JSON.parse(fs.readFileSync("./lib/database/dashboard.json"));
		let { body, type, isGroup, sender, from } = msg;
    let groupMetadata = isGroup ? await conn.groupMetadata(from) : "";
		let groupName = isGroup ? groupMetadata.subject : "";
		let isAdmin = isGroup ? (await getAdmin(conn, msg)).includes(sender) : false;
		let isPrivate = msg.from.endsWith("@s.whatsapp.net");
		let botAdmin = isGroup ? (await getAdmin(conn, msg)).includes(conn.decodeJid(conn.user.id)) : false;
		let isOwner = owner.includes(sender);
    let temp_pref = multi_pref.test(body) ? body.split("").shift() : ".";
		if(body) {
			body = body.startsWith(temp_pref) ? body : "";
		} else {
			body = "";
		}
		
		let arg = body.substring(body.indexOf(" ") + 1);
		let args = body.trim().split(/ +/).slice(1);
		let comand = body.trim().split(/ +/)[0];
		let q = body.trim().split(/ +/).slice(1).join(" ");
		let isCmd = body.startsWith(temp_pref);
		
		let isVideo = type === "videoMessage";
		let isImage = type === "imageMessage";
		let isLocation = type === "locationMessage";
		let contentQ = msg.quoted ? JSON.stringify(msg.quoted) : [];
		let isQAudio = type === "extendedTextMessage" && contentQ.includes("audioMessage");
		let isQVideo = type === "extendedTextMessage" && contentQ.includes("videoMessage");
		let isQImage = type === "extendedTextMessage" && contentQ.includes("imageMessage");
		let isQDocument = type === "extendedTextMessage" && contentQ.includes("documentMessage");
		let isQSticker = type === "extendedTextMessage" && contentQ.includes("stickerMessage");
		let isQLocation = type === "extendedTextMessage" && contentQ.includes("locationMessage");
    
    const Media = (media = {}) => {
			list = [];
			if(media.isQAudio) {
				list.push("audioMessage");
			}
			if(media.isQVideo) {
				list.push("videoMessage");
			}
			if(media.isQImage) {
				list.push("imageMessage");
			}
			if(media.isQDocument) {
				list.push("documentMessage");
			}
			if(media.isQSticker) {
				list.push("stickerMessage");
			}
			return list;
		};
		
		const image = JSON.parse(fs.readFileSync('./lib/storage/randomimage.json'))
    randIndex = Math.floor(Math.random() * image.length);
		img = image[randIndex];
			
	// [ sendMessage ]
	conn.sendMessage = async (jid, content, options = { isTranslate: true }) => {
			const typeMes = content.image || content.text || content.video || content.document ? "composing" : "recording";
			const cotent = content.caption || content.text || "";
			if (options.isTranslate) {
				const footer = content.footer || false;
				const customLang = "en"
				const language = "en"
				if (customLang) {
					if (footer) footer = await rzky.tools.translate(footer, language);
					translate = await rzky.tools.translate(cotent, language);
					if (content.video || content.image) {
						content.caption = translate || cotent;
					} else {
						content.text = translate || cotent;
					}
				}
			}
			content.withTag
				? (content.mentions = [...cotent.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net"))
				: "";
			options.adReply
				? (content.contextInfo = {
						externalAdReply: {
							title: "© Senkuu饺",
							mediaType: 1,
							//renderLargerThumbnail: true,
							showAdAttribution: true,
							body: config.namebot,
							thumbnail: await conn.getBuffer("https://telegra.ph/file/915b6ff0ddf1f7d145880.jpg"),
							sourceUrl: "https://chat.whatsapp.com/EdGuZCNrWGp2OFbXv5Rm8Y",
						},
				  })
				: "";
			if (
				typeof content === "object" &&
				"disappearingMessagesInChat" in content &&
				typeof content["disappearingMessagesInChat"] !== "undefined" &&
				Baileys.isJidGroup(jid)
			) {
				const { disappearingMessagesInChat } = content;
				const value =
					typeof disappearingMessagesInChat === "boolean"
						? disappearingMessagesInChat
							? Baileys.WA_DEFAULT_EPHEMERAL
							: 0
						: disappearingMessagesInChat;
				await conn.groupToggleEphemeral(jid, value);
			} else {
				const isDeleteMsg = "delete" in content && !!content.delete;
				const additionalAttributes = {};
				// required for delete
				if (isDeleteMsg) {
					additionalAttributes.edit = "7";
				}
				const contentMsg = await Baileys.generateWAMessageContent(content, {
					logger,
					userJid: conn.user.id,
					upload: conn.waUploadToServer,
					...options,
				});
				options.userJid = conn.user.id;
				const fromContent = await Baileys.generateWAMessageFromContent(jid, contentMsg, options);
				fromContent.key.id = "SENKUU" + require("crypto").randomBytes(13).toString("hex").toUpperCase();
				await conn.relayMessage(jid, fromContent.message, {
					messageId: fromContent.key.id,
					additionalAttributes,
					userJid: conn.user.id,
				});
				process.nextTick(() => {
					conn.ev.emit("messages.upsert", {
						messages: [fromContent],
						type: "append",
					});
				});
				await conn.sendPresenceUpdate("paused", jid);
				return fromContent;
			}
		};
	
		
	// [ Self Public]
	if (map.isSelf) {
			if (!msg.isSelf && !isOwner) return;
		}
		
	// [ Auto Read ]
	await conn.readMessages([msg.key]);
	
	// [ Blacklist ]
	if(isGroup){
		  await require("./lib/function/blacklist")(msg, conn);
		}
       // [ Anonymous ]
       require("./lib/function/anonymous")(msg,conn);


  // [ Afk ]
  if(isGroup){
      await require("./lib/function/afk")(msg,conn);
    }
	
	// [ Log ]
	global.printLog(isCmd, sender, msg, body, groupName, isGroup);
	
	cmdNya = msg.body.split(/ +/)[0].slice(1);
	msg.command = cmdNya
	const cmdName = body.slice(temp_pref.length).trim().split(/ +/).shift().toLowerCase();
	const cmd = map.command.get(msg.body.trim().split(/ +/).shift().toLowerCase()) || [...map.command.values()].find((x) => x.alias.find((x) => x.toLowerCase() == msg.body.trim().split(/ +/).shift().toLowerCase()) ) || map.command.get(cmdName) || [...map.command.values()].find((x) => x.alias.find((x) => x.toLowerCase() == cmdName));
	
	
		// [ Auto Blocked +212 ]
		if (!isGroup && require("awesome-phonenumber")("+" + msg.sender.split("@")[0]).getCountryCode() == "212") {
			await conn.sendMessage(msg.from, { text: "Sorry i block you, Please read my whatsapp bio" });
			await require("delay")(3000);
			await conn.updateBlockStatus(msg.sender, "block");
			await conn.sendMessage(config.owner[0], {
				text: "*• Blocked Detected Number +212*\n\nwa.me/" + msg.sender.split("@")[0],
			});
		}
		if (require("awesome-phonenumber")("+" + msg.sender.split("@")[0]).getCountryCode() == "212") return;
		
	// [ Response ]
	global.respon = {
	  wait: "Tunggu sebentar, Permintaan anda sedang diproses..",
	  success: "Done ✓",
	  error:{
	    cmd: "Maaf command error, Silahkan hubungi Owner!!",
	    lv: ["Link tidak valid!!","Link nya mana?"],
	    api: "Maaf sistem sedang sibuk!!"
	  },
	  group: "Command ini dapat digunakan di dalam group!",
	  private: "Command ini dapat digunakan di Private Chat / PC Bot..",
	  admin: "Command ini hanya untuk Admin!!",
	  bAdmin: "Command ini dapat digunakan setelah BOT menjadi Admin!!",
	  owner: "Command ini hanya untuk Owner!!"
	}
	
	// [ Global Error ]
	global.error = (command, e, msg) => {
	  error = "*Command Error*\n"
	  error += "  × Fitur : " + command + "\n\n"
	  error += "*Error Log*\n"
	  error += String(e)
	  if(String(e).includes("Cannot read property 'data' of undefined")) return msg.reply('no media found, please resend the media')
	  else msg.reply(respon.error.cmd + "\n\nLog error:\n " + String(e))
		conn.sendMessage(config.owner[0], {text: error});
	};
	
	// [ Options Command ]
	if(!cmd) return;
	const options = cmd.options;
	if(options.noPrefix) {
	  if(isCmd) return;
	  q = msg.body.split(" ").splice(1).join(" ");
	} else if(!options.noPrefix) {
	  if(!isCmd) return;
	}
	
	if (cmd && cmd.category != "private") {
			let comand = dashboard.find((command) => command.name == cmd.name);
			if (comand) {
				comand.success += 1;
				comand.lastUpdate = Date.now();
				fs.writeFileSync("./lib/database/dashboard.json", JSON.stringify(dashboard));
			} else {
				await db.modified("dashboard", { name: cmd.name, success: 1, failed: 0, lastUpdate: Date.now() });
			}
		}
	
	if(options.isAdmin && !isAdmin) {
	  await msg.reply(respon.admin);
	  return true
	}
	
	if(options.isQuoted && !msg.quoted) {
			await msg.reply(`Please reply message`);
			return true;
	}
	
	if(options.isMedia) {
			let medianya = Media(options.isMedia ? options.isMedia : {});
			if(typeof medianya[0] != "undefined" && !medianya.includes(msg.quoted ? msg.quoted.mtype : []))
				return msg.reply(`Please reply *${medianya.map((a) => `${((aa = a.charAt(0).toUpperCase()), aa + a.slice(1).replace(/message/gi, ""))}`).join("/")}*`);
		}
		
	if(options.isOwner && !isOwner) {
		await msg.reply(respon.owner)
		return true;
	}
		
	if(options.isGroup && !isGroup) {
		 await msg.reply(respon.group)
		 return true
	}
		
	if(options.isBotAdmin && !botAdmin) {
		 await msg.reply(respon.bAdmin)
		 return true;
		}
		
	if(options.query && !q) {
		await msg.reply(typeof options.query == "boolean" && options.query ? `Masukan query` : options.query);
		return true;
		}
		
	if(options.isPrivate && !isPrivate) {
		await msg.reply(respon.private)
		return true;
	}
		
	if(options.isUrl && !isUrl(q ? q : "p")) {
		await msg.reply(respon.error.lv[1])
		return true;
	}
		
	if(options.wait) {
		 await msg.reply(typeof options.wait == "string" ? options.wait : respon.wait)
	}
	
	try {
	  await cmd.run({msg,conn},{ q, map, args, arg, Baileys, prefix: temp_pref, respon, command: comand, cmdNya})
	} catch (e) {
	  let fail = dashboard.find((command) => command.name == cmd.name);
		fail.failed += 1;
		fail.success -= 1;
		fail.lastUpdate = Date.now();
		fs.writeFileSync("./lib/database/dashboard.json", JSON.stringify(dashboard));
			await msg.reply(require("util").format(e));
	}
  } catch (e){
    console.log(color("Error", "red"), e.stack);
  }
}
