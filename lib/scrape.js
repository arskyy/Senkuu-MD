const axios = require("axios")
const cheerio = require("cheerio")
const encodeUrl = require('encodeurl')
const fetch = require("node-fetch");
const yt = require('yt-search')
const FormData = require('form-data')
const fakeUa = require('fake-useragent')
const request = require('request')
const {JSDOM} = require('jsdom')


const igcookie = 'mid=YjSZVwAEAAE7KZe70xhrVCaenePm; ig_did=3592CDC8-44F7-43C7-AFE7-CF2F22225A76; ig_nrcb=1; ds_user_id=8779859677; shbid="10275\0548779859677\0541681445225:01f70e0fea444c7748a6f3bf0a8b74445a1527c63db05f21db02f0a994a279bb5a8d67e7"; shbts="1649909225\0548779859677\0541681445225:01f701ed438dbbced0ae8fd2b4ca24630e77065d3d19a0fe8e4ede5704d20c345894d1cb"; csrftoken=bI0doVE2cgjgCiE7Qed3z4CKwR8uUpkk; sessionid=8779859677%3Ad42ZFm2lE4dJe2%3A20; rur="EAG\0548779859677\0541681669496:01f7e71e1359e737597957dcaeda9326ab9107b4ff92ee57cc1f714800897f030f3b7366"'

const randomobj = async(arr) => {
	return arr[Math.floor(Math.random() * arr.length)];
}


exports.wallpaper = (title, page = '1') => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=${page}&q=${title}`)
        .then(({ data }) => {
            let $ = cheerio.load(data)
            let hasil = []
            $('div.grid-item').each(function (a, b) {
                hasil.push({
                    title: $(b).find('div.info > a > h3').text(),
                    type: $(b).find('div.info > a:nth-child(2)').text(),
                    source: 'https://www.besthdwallpaper.com/'+$(b).find('div > a:nth-child(3)').attr('href'),
                    image: [$(b).find('picture > img').attr('data-src') || $(b).find('picture > img').attr('src'), $(b).find('picture > source:nth-child(1)').attr('srcset'), $(b).find('picture > source:nth-child(2)').attr('srcset')]
                })
            })
            resolve(hasil)
        })
    })
}

exports.xnxxsearch = (query) => {
  return new Promise((resolve, reject) => {
    const baseurl = 'https://www.xnxx.com'
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
    .then(res => res.text())
    .then(res => {
      let $ = cheerio.load(res, {
        xmlMode: false
      });
      let title = [];
      let url = [];
      let desc = [];
      let results = [];

      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb').each(function(c, d) {
          url.push(baseurl+$(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
        })
      })
      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb-under').each(function(c, d) {
          desc.push($(d).find('p.metadata').text())
          $(d).find('a').each(function(e,f) {
              title.push($(f).attr('title'))
          })
        })
      })
      for (let i = 0; i < title.length; i++) {
        results.push({
          title: title[i],
          info: desc[i],
          link: url[i]
        })
      }
      resolve({
        code: 200,
        status: true,
        result: results
      })
    })
    .catch(err => reject({code: 503, status: false, result: err }))
  })
}

exports.xnxxdl = (URL) => {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'})
    .then(res => res.text())
    .then(res => {
      let $ = cheerio.load(res, {
        xmlMode: false
      });
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
      };
      resolve({
        status: 200,
        result: {
          title,
          URL,
          duration,
          image,
          videoType,
          videoWidth,
          videoHeight,
          info,
          files
        }
      })
    })
    .catch(err => reject({code: 503, status: false, result: err }))
  })
}

exports.randomtt = async(user) => {
  return new Promise(async(resolve, reject) => {
    const getplink = await axios.get(await encodeUrl(`https://urlebird.com/search/?q=${user}`))
    const plink = cheerio.load(getplink.data)('body > div.main').find('div.info.text-truncate > a').attr('href')
    if(!plink) return resolve({status: false, message: 'User not found!'})
    const vidlink = await axios.get(await encodeUrl(plink))
    const $ = cheerio.load(vidlink.data)
    const array = []
    $('#thumbs > div > a').each(function(){
      array.push($(this).attr('href'))
    })
    const {data} = await axios.get(await encodeUrl(await randomobj(array)))
    const $$ = cheerio.load(data)
    const soundl = $$('body').find('div.music > a').attr('href')
    if(soundl) sound = await axios.get(await encodeUrl(soundl))
    else sound = false
    const $$$ = cheerio.load(sound.data)
    
    resolve({
      status: true,
      user: {
        username: $('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > h1').text(),
        fullname: $('body').find('div.col-md-auto.text-center.text-md-left.pl-0 > div > h5').text(),
        bio: $('body > div.main').find('div.col-md-auto.text-center.text-md-left.pl-0 > div > p').text(),
        follower: $('body > div.main').find('div.col-7.col-md-auto.text-truncate').text().split('🦄 ')[1],
        profilepic: $('body > div.main').find('div.col-md-auto.justify-content-center.text-center > img').attr('src')
      },
      video: {
        caption: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div:nth-child(4) > a').text(),
        plays: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div.info > span:nth-child(1)').text(),
        likes: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div.info > span:nth-child(2)').text(),
        comments: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div.info > span:nth-child(3)').text(),
        share: $$('body > div.main > div > div > div:nth-child(1) > div:nth-child(1) > div > div.info > span:nth-child(4)').text(),
        ago: $$('body').find('div.col-auto.text-left.pl-2 > h6').text(),
        url: $$('body').find('div.video_html5 > video').attr('src')
      },
      sound: soundl ? {
        title: $$$('body > div.main').find('h3:nth-child(3)').text(),
        thumbnail: $$$('body').find('div.col-md-offset-4.col-md-2.mt-md-0.text-md-right > img').attr('src'),
        url: $$$('body').find('audio > source').attr('src')
      } : null
    })
  })
}


