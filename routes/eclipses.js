const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const router = express.Router();

const url = 'https://www.timeanddate.com/eclipse/in/sri-lanka/galle';

router.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(url);
        const $ = cheerio.load(response.data); 

        let eclipseDate = $('#qlook > div.h3').text();

        let datas = [];
        $('body > div.main-content-div > main > article > section.bk-focus > div.bk-focus__info > table > tbody > tr').each( (item, el) => {
            let title = $(el).find('th').text();
            let data = $(el).find('td').text().replace(/, in Galle/g,'');

            datas.push({
                title,
                data
            });
        })

        let countdown = {
            title: '',
            data: [Object]
        };
        $('#ec-how > div.content__sidebar > div.cd-block').each( (item, el) => {
            let title = $(el).find('h3[class="cd-block__title"]').text();

            let times = [];
            $('a > span[class="cd-block__time"]').each( (item, el) => {
                let data = $(el).find('span').text();
                let title = $(el).find('span[class="cd-block__unit"]').text();
                times.push({
                    data,
                    title
                });
            })

            $('a > span.cd-block__time.cd-block__time--sec').each( (item, el) => {
                let data = $(el).find('span[id="el_s1"]').text();
                let title = $(el).find('span[id="el_s1t"]').text();
                times.push({
                    data,
                    title
                });
            })

            countdown.title = title;
            countdown.data = times;
        })

        let latestEvents = [];
        $('#tb_ec-anim > tbody > tr').each( (item, el) => {
            let time = $(el).find('td:nth-child(1)').text();
            let date = $(el).find('td:nth-child(1) > span').text();
            let event = $(el).find('td:nth-child(3) > span:nth-child(1)').text();
            let eventDescription = $(el).find('td:nth-child(3) > span.td-subtxt').text();
            let direction = $(el).find('td:nth-child(4)').text().replace(/.st1 { fill: none; stroke: #666; stroke-width: 0.5; } .st2 { fill: none; stroke: #000000; stroke-width: 2; }/g,'');
            let altitude = $(el).find('td:nth-child(5)').text().replace(/.st1 { fill: none; stroke: #666; stroke-width: 0.5; } .st2 { fill: none; stroke: #000000; stroke-width: 2; }/g,'');

            latestEvents.push({
                time,
                date,
                event,
                eventDescription,
                direction,
                altitude
            });
        })

        let upcommingEvents = [];
        $('#tb_ec-city > tbody > tr').each( (item, el) => {
            let date = $(el).find('a > span[class="ec-local-date"]').text();
            let name = $(el).find('a > span[class="ec-local-type"]').text();
            let locations = $(el).find('td > span[class="ec-globe-where"]').text();
            let dimage = $(el).find('a > img').attr('src');
            let image = `https:${dimage}`

            upcommingEvents.push({
                name,
                date,
                locations,
                image
            });
        })

        await res.status(200).json({
            eclipseDate,
            datas,
            countdown,
            latestEvents,
            upcommingEvents
        });

    } catch (error) {
        console.log(error);
    }

})

module.exports = router;