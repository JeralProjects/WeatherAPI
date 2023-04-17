const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

const url = 'https://www.timeanddate.com/calendar/seasons.html';

router.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(url); 
            const $ = cheerio.load(response.data);
    
        let seasons = [];
        $('body > div.main-content-div > div.layout-grid.layout-grid--sky > section.layout-grid__main > ul > li').each( (item, el) => {
            let status = $(el).find('h3[class="seasons__header"]').text(); 
            let season = $(el).find('div[class="seasons__card"] > div > h4').text().replace(/\n/g, ''); 
            let startTitle = $(el).find('div[class="seasons__card"] > div > div[class="seasons__details"] > div[class="seasons__detail"] > div[class="seasons__label"]').text(); 
            let startDate = $(el).find('div[class="seasons__card"] > div > div[class="seasons__details"] > div[class="seasons__detail"] > div[class="seasons__value"]').text(); 
            let duration = $(el).find('div > div:nth-child(2) > div > div:nth-child(2) > span.seasons__value ').text(); 
            
            seasons.push({
                status,
                season,
                startTitle,
                startDate,
                duration
            });
        })

        await res.status(200).json({
            seasons,
        });

    } catch (error) {
        console.log(error);
    }

});

module.exports = router;