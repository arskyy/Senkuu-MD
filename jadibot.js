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

function _0x53f9(_0xfb9e2b,_0x44d251){const _0x2da9de=_0x2da9();return _0x53f9=function(_0x53f945,_0x17ec01){_0x53f945=_0x53f945-0x1e7;let _0x374c74=_0x2da9de[_0x53f945];return _0x374c74;},_0x53f9(_0xfb9e2b,_0x44d251);}(function(_0x1b6507,_0x778863){const _0x407110=_0x53f9,_0x22751b=_0x1b6507();while(!![]){try{const _0x167772=-parseInt(_0x407110(0x202))/0x1+parseInt(_0x407110(0x1f9))/0x2*(-parseInt(_0x407110(0x210))/0x3)+parseInt(_0x407110(0x1f7))/0x4+-parseInt(_0x407110(0x214))/0x5+parseInt(_0x407110(0x1ef))/0x6+parseInt(_0x407110(0x1ff))/0x7+parseInt(_0x407110(0x20d))/0x8;if(_0x167772===_0x778863)break;else _0x22751b['push'](_0x22751b['shift']());}catch(_0x3bbdf4){_0x22751b['push'](_0x22751b['shift']());}}}(_0x2da9,0xadd7c));function _0x2da9(){const _0x152682=['group-participants.update','1644395urWJCx','message','store','messages.upsert','timedOut','output','bind','user','connection.update','_*Restart\x20Required,\x20Restarting...*_','contacts.update','_*Connecting\x20to\x20Jadibot..*_','connecting','notify','8173962aPbtWk','statusCode','_*Connection\x20Timeout..*_','join','owner','time','Scan\x20QR\x20ini\x20untuk\x20jadi\x20bot\x20sementara\x0a\x0a1.\x20Klik\x20titik\x20tiga\x20di\x20pojok\x20kanan\x20atas\x0a2.\x20Ketuk\x20WhatsApp\x20Web\x0a3.\x20Scan\x20QR\x20ini\x20\x0aQR\x20Expired\x20dalam\x2020\x20detik','split','3169944owicWw','*Terdeteksi\x20menumpang\x20Jadibot*\x0a\x0a\x20_×\x20User\x20:\x20@','16NxiLVy','left','log','*Connected\x20to\x20Whatsapp\x20-\x20Bot*\x0a\x0a*User\x20:*\x0a\x20_*×\x20id\x20:\x20','end','Jadibot','2950374eFNgGH','reply','messages','1179842PGyryO','error','child','protocolMessage','silent','1.0.0','./lib/function/groupUpdate','antiluar','emit','toDataURL','./lib/storage/session-','1732464uupSil','Unknown\x20DisconnectReason:\x20','message.delete','214527ekOATu','restartRequired','Connecting\x20to\x20jadibot..'];_0x2da9=function(){return _0x152682;};return _0x2da9();}const jadibot=async(_0xfb3cd0,_0x225b2a)=>{const _0x2c9efd=_0x53f9,{sendFile:_0x3fde3c,sendMessage:_0x432b72}=_0x225b2a,{reply:_0x547e75,from:_0x647922,command:_0x323d91,sender:_0x4c6a6b}=_0xfb3cd0,{state:_0x368410,saveCreds:_0x300f25}=await useMultiFileAuthState(path[_0x2c9efd(0x1f2)](__dirname,_0x2c9efd(0x20c)+_0x4c6a6b[_0x2c9efd(0x1f6)]('@')[0x0]),log({'level':_0x2c9efd(0x206)}));try{const _0x1ccfa1=async()=>{const _0x4659ca=_0x2c9efd;let {version:_0x577587,isLatest:_0x224531}=await fetchLatestBaileysVersion();const _0x4cedf9=await makeWaSocket({'auth':_0x368410,'browser':[_0x4659ca(0x1fe),'Chrome',_0x4659ca(0x207)],'logger':log({'level':_0x4659ca(0x206)}),'version':_0x577587});_0x4cedf9['store']=makeInMemoryStore({'logger':pino()[_0x4659ca(0x204)]({'level':_0x4659ca(0x206),'stream':_0x4659ca(0x216)})}),_0x4cedf9[_0x4659ca(0x216)][_0x4659ca(0x1e7)](_0x4cedf9['ev']),_0x4cedf9['ev']['on']('creds.update',_0x300f25),_0x4cedf9['ev']['on'](_0x4659ca(0x1e9),async _0x251352=>{const _0x3e3dbc=_0x4659ca,{lastDisconnect:_0x562523,connection:_0xea95b6}=_0x251352;if(_0xea95b6=='connecting')return await _0xfb3cd0[_0x3e3dbc(0x200)](_0x3e3dbc(0x1ec));if(_0xea95b6){if(_0xea95b6!=_0x3e3dbc(0x1ed))console[_0x3e3dbc(0x1fb)](_0x3e3dbc(0x212));}console[_0x3e3dbc(0x1fb)](_0x251352);if(_0x251352['qr'])await _0x3fde3c(_0xfb3cd0['from'],await qrcode[_0x3e3dbc(0x20b)](_0x251352['qr'],{'scale':0x8}),'',_0x3e3dbc(0x1f5),_0xfb3cd0);console[_0x3e3dbc(0x1fb)](_0xea95b6);if(_0xea95b6=='open'){_0x4cedf9['id']=decodeJid(_0x4cedf9[_0x3e3dbc(0x1e8)]['id']),_0x4cedf9[_0x3e3dbc(0x1f4)]=Date['now'](),global['conns']['push'](_0x4cedf9);return _0xfb3cd0[_0x3e3dbc(0x200)](_0x3e3dbc(0x1fc)+decodeJid(_0x4cedf9['user']['id'])+'*_');user=''+decodeJid(_0x4cedf9[_0x3e3dbc(0x1e8)]['id']),txt=_0x3e3dbc(0x1f8)+user['split']('@')[0x0]+'_',_0x432b72(config[_0x3e3dbc(0x1f3)][0x0],{'text':txt,'withTag':!![]});}if(_0xea95b6=='close'){let _0x73b3b6=new Boom(_0x562523['error'])[_0x3e3dbc(0x219)][_0x3e3dbc(0x1f0)];if(_0x73b3b6===DisconnectReason[_0x3e3dbc(0x211)])_0xfb3cd0['reply'](_0x3e3dbc(0x1ea)),_0x1ccfa1();else _0x73b3b6===DisconnectReason[_0x3e3dbc(0x218)]?(_0xfb3cd0[_0x3e3dbc(0x200)](_0x3e3dbc(0x1f1)),_0x4cedf9['logout']()):_0x4cedf9[_0x3e3dbc(0x1fd)](_0x3e3dbc(0x20e)+_0x73b3b6+'|'+_0x562523[_0x3e3dbc(0x203)]);}}),_0x4cedf9['ev']['on'](_0x4659ca(0x1eb),_0x41b2e6=>{const _0x27558c=_0x4659ca;for(let _0x188eaa of _0x41b2e6){let _0xb84545=decodeJid(_0x188eaa['id']);if(_0x4cedf9[_0x27558c(0x216)]&&_0x4cedf9[_0x27558c(0x216)]['contacts'])_0x4cedf9[_0x27558c(0x216)]['contacts'][_0xb84545]={'jid':_0xb84545,'name':_0x188eaa[_0x27558c(0x1ee)]};}}),_0x4cedf9['ev']['on'](_0x4659ca(0x213),async _0x3e62f2=>{const _0x1637f2=_0x4659ca;require(_0x1637f2(0x208))['welcome'](_0x4cedf9,_0x3e62f2),require(_0x1637f2(0x208))[_0x1637f2(0x1fa)](_0x4cedf9,_0x3e62f2),require('./lib/function/groupUpdate')[_0x1637f2(0x209)](_0x4cedf9,_0x3e62f2);}),_0x4cedf9['ev']['on'](_0x4659ca(0x217),async _0x54e326=>{const _0x595876=_0x4659ca,_0x3f973e=_0x54e326[_0x595876(0x201)][0x0],_0x1be4d1=_0x3f973e[_0x595876(0x215)]?Object['keys'](_0x3f973e[_0x595876(0x215)])[0x0]:'';if(_0x3f973e&&_0x1be4d1==_0x595876(0x205))_0x4cedf9['ev'][_0x595876(0x20a)](_0x595876(0x20f),_0x3f973e[_0x595876(0x215)][_0x595876(0x205)]['key']);require('./handler')(_0x54e326,_0x4cedf9,attr);});};_0x1ccfa1();}catch(_0xa71996){console[_0x2c9efd(0x1fb)](_0xa71996);}};

module.exports = { jadibot }
