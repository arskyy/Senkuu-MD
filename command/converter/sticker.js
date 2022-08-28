const { sticker } = require("../../lib/convert");
const { modStick, createExif } = require("../../lib/exif2");
const fs = require("fs");

module.exports = {
	name: "sticker",
	alias: ["s","sticker","stiker"],
	category: "converter",
	desc: "Create a sticker from image or video",
	async run({ msg, conn }, { q }) {
		const { quoted, from, type } = msg;

		const content = JSON.stringify(quoted);
		const isMedia = type === "imageMessage" || type === "videoMessage";
		const isQImg = type === "extendedTextMessage" && content.includes("imageMessage");
		const isQVid = type === "extendedTextMessage" && content.includes("videoMessage");
		const isQDoc = type === "extendedTextMessage" && content.includes("documentMessage");
		const isQStic = type === "extendedTextMessage" && content.includes("stickerMessage");
		q = q.split("|");
		const packInfo = {
			packname: q[0] ? q[0] : config.packInfo.packname,
			author: q[1] ? q[1] : config.packInfo.author,
		};

		let buffer, stickerBuff;
		try {
			if ((isMedia && !msg.message.videoMessage) || isQImg) {
				buffer = isQImg ? await quoted.download() : await msg.download();
				stickerBuff = await sticker(buffer, { isImage: true, withPackInfo: true, packInfo, cmdType: "1" });
				await conn.sendMessage(from, { sticker: stickerBuff }, { quoted: msg});
			} else if (
				(isMedia && msg.message.videoMessage.fileLength < 2 << 20) ||
				(isQVid && quoted.message.videoMessage.fileLength < 2 << 20)
			) {
				buffer = isQVid ? await quoted.download() : await msg.download();
				stickerBuff = await sticker(buffer, { isVideo: true, withPackInfo: true, packInfo, cmdType: "1" });
				await conn.sendMessage(from, { sticker: stickerBuff }, { quoted: msg});
			} else if (
				isQDoc &&
				(/image/.test(quoted.message.documentMessage.mimetype) ||
					(/video/.test(quoted.message.documentMessage.mimetype) &&
						quoted.message.documentMessage.fileLength < 2 << 20))
			) {
				let ext = /image/.test(quoted.message.documentMessage.mimetype)
					? { isImage: true }
					: /video/.test(quoted.message.documentMessage.mimetype)
					? { isVideo: true }
					: null;
				if (!ext) return await msg.reply("Document mimetype unknown");
				buffer = await quoted.download();
				stickerBuff = await sticker(buffer, { ...ext, withPackInfo: true, packInfo, cmdType: "1" });
				await conn.sendMessage(from, { sticker: stickerBuff }, { quoted: msg});
			} else {
				await msg.reply(`reply image`);
			}
			(buffer = null), (stickerBuff = null);
		} catch (e) {
			console.log(e);
			await msg.reply("Error while creating sticker\n\n" + e);
		}
	},
};