exports.youtube = (type, link, quality) => {
  return new Promise(async (resolve, reject) => {
        const ytIdRegex =
            /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:|watch\?.*(?:|\&)v=|embed\/|v\/|shorts\/)|youtu\.be\/)([-_0-9A-Za-z]{11}|[-_0-9A-Za-z]{10})/;
        quality ? quality : (quality = 360);
        if (ytIdRegex.test(link)) {
            let url = ytIdRegex.exec(link);
            let mdata = await yt({
                videoId: url[1],
            });
            let config = {
                url: "https://www.youtube.be/" + url,
                q_auto: 0,
                ajax: 1,
            };
            let headerss = {
                "sec-ch-ua":
                    '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                Cookie:
                    'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}',
            };
            axios("https://www.y2mate.com/mates/id276/analyze/ajax", {
                method: "POST",
                data: new URLSearchParams(Object.entries(config)),
                headers: headerss,
            })
                .then(({ data }) => {
                    const $ = cheerio.load(data.result);
                    //#mp4 > table > tbody > tr:nth-child(1) > td:nth-child(2)
                    asize = { mp3: [], mp4: [] };
                    $("#mp4 > table > tbody > tr").each(function () {
                        asize.mp4.push({
                            quality: $(this).find("td:nth-child(1)").text().trim().split(" ")[0],
                            size: $(this).find("td:nth-child(2)").text(),
                        });
                    });
                    let img = $("div.thumbnail.cover > a > img").attr("src");
                    let title = $("div.thumbnail.cover > div > b").text();
                    let size =
                        type == "mp4"
                            ? asize.mp4.find((sz) => sz.quality == quality + "p").size
                            : $("#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)").text();
                    let id = /var k__id = "(.*?)"/.exec(data.result)[1] || url[1];
                    let configs = {
                        type: "youtube",
                        _id: id,
                        v_id: url[1],
                        ajax: "1",
                        token: "",
                        ftype: "mp4",
                        fquality: quality ? quality : 480,
                    };
                    axios("https://www.y2mate.com/mates/id276/convert", {
                        method: "POST",
                        data: new URLSearchParams(Object.entries(configs)),
                        headers: headerss,
                    }).then(({ data }) => {
                        const $ = cheerio.load(data.result);
                        let link = $("div > a").attr("href");

                        let configss = {
                            type: "youtube",
                            _id: id,
                            v_id: url[1],
                            ajax: "1",
                            token: "",
                            ftype: "mp3",
                            fquality: 128,
                        };
                        axios("https://www.y2mate.com/mates/en68/convert", {
                            method: "POST",
                            data: new URLSearchParams(Object.entries(configss)),
                            headers: headerss,
                        }).then(({ data }) => {
                            const $ = cheerio.load(data.result);
                            let audio = $("div > a").attr("href");
                            // const mdata2 = mdata.all[0]
                            // const array = Object.keys(mdata2)
                            // const isi = Object.values(mdata2)
                            // let json = {}
                            // for (let x = 0; x < array.length; x++) {
                            //  json[array[x]] = isi[x]
                            // }
                            resolve({
                                status: true,
                                id: url[1],
                                title: title,
                                size: size,
                                quality: quality,
                                thumb: img,
                                link: type == "mp4" ? link : audio,
                                ...mdata,
                            });
                        });
                    });
                })
                .catch("Invalid url");
        } else resolve("Invalid url");
    });
}

