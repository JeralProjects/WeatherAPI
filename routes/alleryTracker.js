const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const router = express.Router();

const url = 'https://weather.com/forecast/allergy/l/2e7e4387ec7c77787780f685cf56e85c902235f12b815f56bccce92741840e89';

router.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(url);
        const $ = cheerio.load(response.data); 

        let forecastDays = [];
        $('div[class="PollenBreakdown--breakdownContainer--2YJEZ"] > div[class="PollenBreakdown--breakdown--2mPJQ"]').each( (item, el) => {
            let pollonName = $(el).find('h3').text();

            
            forecastDays.push({
                pollonName,
            });
        });

        let days = [];
            $('div[class="PollenBreakdown--outlookContainer--yvnLT"] > ul[class="PollenBreakdown--outlookLevels--1boOK"] > li').each( (item, el) => {
                let color = $(el).find('div[class="PollenBreakdown--outlookLevelColor--12oV5"] > svg > circle').attr('fill');
                let status = $(el).text();

                days.push({
                    color,
                    status
            });
        });


        await res.status(200).json({
            forecastDays, days
        });

    } catch (error) {
        console.log(error);
    }

})

module.exports = router;