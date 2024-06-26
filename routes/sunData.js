const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const apicache = require('apicache');

const router = express.Router();
const PORT = process.env.PORT || 4000; 
let cache = apicache.middleware;

const url = `http://localhost:${PORT}/timesanddate/sun/sri-lanka/sri-jayawardenapura-kotte`;

router.get('/', cache('1 minutes'), async (req, res) => {

    try {
        
        const response = await axios.get(url);
        const $ = cheerio.load(response.data); 

        let sunData = {
            title: '',
            dayTime: ''
        };
        $('#qlook').each( (item, el) => {
            let dtitle = $(el).find('div').text();
            let ddaytime = $(el).find('p[class="dn-mob"]').text().replace(/06:03 – 18:17/g,'');

            sunData.title = dtitle;
            sunData.dayTime = ddaytime;
        })

        let extraSunData = [];
        $('body > div.main-content-div > main > article > section.bk-focus > div.bk-focus__info > table > tbody > tr').each( (item, el) => {
            let title = $(el).find('th').text().replace(":","");
            let data = $(el).find('td').text();

            extraSunData.push({
                title,
                data
            });
        })

        await res.status(200).json({
            sunData,
            extraSunData
        });

    } catch (error) {
        console.log(error);
    }

})

module.exports = router;