exports.youtube2 = (link) => {
  return new Promise((resolve, reject) => {
		const ytIdRegex = /(?:http(?:s|):\/\/|)(?:(?:www\.|)youtube(?:\-nocookie|)\.com\/(?:|watch\?.*(?:|\&)v=|embed\/|v\/|shorts\/)|youtu\.be\/)([-_0-9A-Za-z]{11}|[-_0-9A-Za-z]{10})/
		if (ytIdRegex.test(link)) {
		let url =  ytIdRegex.exec(link)
		let config = {
			'url': 'https://www.youtube.be/' + url,
			'q_auto': 0,
			'ajax': 1
		}
		let headerss = 	{
			"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
			"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			"Cookie": 'PHPSESSID=6jo2ggb63g5mjvgj45f612ogt7; _ga=GA1.2.405896420.1625200423; _gid=GA1.2.2135261581.1625200423; _PN_SBSCRBR_FALLBACK_DENIED=1625200785624; MarketGidStorage={"0":{},"C702514":{"page":5,"time":1625200846733}}'
		}
	axios('https://www.y2mate.com/mates/en68/analyze/ajax',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: headerss
		})
	.then(({ data }) => {
		const $ = cheerio.load(data.result)
		let img = $('div.thumbnail.cover > a > img').attr('src');
		let title = $('div.thumbnail.cover > div > b').text();
		let size = $('#mp4 > table > tbody > tr:nth-child(3) > td:nth-child(2)').text()
		let size_mp3 = $('#audio > table > tbody > tr:nth-child(1) > td:nth-child(2)').text()
		let id = /var k__id = "(.*?)"/.exec(data.result)[1]
		let configs = {
    type: 'youtube',
    _id: id,
    v_id: url[1],
    ajax: '1',
    token: '',
    ftype: 'mp4',
    fquality: 480
  }
	axios('https://www.y2mate.com/mates/en68/convert',{
		method: 'POST',
		data: new URLSearchParams(Object.entries(configs)),
		headers: headerss 
	})
	.then(({data}) => {
		const $ = cheerio.load(data.result)
		let link = $('div > a').attr('href')
	let configss = {
    type: 'youtube',
    _id: id,
    v_id: url[1],
    ajax: '1',
    token: '',
    ftype: 'mp3',
    fquality: 128
  }
	axios('https://www.y2mate.com/mates/en68/convert',{
		method: 'POST',
		data: new URLSearchParams(Object.entries(configss)),
		headers: headerss 
	})
	.then(({ data }) => {
		const $ = cheerio.load(data.result)
		let audio = $('div > a').attr('href')
		resolve({
			id: url[1],
			title: title,
			size: size,
			quality: '480p',
			thumb: img,
			link: link,
			size_mp3: size_mp3,
			mp3: audio
		})

		})
			})
		})
	.catch(reject)
	}else reject('link invalid')
	})
}

exports.randomgore = async () => {
    return new Promise(async (resolve, reject) => {
        rand = Math.floor(Math.random() * 218) + 1
        randvid = Math.floor(Math.random() * 16) + 1
        if (rand === 1) {
            slink = 'https://seegore.com/gore/'
        } else {
            slink = `https://seegore.com/gore/page/${rand}/`
        }
        axios.get(slink).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const link = []
            const result = []
            const username = []
            const linkp = $(`#post-items > li:nth-child(${randvid}) > article > div.post-thumbnail > a`).attr('href')
            const thumbb = $(`#post-items > li:nth-child(${randvid}) > article > div.post-thumbnail > a > div > img`).attr('src')
            axios
                .get(linkp)
                .then(({
                    data
                }) => {
                    const $$ = cheerio.load(data)
                    const format = {
                        judul: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
                        views: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
                        comment: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text() == '' ? 'Tidak ada komentar' : $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
                        thumb: thumbb,
                        link: $$('video > source').attr('src'),
                    }
                    const result = {
                        creator: 'Fajar Ihsana',
                        data: format,
                    }
                    resolve(result)
                })
                .catch(reject)
        })
    })
}

exports.goredl = async (link) => {
    return new Promise(async (resolve, reject) => {
        axios
            .get(link)
            .then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                const format = {
                    judul: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > header > h1').text(),
                    views: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > span > span.count').text(),
                    comment: $$('div.single-main-container > div > div.bb-col.col-content > div > div > div > div > div.s-post-meta-block.bb-mb-el > div > div > div.col-r.d-table-cell.col-md-6.col-sm-6.text-right-sm > div > a > span.count').text(),
                    link: $$('video > source').attr('src'),
                }
                const result = {
                    creator: 'Fajar Ihsana',
                    data: format,
                }
                resolve(result)
            })
            .catch(reject)
    })
}

