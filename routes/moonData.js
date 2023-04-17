const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const router = express.Router();

const url = 'https://www.timeanddate.com/moon/sri-lanka/galle';
const url1 = 'https://www.timeanddate.com/moon/phases/sri-lanka/galle';

router.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(url);
        const $ = cheerio.load(response.data); 

        
        let moonTitle = $('#qlook > div').text();

        let extraMoonData = [];
        $('body > div.main-content-div > main > article > section.bk-focus > div.bk-focus__info > table > tbody > tr').each( (item, el) => {
            let title = $(el).find('th').text().replace(":", "");
            let data = $(el).find('td').text();

            extraMoonData.push({
                title,
                data
            });
        })

        await res.status(200).json({
            moonTitle,
            extraMoonData
        });

    } catch (error) {
        console.log(error);
    }

})

router.get('/moonphases', async (req, res) => {

    try {
        
        const response = await axios.get(url1);
        const $ = cheerio.load(response.data); 

        
        let moonTitle = $('#qlook > div').text();

        let extraMoonData = [];
        $('body > div.main-content-div > main > article > section.bk-focus > div.bk-focus__info > table > tbody > tr').each( (item, el) => {
            let title = $(el).find('th').text();
            let data = $(el).find('td').text();

            extraMoonData.push({
                title,
                data
            });
        })

        let title = $('body > div.main-content-div > main > article > section.fixed > div.row.dashb.pdflexi-b > div:nth-child(1) > h2').text().replace(/Galle,/g,'');

        let phases = [];
        $('body > div.main-content-div > main > article > section.fixed > div.row.dashb.pdflexi-b > div:nth-child(1) > div > div.moon-phases-card').each( (item, el) => {
            let title = $(el).find('h3').text();
            let dimage = $(el).find('img').attr('src');
            let image = `https:${dimage}`;
            let date = $(el).find('div[class="moon-phases-card__date"]').text();
            let time = $(el).find('div[class="moon-phases-card__time"]').text();

            phases.push({
                title,
                image,
                date,
                time,
            });
        })

        let moonEvents = [];
        $('body > div.main-content-div > main > article > section.fixed > div:nth-child(3) > div:nth-child(2) > ul > li').each( (item, el) => {
            let data = $(el).text();

            moonEvents.push({
                data
            });
        })

        await res.status(200).json({
            moonTitle,
            extraMoonData,
            title,
            phases,
            moonEvents
        });

    } catch (error) {
        console.log(error);
    }

})

module.exports = router;