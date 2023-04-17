const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

const url = 'https://www.timeanddate.com/astronomy/night/sri-lanka/sri-jayawardenapura-kotte';

router.get('/', async (req, res) => {

    try {
        
        const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)
    
        let nightInfo = {
            title: '',
            timeAmount: '',
            time: ''
        };
        $('#qlook').each( (item, el) => {
            let title = $(el).find('div').text();
            let timeAmount = $(el).find('p.h2').text();
            let time = $(el).find('p:nth-child(3)').text();
            
            nightInfo.title = title;
            nightInfo.timeAmount = timeAmount;
            nightInfo.time = time;
        })

        let extraNightData = {
            title: '',
            data: [Object]
        };
        $('body > div.main-content-div > main > article > section.bk-focus > div.bk-focus__info').each( (item, el) => {
            let title = $(el).find('h3').text();
            extraNightData.title = title;

            let datas = [];
            $('div.bk-focus__info > table > tbody > tr').each( (item, el) => {
                let title = $(el).find('th').text();
                let data = $(el).find('td').text();
                datas.push({
                    title,
                    data
                });
            })

            extraNightData.data = datas;
        })

        let planetsData = {
            title: '',
            data: [Object]
        };
        $('body > div.main-content-div > main > article > section.nightsky-container > div > div > div.eight.columns').each( (item, el) => {
            let title = $(el).find('#tonights').text();
            planetsData.title = title;

            let datas = [];
            $('section > article[class="rise_graph-item"]').each( (item, el) => {
                let dimage = $(el).find('div.rise_graph-brief > div.two.columns.rise_graph-icon > img').attr('src');
                let image = `https:${dimage}`;
                let title = $(el).find('div.rise_graph-brief > div.eight.columns > h3').text().replace(/in Sri Jayawardenepura Kotte/g, '');
                let description = $(el).find('div.rise_graph-brief > div.eight.columns > p').text();
                let date = $(el).find('div:nth-child(3) > p').text();
                datas.push({
                    image,
                    title,
                    description,
                    date
                });
            })

            planetsData.data = datas;
        })

        let planetsExtraData = [];
        $('#ns-table > table > tbody > tr').each( (item, el) => {
            let planet = $(el).find('th').text();
            let rise = $(el).find('td:nth-child(2)').text();
            let set = $(el).find('td:nth-child(3)').text();
            let meridian = $(el).find('td:nth-child(4)').text();
            let comment = $(el).find('td:nth-child(5)').text();
            planetsExtraData.push({
                planet,
                rise,
                set,
                meridian,
                comment
            });
        })

        await res.status(200).json({
            nightInfo,
            extraNightData,
            planetsData,
            planetsExtraData
        });

    } catch (error) {
        console.log(error);
    }

});

module.exports = router;