exports.searchgore = async (query) => {
    return new Promise(async (resolve, reject) => {
        axios.get('https://seegore.com/?s=' + query).then((dataa) => {
            const $$$ = cheerio.load(dataa)
            pagina = $$$('#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a').text()
            rand = Math.floor(Math.random() * pagina) + 1
            if (rand === 1) {
                slink = 'https://seegore.com/?s=' + query
            } else {
                slink = `https://seegore.com/page/${rand}/?s=${query}`
            }
            axios
                .get(slink)
                .then(({
                    data
                }) => {
                    const $ = cheerio.load(data)
                    const link = []
                    const judul = []
                    const uploader = []
                    const format = []
                    const thumb = []
                    $('#post-items > li > article > div.content > header > h2 > a').each(function(a, b) {
                        link.push($(b).attr('href'))
                    })
                    $('#post-items > li > article > div.content > header > h2 > a').each(function(c, d) {
                        jud = $(d).text()
                        judul.push(jud)
                    })
                    $('#post-items > li > article > div.content > header > div > div.bb-cat-links > a').each(function(e, f) {
                        upl = $(f).text()
                        uploader.push(upl)
                    })
                    $('#post-items > li > article > div.post-thumbnail > a > div > img').each(function(g, h) {
                        thumb.push($(h).attr('src'))
                    })
                    for (let i = 0; i < link.length; i++) {
                        format.push({
                            judul: judul[i],
                            uploader: uploader[i],
                            thumb: thumb[i],
                            link: link[i],
                        })
                    }
                    const result = {
                        creator: 'Fajar Ihsana',
                        data: format,
                    }
                    resolve(result)
                })
                .catch(reject)
        })
    })
}

exports.igstalk = async (user) => {
try {
const {data} = await axios.get('https://i.instagram.com/api/v1/users/web_profile_info/?username=' + user, {
headers: {
"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36",
"x-asbd-id": "198387",
"x-csrftoken": "VXLPx1sgRb8OCHg9c2NKXbfDndz913Yp",
"x-ig-app-id": "936619743392459",
"x-ig-www-claim": "0"
}
})
return(data.status == 'ok' ? {
status: true,
profile: {
low: data.data.user.profile_pic_url,
high: data.data.user.profile_pic_url_hd,
},
data: {
url: data.data.user.external_url,
id: data.data.user.id,
fullname: data.data.user.full_name,
private: data.data.user.is_private,
verified: data.data.user.is_verified,
bio: data.data.user.biography,
follower: data.data.user.edge_followed_by.count,
following: data.data.user.edge_follow.count,
conneted_fb: data.data.user.connected_fb_page,
videotimeline: data.data.user.edge_felix_video_timeline.count,
timeline: data.data.user.edge_owner_to_timeline_media.count,
savedmedia: data.data.user.edge_saved_media.count,
collections: data.data.user.edge_media_collections.count,
}
} : {status: false, message: 'user not found'})
} catch {
return ({
status: false,
message: 'user not found'
})
}
}

exports.igStory = async(username) => {
return new Promise(async(resolve, reject) => {
axios.request({
url: 'https://www.instagramsave.com/instagram-story-downloader.php?input=' + username,
method: 'GET',
headers:{
"cookie": "_ga=GA1.2.1213432645.1654699587; _gid=GA1.2.1718545959.1654699587; __gads=ID=bfad6dcc94ef789b-2296b90171d3006b:T=1654699586:RT=1654699586:S=ALNI_MaAQFaC8PnSOUDbnYO1Niq7Ohrtdw; PHPSESSID=c5mqkgf6egbe3p0e9cpqk0ac0h; __gpi=UID=0000064b9e14be63:T=1654699586:RT=1654748960:S=ALNI_MbPZ2rwMDmJQRAMA6zY3EfONFBq1A; cf_clearance=5bz53TjSm7wFZPDsa.uT826VwqHUzh5JC8gLPfC5iyw-1654753907-0-150;",
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36"
}
})
.then(({ data }) => {
const $ = cheerio.load(data)
const token = $('#token').attr('value')
let config = {
headers: {
'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
"sec-ch-ua": '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
"cookie": "_ga=GA1.2.1213432645.1654699587; _gid=GA1.2.1718545959.1654699587; __gads=ID=bfad6dcc94ef789b-2296b90171d3006b:T=1654699586:RT=1654699586:S=ALNI_MaAQFaC8PnSOUDbnYO1Niq7Ohrtdw; PHPSESSID=c5mqkgf6egbe3p0e9cpqk0ac0h; __gpi=UID=0000064b9e14be63:T=1654699586:RT=1654748960:S=ALNI_MbPZ2rwMDmJQRAMA6zY3EfONFBq1A; cf_clearance=5bz53TjSm7wFZPDsa.uT826VwqHUzh5JC8gLPfC5iyw-1654753907-0-150;",
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36",
},
data: {
'url':'https://www.instagram.com/'+ username,
'action': 'story',
'token': token
}
}
axios.post('https://www.instagramsave.com/system/action.php',qs.stringify(config.data), { headers: config.headers })
.then(({ data }) => {
resolve(data.medias)
})
})
.catch(reject)
})
}

