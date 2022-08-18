/*       
*
*     NO ENC MINIMAL HARGAI CREATOR
*     THANKS TO : Senkuu, Fajar Ihsana, Zeera ID
*     COPAS YA COPAS TPI JANGAN HAPUS WM TOD!!
*     SC NYA JANGAN DIJUAL BOS, SUSAH-SUSAH BIKIN MALAH DI JUAL
*
*/

// THANKS FOR RZKYFDLAH

require('./global')
const attribute = {};
      attribute.prefix = ".";
      attribute.uptime = new Date();
      attribute.command = new Map();
      attribute.isSelf = config.self
    
   
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
			attribute.command.set(cmd.name, cmdObject);
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

(function(_0x76405c,_0x543d52){const _0x5d6d1a=_0x5069,_0x13d968=_0x76405c();while(!![]){try{const _0x4ddc2c=parseInt(_0x5d6d1a(0x12f))/0x1*(parseInt(_0x5d6d1a(0x127))/0x2)+-parseInt(_0x5d6d1a(0x121))/0x3*(parseInt(_0x5d6d1a(0x124))/0x4)+-parseInt(_0x5d6d1a(0x13d))/0x5*(parseInt(_0x5d6d1a(0x13a))/0x6)+-parseInt(_0x5d6d1a(0x128))/0x7*(parseInt(_0x5d6d1a(0x130))/0x8)+-parseInt(_0x5d6d1a(0x147))/0x9*(parseInt(_0x5d6d1a(0x12d))/0xa)+-parseInt(_0x5d6d1a(0x110))/0xb*(parseInt(_0x5d6d1a(0x13c))/0xc)+-parseInt(_0x5d6d1a(0x132))/0xd*(-parseInt(_0x5d6d1a(0x11a))/0xe);if(_0x4ddc2c===_0x543d52)break;else _0x13d968['push'](_0x13d968['shift']());}catch(_0x21c7d1){_0x13d968['push'](_0x13d968['shift']());}}}(_0xe42e,0x871eb));function _0x5069(_0x349c6f,_0x38613d){const _0xe42e37=_0xe42e();return _0x5069=function(_0x5069c1,_0x2232a9){_0x5069c1=_0x5069c1-0x10f;let _0x5d992d=_0xe42e37[_0x5069c1];return _0x5d992d;},_0x5069(_0x349c6f,_0x38613d);}function _0xe42e(){const _0x234ba2=['bind','conns','protocolMessage','contacts.update','contacts','close','_*Connecting\x20to\x20Jadibot..*_','connection.update','left','6301918LtBQjE','log','Scan\x20QR\x20ini\x20untuk\x20jadi\x20bot\x20sementara\x0a\x0a1.\x20Klik\x20titik\x20tiga\x20di\x20pojok\x20kanan\x20atas\x0a2.\x20Ketuk\x20WhatsApp\x20Web\x0a3.\x20Scan\x20QR\x20ini\x20\x0aQR\x20Expired\x20dalam\x2020\x20detik','silent','Chrome','creds.update','logout','1185jmVWDC','user','split','1136lVsFEd','notify','push','2qXTiTK','2704632JWpwMI','./lib/function/groupUpdate','store','message','toDataURL','4740870OutZIr','key','126653bIePyQ','8JsRwKM','reply','52PKUXOh','open','Jadibot','error','join','keys','antiluar','child','3282FwWnvV','end','24SgtwcL','45MTzJZu','Unknown\x20DisconnectReason:\x20','_*Connection\x20Timeout..*_','messages.upsert','Connecting\x20to\x20jadibot..','output','emit','statusCode','*Connected\x20to\x20Whatsapp\x20-\x20Bot*\x0a\x0a*User\x20:*\x0a\x20_*×\x20id\x20:\x20','./lib/storage/session-','9EdzZbd','_*Restart\x20Required,\x20Restarting...*_','timedOut','./handler','2179012gnwQew'];_0xe42e=function(){return _0x234ba2;};return _0xe42e();}const jadibot=async(_0x412a82,_0x35111c)=>{const _0x4fb7c1=_0x5069,{sendFile:_0x2a9a0c}=_0x35111c,{reply:_0x3a60f2,from:_0x1c78c1,command:_0x2b5244,sender:_0xf6fef6}=_0x412a82,{state:_0x19ae0c,saveCreds:_0x5cc47d}=await useMultiFileAuthState(path[_0x4fb7c1(0x136)](__dirname,_0x4fb7c1(0x146)+_0xf6fef6[_0x4fb7c1(0x123)]('@')[0x0]),log({'level':_0x4fb7c1(0x11d)}));try{const _0x2c71ed=async()=>{const _0x161bf9=_0x4fb7c1;let {version:_0x1d1fe2,isLatest:_0x28b5d0}=await fetchLatestBaileysVersion();const _0x35e967=await makeWaSocket({'auth':_0x19ae0c,'browser':[_0x161bf9(0x134),_0x161bf9(0x11e),'1.0.0'],'logger':log({'level':_0x161bf9(0x11d)}),'version':_0x1d1fe2});_0x35e967[_0x161bf9(0x12a)]=makeInMemoryStore({'logger':pino()[_0x161bf9(0x139)]({'level':_0x161bf9(0x11d),'stream':_0x161bf9(0x12a)})}),_0x35e967[_0x161bf9(0x12a)][_0x161bf9(0x111)](_0x35e967['ev']),_0x35e967['ev']['on'](_0x161bf9(0x11f),_0x5cc47d),_0x35e967['ev']['on'](_0x161bf9(0x118),async _0x49adca=>{const _0x23da9b=_0x161bf9,{lastDisconnect:_0x280636,connection:_0x438f96}=_0x49adca;if(_0x438f96=='connecting')return await _0x412a82[_0x23da9b(0x131)](_0x23da9b(0x117));if(_0x438f96){if(_0x438f96!='connecting')console[_0x23da9b(0x11b)](_0x23da9b(0x141));}console[_0x23da9b(0x11b)](_0x49adca);if(_0x49adca['qr'])await _0x2a9a0c(_0x412a82['from'],await qrcode[_0x23da9b(0x12c)](_0x49adca['qr'],{'scale':0x8}),'',_0x23da9b(0x11c),_0x412a82);console['log'](_0x438f96);if(_0x438f96==_0x23da9b(0x133))return global[_0x23da9b(0x112)][_0x23da9b(0x126)](_0x35e967),_0x412a82[_0x23da9b(0x131)](_0x23da9b(0x145)+decodeJid(_0x35e967[_0x23da9b(0x122)]['id'])+'*_');if(_0x438f96==_0x23da9b(0x116)){let _0x55eafa=new Boom(_0x280636[_0x23da9b(0x135)])[_0x23da9b(0x142)][_0x23da9b(0x144)];if(_0x55eafa===DisconnectReason['restartRequired'])_0x412a82[_0x23da9b(0x131)](_0x23da9b(0x148)),_0x2c71ed();else _0x55eafa===DisconnectReason[_0x23da9b(0x149)]?(_0x412a82[_0x23da9b(0x131)](_0x23da9b(0x13f)),_0x35e967[_0x23da9b(0x120)]()):_0x35e967[_0x23da9b(0x13b)](_0x23da9b(0x13e)+_0x55eafa+'|'+_0x280636[_0x23da9b(0x135)]);}}),_0x35e967['ev']['on'](_0x161bf9(0x114),_0x281212=>{const _0x22443e=_0x161bf9;for(let _0x2dd2d5 of _0x281212){let _0x4f7aba=decodeJid(_0x2dd2d5['id']);if(_0x35e967[_0x22443e(0x12a)]&&_0x35e967['store'][_0x22443e(0x115)])_0x35e967[_0x22443e(0x12a)][_0x22443e(0x115)][_0x4f7aba]={'jid':_0x4f7aba,'name':_0x2dd2d5[_0x22443e(0x125)]};}}),_0x35e967['ev']['on']('group-participants.update',async _0x4ffaa4=>{const _0x445d33=_0x161bf9;require(_0x445d33(0x129))['welcome'](_0x35e967,_0x4ffaa4),require(_0x445d33(0x129))[_0x445d33(0x119)](_0x35e967,_0x4ffaa4),require(_0x445d33(0x129))[_0x445d33(0x138)](_0x35e967,_0x4ffaa4);}),_0x35e967['ev']['on'](_0x161bf9(0x140),async _0x5c4d1b=>{const _0x10b001=_0x161bf9,_0x2ef88f=_0x5c4d1b['messages'][0x0],_0x376f81=_0x2ef88f[_0x10b001(0x12b)]?Object[_0x10b001(0x137)](_0x2ef88f[_0x10b001(0x12b)])[0x0]:'';if(_0x2ef88f&&_0x376f81=='protocolMessage')_0x35e967['ev'][_0x10b001(0x143)]('message.delete',_0x2ef88f[_0x10b001(0x12b)][_0x10b001(0x113)][_0x10b001(0x12e)]);require(_0x10b001(0x10f))(_0x5c4d1b,_0x35e967,attribute);});};_0x2c71ed();}catch(_0x17d5d9){console[_0x4fb7c1(0x11b)](_0x17d5d9);}};

module.exports = { jadibot }
