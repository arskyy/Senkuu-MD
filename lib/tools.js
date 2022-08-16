const axios = require('axios')
const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')
const FormData = require('form-data');
const fs = require('fs')
const cheerio = require('cheerio')
const {
    fromBuffer
} = require('file-type');
const kapitalisasiKata = async (str) => {
    return str.replace(/\w\S*/g, function(kata) {
        const kataBaru = kata.slice(0, 1).toUpperCase() + kata.substr(1);
        return kataBaru
    });
}
class tools {
    static webp2mp4 = async (source) => {
        let form = new FormData
        let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
        form.append('new-image-url', isUrl ? source : '')
        form.append('new-image', isUrl ? '' : source, 'image.webp')
        let res = await fetch('https://ezgif.com/webp-to-mp4', {
          method: 'POST',
          body: form
        })
        let html = await res.text()
        let { document } = new JSDOM(html).window
        let form2 = new FormData
        let obj = {}
        for (let input of document.querySelectorAll('form input[name]')) {
          obj[input.name] = input.value
          form2.append(input.name, input.value)
        }
        let res2 = await fetch('https://ezgif.com/webp-to-mp4/' + obj.file, {
          method: 'POST',
          body: form2
        })
        let html2 = await res2.text()
        let { document: document2 } = new JSDOM(html2).window
        return new URL(document2.querySelector('div#output > p.outfile > video > source').src, res2.url).toString()
      }
    static sleep = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    static resize = async (buffer, ukur1, ukur2) => {
      try{
        const readbuf = await jimp.read(buffer);
        const buff = await readbuf.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
        return(buff)
      }catch(e){
        return(String(e))
      }
    }
    static formatRupiah = async (angka, prefix) => {
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? '' + rupiah : '');
    }
    static parseResult = async(title, json, option) => {
        if(Array.isArray(json)){
            var txt = `⬢ _*${title}*_\n\n${global.shp}\n`
            for(let i=0; i<json.length; i++){
                if(option && option.delete){
                    for(let j of option.delete){
                        delete json[i][j]
                    }
                }
                for(let j of Object.entries(json[i])){
                    if(j[1] != undefined && j[1] != null && j[1] != ''){
                        txt += `${global.shp} *${await kapitalisasiKata(j[0].replace(/_/, ' '))}* : ${j[1]}\n`
                    }
                }
                if(i + 1 != json.length) txt += `\n${global.shp}\n`
            }
            txt += `\n⬢ _*END OF RESULT*_`
        }
        else{
            var txt = `⬢ _*${title}*_\n\n`
            if(option && option.delete){
                for(let j of option.delete){
                    delete json[j]
                }
            }
            for(let i of Object.entries(json)){
                if(i[1] != undefined && i[1] != null && i[1] != ''){
                    txt += `${global.shp} *${await kapitalisasiKata(i[0].replace(/_/, ' '))}* : ${i[1]}\n`
                }
            }
            txt += `\n⬢ _*END OF RESULT*_`
        }
        return txt
    }
    static toTimer = (seconds) => {
        function pad(s) {
            return (s < 10 ? '0' : '') + s
        }
        var hours = Math.floor(seconds / (60 * 60))
        var minutes = Math.floor((seconds % (60 * 60)) / 60)
        var seconds = Math.floor(seconds % 60)

        //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
        return `${pad(hours)} Jam - ${pad(minutes)} Menit - ${pad(seconds)} Detik`
    }
    static kapitalisasiKata = async (str) => {
        return str.replace(/\w\S*/g, function(kata) {
            const kataBaru = kata.slice(0, 1).toUpperCase() + kata.substr(1);
            return kataBaru
        });
    }
    static tiny = async (link) => {
        return new Promise((resolve) => {
            axios.get(`https://tinyurl.com/api-create.php?url=${link}`).then(res => {
                resolve(res.data)
            })
        })
    }
    static getRandom = (ext) => {
        return `${Math.floor(Math.random() * 10000)}${ext ? ext : ''}`
    }
    static telegraph = async (buffer) => {
        const {
            ext
        } = await fromBuffer(buffer)
        let form = new FormData
        form.append('file', buffer, 'tmp.' + ext)
        let res = await fetch('https://telegra.ph/upload', {
            method: 'POST',
            body: form
        })
        let img = await res.json()
        if (img.error) throw img.error
        return 'https://telegra.ph' + img[0].src
    }
    static fileIO = async (buffer) => {
        const {
            ext
        } = await fromBuffer(buffer) || {}
        let form = new FormData
        form.append('file', buffer, 'tmp.' + ext)
        let res = await fetch('https://file.io/?expires=1d', { // 1 Day Expiry Date
            method: 'POST',
            body: form
        })
        let json = await res.json()
        if (!json.success) throw json
        return json.link
    }
    static getBuffer = async (url, options) => {
        try {
            options ? options : {}
            const res = await axios({
                method: "get",
                url,
                headers: {
                    'DNT': 1,
                    'Upgrade-Insecure-Request': 1
                },
                ...options,
                responseType: 'arraybuffer'
            })
            return res.data
        } catch (e) {
            console.log(`Error : ${e}`)
        }
    }
}
module.exports = tools