exports.snapinsta = async (link) => {
    return new Promise((resolve, reject) => {
        if (link.includes('stories'))
            return resolve({
                status: 'Bukan Untuk Stories,dikarenakan burik',
            })
        const options = {
            method: 'POST',
            url: `https://snapinsta.app/action.php?lang=id`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'user-agent': fakeUa(),
                cookie: 'PHPSESSID=evev2fhub0f27alm11kqsfovbj; _ga=GA1.2.1883379186.1646143628;',
            },
            formData: {
                url: link,
                action: 'post',
            },
        }

        request(options, async function(error, response, body) {
            if (error) throw new Error(error)
            console.log(body)
            const $ = cheerio.load(body)
            const link = []
            $('section > div > div > div > div.download-items__btn > a').each(function(a, b) {
                link.push($(b).attr('href').startsWith('/dl.php') ? 'https://snapinsta.app' + $(b).attr('href') : $(b).attr('href'))
            })
            resolve({
                creator: 'Fajar Ihsana',
                result: link,
            })
        })
    })
}

exports.instagram = async (url) => {
    try {
        const tokenn = await axios.get("https://downvideo.quora-wiki.com/instagram-video-downloader#url=" + url);
        let a = cheerio.load(tokenn.data);
        let token = a("#token").attr("value");
        const param = {
            url: url,
            token: token,
        };
        const { data } = await axios.request("https://downvideo.quora-wiki.com/system/action.php", {
                method: "post",
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
                },
            }
        );
        return {
            status: 200,
            author: "gtau",
            title: data.title,
            thumbnail: "https:" + data.thumbnail,
            duration: data.duration,
            media: data.medias,
        };
    } catch (e) {
        return e
    }
}

exports.igdl = async (link) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: 'https://downloadgram.org/#downloadhere',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            formData: {
                url: link,
                submit: '',
            },
        }
        request(options, async function(error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            const result = []
            $('#downloadBox > a').each(function(a, b) {
                result.push($(b).attr('href'))
            })
            resolve(result)
        })
    })
}

exports.tikdown = async (url) => {
    if(!/tiktok/.test(url)) return(error.link)
    const gettoken = await axios.get('https://tikdown.org/id')
    const $ = cheerio.load(gettoken.data)
    const token = $('#download-form > input[type=hidden]:nth-child(2)').attr('value')
    const param = {
        url: url,
        _token: token
    }
    const {
        data
    } = await axios.request('https://tikdown.org/getAjax?', {
        method: 'post',
        data: new URLSearchParams(Object.entries(param)),
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'user-agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36',
        }
    })
    getdata = cheerio.load(data.html)
    if (data.status) {
        return ({
            status: true,
            thumbnail: getdata('img').attr('src'),
            video: getdata('div.download-links > div:nth-child(1) > a').attr('href'),
            audio: getdata('div.download-links > div:nth-child(2) > a').attr('href')
        })
    } else return ({
        status: false
    })
}

exports.aiovideodl = async (url) => {
    try {
        const tokenn = await axios.get('https://aiovideodl.ml/', {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'cookie': 'PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;',
            }
        })
        let a = cheerio.load(tokenn.data)
        let token = a('#token').attr('value')
        const param = {
            url: url,
            token: token
        }
        const {
            data
        } = await axios.request('https://aiovideodl.ml/wp-json/aio-dl/video-data/', {
            method: 'post',
            data: new URLSearchParams(Object.entries(param)),
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'cookie': 'PHPSESSID=3893d5f173e91261118a1d8b2dc985c3; _ga=GA1.2.792478743.1635388171;',
            }
        })
        return ({
            status: true,
            creator: '@ihsanafajar',
            ...data
        })
    } catch (e) {
        return ({
            status: false
        })
    }
}

exports.facebook = async (url) => {
    const param = {
        q: url
    }
    const {
        data
    } = await axios.request({
        url: 'https://fbdownloader.online/api/analyze',
        method: 'post',
        data: new URLSearchParams(Object.entries(param)),
        headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
        }
    })
    return data
}

exports.facebook2 = async(url) => {
    return new Promise(async(resolve, reject) => {
        await axios.get('https://downvideo.net/').then(gdata => {
        const a = cheerio.load(gdata.data)
        const token = a('body > div > center > div.col-md-10 > form > div > input[type=hidden]:nth-child(2)').attr('value')
        const options = {
            method: "POST",
            url: `https://downvideo.net/download.php`,
            headers: {
                "content-type": 'application/x-www-form-urlencoded',
                "cookie": gdata["headers"]["set-cookie"],
                "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
            },
            formData: {
                URL: url,
                token: token,
            },
        };
        request(options, async function(error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            const result = {
                status: 200,
                author: "Memek",
                title: $('body').find('div:nth-child(1) > h4').text(),
                sd: $('#sd > a').attr('href'),
                hd: $('body').find('div:nth-child(7) > a').attr('href')
            }
            resolve(result)
        })
    })
})
}

