const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const router = express.Router();

const url1 = 'https://www.accuweather.com/en/hurricane';

router.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(url1);
        const $ = cheerio.load(response.data); 

        let activeStorms = [];
        $('body > div > div.two-column-page-content > div.page-column-1 > div > div:nth-child(2) > div > a').each( (item, el) => {
            let name = $(el).find('div[class="global-tropical-list__storm__data"] > div[class="global-tropical-list__storm__data__header"] > p[class="storm-name"]').text();
            let status = $(el).find('div[class="global-tropical-list__storm__data"] > p[class="category"]').text();
            let location = $(el).find('div[class="global-tropical-list__storm__data"] > p[class="location"]').text();
            let activeTime = $(el).find('div[class="global-tropical-list__storm__data"] > p[class="started"]').text();
            let updateTime = $(el).find('div[class="global-tropical-list__storm__data"] > p[class="last-updated"]').text();

            activeStorms.push({
                name,
                status,
                location,
                activeTime,
                updateTime
            });
        })

        let pastStorms = [];
        $('body > div > div.two-column-page-content > div.page-column-1 > div > div.recent-past-storms.content-module.full-mobile-width > a').each( (item, el) => {
            let image = $(el).find('div[class="storm-row__left"] > div > img[class="past-storm-list__list__item__icon"]').attr('src');
            let name = $(el).find('div[class="storm-row__left"] > div[class="storm-row__name"]').text().replace(/\s/g,'');
            let category = $(el).find('div[class="storm-row__right"] > div[class="storm-row__status"]').text();
            let date = $(el).find('div[class="storm-row__right"] > div[class="storm-row__date"]').text();
            let location = $(el).find('div[class="storm-row__right"] > div[class="storm-row__basin"]').text();

            pastStorms.push({
                image,
                name,
                category,
                date,
                location,
            });
        })

        await res.status(200).json({
            activeStorms,
            pastStorms
        });

    } catch (error) {
        console.log(error);
    }

})

module.exports = router;