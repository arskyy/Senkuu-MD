module.exports = {
    name: 'nowa',
    alias: ['nowa'],
    query: "<number>",
    category: "tools",
    desc: `Enter your number!\nExample : #nowa 628956190835xx`,
    async run({msg,conn}, {q}){
      const moment = require('moment-timezone');
            var teks = q
            if (!teks.includes('x')) return msg.reply('lah?')
            msg.reply('wait...')
            function countInstances(string, word) {
              return string.split(word).length - 1;
            }
            var nomer0 = teks.split('x')[0]
            var nomer1 = teks.split('x')[countInstances(teks, 'x')] ? teks.split('x')[countInstances(teks, 'x')] : ''
            var random_length = countInstances(teks, 'x')
            var random;
            if (random_length == 1) {
              random = 10
            } else if (random_length == 2) {
              random = 100
            } else if (random_length == 3) {
              random = 1000
            } else if (random_length == 4) {
              random = 10000
            }
          
            var nomerny = `*List Nomer*\n\nPunya Bio/status/info\n\n`
            var no_bio = `\nTanpa Bio/status/info || \nHey there! I am using WhatsApp.\n`
            var no_watsap = `\nTidak Terdaftar\n`
          
            for (let i = 0; i < random; i++) {
              var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
              var dom1 = nu[Math.floor(Math.random() * nu.length)]
              var dom2 = nu[Math.floor(Math.random() * nu.length)]
              var dom3 = nu[Math.floor(Math.random() * nu.length)]
              var dom4 = nu[Math.floor(Math.random() * nu.length)]
          
              var rndm;
              if (random_length == 1) {
                rndm = `${dom1}`
              } else if (random_length == 2) {
                rndm = `${dom1}${dom2}`
              } else if (random_length == 3) {
                rndm = `${dom1}${dom2}${dom3}`
              } else if (random_length == 4) {
                rndm = `${dom1}${dom2}${dom3}${dom4}`
              }
              
              var anu = await conn.onWhatsApp(`${nomer0}${i}${nomer1}@s.whatsapp.net`);
              var anuu = anu.length !== 0 ? anu : false
          
              try {
               try {
                var anu1 = await conn.fetchStatus(anu[0].jid)
               } catch {
                 var anu1 = '401'
               }
                if (anu1 == '401' || anu1.status.length == 0) {
                  no_bio += `wa.me/${anu[0].jid.split("@")[0]}\n`
                  
                } else {
                  nomerny += `@${anu[0].jid.split("@")[0]}\nBio Name : ${anu1.status}\nTahun : ${moment(anu1.setAt).tz('Asia/Jakarta').format('ddd DD MMM YYYY')}\n\n`
                  
                }
              } catch {
                no_watsap += `${nomer0}${i}${nomer1}\n`
                
              }
            }
          msg.reply(`${nomerny}${no_bio}${no_watsap}`,{withTag:true})
    }
}