exports.pinterestdl = async (link) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: `https://pinterestvideodownloader.com/id/`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'user-agent': fakeUa(),
                cookie: '_ga=GA1.2.894954552.1635394717;',
            },
            formData: {
                url: link,
            },
        }

        request(options, async function(error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            const link = []
            const judul = []
            const result = []
            $('#content > center > div > div.col-md-4.col-md-offset-4 > table > tbody > tr > td > a').each(function(a, b) {
                deta = $(b).text()
                judul.push(deta)
                link.push($(b).attr('href'))
            })
            for (let i = 0; i < link.length; i++) {
                result.push({
                    dlinfo: judul[i],
                    link: link[i],
                })
            }
            resolve({
                creator: 'Fajar Ihsana',
                result: result,
            })
        })
    })
}

exports.pinterest = async(querry) => {
return new Promise(async(resolve,reject) => {
 axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
headers: {
"cookie" : "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
}
}).then(({ data }) => {
const $ = cheerio.load(data)
const result = [];
const hasil = [];
$('div > a').get().map(b => {
const link = $(b).find('img').attr('src')
result.push(link)
});
result.forEach(v => {
if(v == undefined) return
hasil.push(v.replace(/236/g,'736'))
})
hasil.shift();
resolve(hasil)
})
})
}

exports.stickersearch = async (query) => {
    return new Promise((resolve) => {
        axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const link = []
            $('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
                link.push($(b).attr('href'))
            })
            rand = link[Math.floor(Math.random() * link.length)]
            axios.get(rand).then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                const url = []
                $$('#stickerPack > div > div.row > div > img').each(function(a, b) {
                    url.push($$(b).attr('src').split('&d=')[0])
                })
                resolve({
                    creator: 'Fajar Ihsana',
                    title: $$('#intro > div > div > h1').text(),
                    author: $$('#intro > div > div > h5 > a').text(),
                    author_link: $$('#intro > div > div > h5 > a').attr('href'),
                    sticker: url,
                })
            })
        })
    })
}


exports.dddtik = async (link) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: `https://dddtik.com/down.php`,
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'user-agent': fakeUa(),
                cookie: 'sc_is_visitor_unique=rx12545292.1635383422.F7DED83AD2BA4F9517A804FC1A0ED021.1.1.1.1.1.1.1.1.1; __gads=ID=b947ab19f44e72c9-22cb5054e4cc00ef:T=1635383422:RT=1635383422:S=ALNI_MZWS0q0Op8F6EpwhOL1pMlFTGjCvQ',
            },
            formData: {
                url: link,
            },
        }

        request(options, async function(error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            resolve({
                creator: 'Fajar Ihsana',
                caption: $('div > div.ml-3 > span').text(),
                download: {
                    source: $('div > div:nth-child(4)').find('a').attr('href'),
                    dddtik: $('div > div:nth-child(5)').find('a').attr('href'),
                },
            })
        })
    })
}

exports.jadwaltv = async (channel) => {
    return new Promise((resolve, reject) => {
        const time = Math.floor(new Date() / 1000)
        axios.get('https://www.jadwaltv.net/channel/' + channel).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const acara = []
            const jam = []
            const result = []
            $('div > div > table > tbody > tr').each(function(a, b) {
                if ($(b).find('td:nth-child(1)').text() != 'Jam') {
                    jam.push($(b).find('td:nth-child(1)').text())
                }
                if ($(b).find('td:nth-child(2)').text() != 'Acara') {
                    acara.push($(b).find('td:nth-child(2)').text())
                }
            })
            for (let i = 0; i < acara.length; i++) {
                result.push({
                    acara: acara[i],
                    jam: jam[i],
                })
            }
            format = result.filter((mek) => mek.acara != 'Jadwal TV selengkapnya di JadwalTV.Net')
            console.log(acara)
            resolve({
                creator: 'Fajar Ihsana',
                channel: channel,
                result: format,
            })
        })
    })
}

