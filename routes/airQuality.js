const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');

const router = express.Router();

const url = 'https://weather.com/forecast/air-quality/l/2e7e4387ec7c77787780f685cf56e85c902235f12b815f56bccce92741840e89';

router.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(url);
        const $ = cheerio.load(response.data); 

        let todayAirQuality = {
            ammount: '',
            title: '',
            description: '',
            subtopic: '',
            subDescription: ''
        };
        $('section[class="card Card--card--2AzRg"] > div[class="AirQuality--AirQualityCard--EONAt AirQuality--AirQualityExtendedCard--2jWpd"]').each( (item, el) => {
            let dammount = $(el).find('div[class="AirQuality--AirQualityCard--EONAt AirQuality--AirQualityExtendedCard--2jWpd"] > div[class="AirQuality--leftCol--32BhX AirQuality--center--2mEW_ AirQuality--AirQualityExtendedCard--2jWpd"] > div[class="AirQuality--col--3I-4C"] > svg > text[class="DonutChart--innerValue--3_iFF AirQuality--extendedDialText--1kqIb"]').text();

            let dtitle = $(el).find('div[class="AirQuality--AirQualityCard--EONAt AirQuality--AirQualityExtendedCard--2jWpd"] > div[class="AirQuality--leftCol--32BhX AirQuality--center--2mEW_ AirQuality--AirQualityExtendedCard--2jWpd"] > div[class="AirQuality--col--3I-4C"] > div[class="AirQualityText--AirQuality--2uuF7"] > div > span').text();

            let ddescription = $(el).find('div[class="AirQuality--AirQualityCard--EONAt AirQuality--AirQualityExtendedCard--2jWpd"] > div[class="AirQuality--leftCol--32BhX AirQuality--center--2mEW_ AirQuality--AirQualityExtendedCard--2jWpd"] > div[class="AirQuality--col--3I-4C"] > div[class="AirQualityText--AirQuality--2uuF7"] > div > p').text();

            let dsubtopic = $(el).find('div[class="AirQuality--AirQualityCard--EONAt AirQuality--AirQualityExtendedCard--2jWpd"] > div[class="AirQuality--rightCol--2HhXi"] > h3').text();

            let dsubdescription = $(el).find('div[class="AirQuality--AirQualityCard--EONAt AirQuality--AirQualityExtendedCard--2jWpd"] > div[class="AirQuality--rightCol--2HhXi"] > span').text();

            todayAirQuality.ammount = dammount;
            todayAirQuality.title = dtitle;
            todayAirQuality.description = ddescription;
            todayAirQuality.subtopic = dsubtopic;
            todayAirQuality.subDescription = dsubdescription;
        });

        let airPollutions = [];
        $('#WxuAirQuality-main-7de6dc7e-8c44-46e2-bc70-fc9b603bb596 > div > section:nth-child(2) > div > div[class="AirQuality--dial--3TK5w"]').each( (item, el) => {
            let ammount = $(el).find('div[class="AirQuality--colWrapper--39Blc"] > div[class="AirQuality--col--3I-4C"] > svg > text').text();
            let status = $(el).find('div[class="AirQuality--colWrapper--39Blc"] > div[class="AirQuality--col--3I-4C"] > div[class="AirQualityText--AirQuality--2uuF7"] > div > p').text();
            let quality = $(el).find('div[class="AirQuality--colWrapper--39Blc"] > div[class="AirQuality--col--3I-4C"] > div[class="AirQualityText--AirQuality--2uuF7"] > div > span[class="AirQualityText--measurement--3LY0r AirQuality--pollutantMeasurement--2s1IZ"]').text();
            let title = $(el).find('div[class="AirQuality--colWrapper--39Blc"] > div[class="AirQuality--col--3I-4C"] > div[class="AirQualityText--AirQuality--2uuF7"] > div > span[class="AirQualityText--severity--1smy9 AirQuality--pollutantName--3SjhF"]').text();
            
            airPollutions.push({
                ammount,
                title,
                status,
                quality
            });
        });

        await res.status(200).json({
            todayAirQuality,
            airPollutions
        });

    } catch (error) {
        console.log(error);
    }

})

module.exports = router;