exports.emoji = async (emoji) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://emojipedia.org/search/?q=${encodeUrl(emoji)}`).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            resolve({
                creator: 'Fajar Ihsana',
                nama: $('body > div.container > div.content > article > h1').text(),
                result: {
                    apple: $('body').find('li:nth-child(1) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    google: $('body').find('li:nth-child(2) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    samsung: $('body').find('li:nth-child(3) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    microsoft: $('body').find('li:nth-child(4) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    whatsapp: $('body').find('li:nth-child(5) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    twitter: $('body').find('li:nth-child(6) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    facebook: $('body').find('li:nth-child(7) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    skype: $('body').find('li:nth-child(8) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    joypixels: $('body').find('li:nth-child(9) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    openemoji: $('body').find('li:nth-child(10) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    emojidex: $('body').find('li:nth-child(11) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    messenger: $('body').find('li:nth-child(12) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    lg: $('body').find('li:nth-child(13) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    htc: $('body').find('li:nth-child(14) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    mozilla: $('body').find('li:nth-child(15) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    softbank: $('body').find('li:nth-child(16) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    docomo: $('body').find('li:nth-child(17) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                },
            })
        })
    })
}

exports.ceritahantu = async () => {
    return new Promise((resolve, reject) => {
        axios.get(`https://cerita-hantu.com/list-cerita-hantu-a-z/`).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const plink = []
            $('div > div > ul:nth-child(7) > li > a').each(function(a, b) {
                plink.push($(b).attr('href'))
            })
            $('div > div > ul:nth-child(9) > li > a').each(function(a, b) {
                if ($(b).attr('href') != undefined) {
                    plink.push($(b).attr('href'))
                }
            })
            $('div > div > ol > li > a').each(function(a, b) {
                if ($(b).attr('href') != undefined) {
                    plink.push($(b).attr('href'))
                }
            })
            axios.get(plink[Math.floor(Math.random() * plink.length)]).then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                const clink = []
                $$('div > div > a').each(function(a, b) {
                    if ($$(b).attr('href').startsWith('https:')) {
                        clink.push($$(b).attr('href'))
                    }
                })
                rand = clink[Math.floor(Math.random() * clink.length)]
                axios.get(rand).then(({
                    data
                }) => {
                    const $$$ = cheerio.load(data)
                    resolve({
                        creator: 'Fajar Ihsana',
                        judul: $$$('div > header > div > h1 > a').text(),
                        author: $$$('div > header > div > div > span.simple-grid-entry-meta-single-author > span > a').text(),
                        author_link: $$$('div > header > div > div > span.simple-grid-entry-meta-single-author > span > a').attr('href'),
                        upload_date: $$$('div > header > div > div > span.simple-grid-entry-meta-single-date').text(),
                        kategori: $$$('div > header > div > div > span.simple-grid-entry-meta-single-cats > a').text(),
                        source: rand,
                        cerita: $$$('div > div > p').text().split('Cerita Hantu')[1].split('Copyright')[0],
                    })
                })
            })
        })
    })
}

exports.Quran = async (surah, ayat) => {
    return new Promise((resolve, reject) => {
        axios
            .get(encodeURI(`https://alquran-apiii.vercel.app/surah/${surah}/${ayat}`))
            .then((response) => resolve(response.data))
            .catch(reject)
    })
}

exports.stickerLine = async (query) => {
    const {
        data
    } = await axios.get(`https://store.line.me/api/search/sticker?query=${query}&offset=0&limit=36&type=ALL&includeFacets=true`)
    return data.items.map(({
        title,
        productUrl,
        id,
        description,
        payloadForProduct: {
            staticUrl,
            animationUrl,
            soundUrl
        },
        authorId,
        authorName
    }) => {
        return {
            id,
            title,
            description,
            url: encodeURI('https://store.line.me' + productUrl),
            sticker: staticUrl,
            stickerAnimated: animationUrl,
            stickerSound: soundUrl,
            authorId,
            authorName,
        }
    })
}

exports.stickerTelegram = async (query, page = '1') => {
    const {
        data
    } = await axios.get(`https://combot.org/telegram/stickers?q=${encodeURI(query)}&page=${page || 1}`)
    const $ = cheerio.load(data)
    let results = []
    $('body > div > main > div.page > div > div.stickers-catalogue > div.tab-content > div > div').each(function() {
        const title = $(this).find('.sticker-pack__title').text()?.trim()
        const icon = $(this).find('.sticker-pack__sticker > div.sticker-pack__sticker-inner > div.sticker-pack__sticker-img').attr('data-src')
        const link = $(this).find('.sticker-pack__header > a.sticker-pack__btn').attr('href')
        let stickers = []
        $(this)
            .find('.sticker-pack__list > div.sticker-pack__sticker')
            .each(function() {
                const sticker = $(this).find('.sticker-pack__sticker-inner > div.sticker-pack__sticker-img').attr('data-src')
                stickers.push(sticker)
            })
        results.push({
            title,
            icon,
            link,
            stickers,
        })
    })
    return results
}

exports.tiktoktrend = async () => {
    return new Promise((resolve, reject) => {
    axios.get("https://brainans.com/").then(async(data) => {
    const $ = cheerio.load(data.data);
    const result = {};
    const plink = [];
    result["status"] = "200";
    result["author"] = "gtw"
    result["result"] = [];
    async function getmetadata(link, views) {
        const data = await axios.get("https://brainans.com" + link);
        const $$ = cheerio.load(data.data);
        result["result"].push({
            username: $$("#card-page").find("div.main__user-desc.align-self-center.ml-2 > a").text(),
            upload_time: $$("#card-page").find("div.main__user-desc.align-self-center.ml-2").text().split($$("#card-page").find("div.main__user-desc.align-self-center.ml-2 > a").text())[1].trim(),
            caption: $$("#card-page").find("div.main__list").text(),
            views: views,
            like: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(1) > span").text(),
            comment: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(2) > span").text(),
            share: $$("#card-page").find("div.content__btns.d-flex > div:nth-child(3) > span").text(),
            video: $$("#card-page").find("video").attr("src"),
        });
    }
    $("#welcome_videos > div > div > a").each(function(a, b) {
        plink.push({link: $(b).attr("href"),views: $(b).find("div.video_view_count.bx.bx-show > span").text(),
        });
    });
    for (let i = 0; i < 10; i++) {
        await getmetadata(plink[i].link, plink[i].views);
    }
    resolve(result)
}).catch(reject)
})
}


exports.webp2png = async (source) => {
    let form = new FormData()
    let isUrl = typeof source === 'string' && /https?:\/\//.test(source)
    form.append('new-image-url', isUrl ? source : '')
    form.append('new-image', isUrl ? '' : source, 'image.webp')
    let res = await fetch('https://s6.ezgif.com/webp-to-png', {
        method: 'POST',
        body: form,
    })
    let html = await res.text()
    let {
        document
    } = new JSDOM(html).window
    let form2 = new FormData()
    let obj = {}
    for (let input of document.querySelectorAll('form input[name]')) {
        obj[input.name] = input.value
        form2.append(input.name, input.value)
    }
    let res2 = await fetch('https://ezgif.com/webp-to-png/' + obj.file, {
        method: 'POST',
        body: form2,
    })
    let html2 = await res2.text()
    let {
        document: document2
    } = new JSDOM(html2).window
    return new URL(document2.querySelector('div#output > p.outfile > img').src, res2.url).toString()
}

exports.fetchPost = async (url) => {
    return new Promise(async (resolve, reject) => {
        urls = url.split('/')
        let {
            data
        } = await axios(url.split(url.includes('stories') ? urls[6] : urls[5])[0] + '?__a=1', {
            method: 'GET',
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
                cookie: 'ig_did=77ADA31F-4AB0-4D19-8875-522C891A60E6; ig_nrcb=1; csrftoken=Zuy4R9169ejQY0R20InUOfeh2fCh7cfW; ds_user_id=8779859677; sessionid=8779859677%3Az2RfuCb1tsxTh1%3A26; shbid="10275\0548779859677\0541665541164:01f7683f87e5d1e3c2db8b41bfad455d2718c549ac0aeba033c00ae0e25647a7d8b87ee1"; shbts="1634005164\0548779859677\0541665541164:01f7df3ebca9d4ae3ecdb5f3b25d845142e5f462409976c5c140ba803c85bdd15fe0d45e"; rur="EAG\0548779859677\0541665541186:01f7c8bdbba6bfaf1f0fc03d5b843fe864bb908dc49069cc77dd546a9c6b50302d83b608"',
            },
        })

        resolve(data)
    })
}

exports.downvideo = async(url) => {
    const gettoken = await axios.get('https://downvideo.quora-wiki.com/')
    const $$ = cheerio.load(gettoken.data)
    const token = $$('#token').attr('value')
    const {data} = await axios.request('https://downvideo.quora-wiki.com/system/action.php', {
        method: 'post',
        data: new URLSearchParams(Object.entries({
            url: url,
            token: token
        })),
        headers: {
            'cookie': 'fpestid=YT6abn7OdTpNYkeS7164xlFIg6RZEhfPvEtZnVWfk0kDip1a8iTAnO51q7VzTGLl89oycQ; __gads=ID=823e2024511cfbf1-221294301ad30014:T=1651936582:RT=1651936582:S=ALNI_Mb2xUbOd3tTkcYykDeYbYsj3ejTKQ; PHPSESSID=446tiepgldu14thd36q7ekpi22',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36'
        }
    })
    return(data)
}

exports.xnxx = (query) => {
  return new Promise((resolve, reject) => {
    const baseurl = 'https://www.xnxx.com'
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
    .then(res => res.text())
    .then(res => {
      let $ = cheerio.load(res, {
        xmlMode: false
      });
      let title = [];
      let url = [];
      let desc = [];
      let results = [];

      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb').each(function(c, d) {
          url.push(baseurl+$(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
        })
      })
      $('div.mozaique').each(function(a, b) {
        $(b).find('div.thumb-under').each(function(c, d) {
          desc.push($(d).find('p.metadata').text())
          $(d).find('a').each(function(e,f) {
              title.push($(f).attr('title'))
          })
        })
      })
      for (let i = 0; i < title.length; i++) {
        results.push({
          title: title[i],
          info: desc[i],
          link: url[i]
        })
      }
      resolve({
        code: 200,
        status: true,
        result: results
      })
    })
    .catch(err => reject({code: 503, status: false, result: err }))
  })
}

exports.xnxxdl = (URL) => {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'})
    .then(res => res.text())
    .then(res => {
      let $ = cheerio.load(res, {
        xmlMode: false
      });
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
      };
      resolve({
        status: 200,
        result: {
          title,
          URL,
          duration,
          image,
          videoType,
          videoWidth,
          videoHeight,
          info,
          files
        }
      })
    })
    .catch(err => reject({code: 503, status: false, result: err }))
  })
}