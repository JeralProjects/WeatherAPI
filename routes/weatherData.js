const express = require('express');
const axios  = require('axios');
const cheerio  = require('cheerio');
const apicache = require('apicache');

const router = express.Router();

let cache = apicache.middleware;

//for Sri Lanka Different Weather 10 Locations
const urls = [
    'https://www.timeanddate.com/weather/sri-lanka/colombo',
    'https://www.timeanddate.com/weather/sri-lanka/galle',
    'https://www.timeanddate.com/weather/sri-lanka/batticaloa',
    'https://www.timeanddate.com/weather/sri-lanka/badulla',
    'https://www.timeanddate.com/weather/sri-lanka/jaffna',
    'https://www.timeanddate.com/weather/sri-lanka/kalmunai',
    'https://www.timeanddate.com/weather/sri-lanka/kurunegala',
    'https://www.timeanddate.com/weather/sri-lanka/trincomalee',
    'https://www.timeanddate.com/weather/sri-lanka/sri-jayawardenapura-kotte',
    'https://www.timeanddate.com/weather/sri-lanka/kandy' 
];

router.get('/mainLocations', cache('5 minutes'), async (req, res) => {

    let dataList = []; 

    try {

        for(let url of urls){
            const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)
    
            let info = [];
            $('div[class="bk-focus__info"] > table > tbody > tr').each( (item, el) => {
                let title = $(el).find('th').text();
                let data = $(el).find('td').text();
                info.push({
                    title,
                    data
                });
            })
    
            let summary = {
                time: '',
                image: '',
                temp: '',
                status: '',
                extraData: [String],
            }
            $('#qlook').each( (item, el) => {
                let dtime = $(el).find('div.h1').text();
                let image = $('#cur-weather').attr('src');
                let rightImage = `https:${image}`;
                let dtemp = $(el).find('div.h2').text();
                let dstatus = $(el).find('p:nth-child(4)').text().replace(/\./g, '');
                let extraDatas = [];
                $('#qlook > p').each( (item, el) => {
                    let extraData = $(el).text();
                    extraDatas.push(extraData);
                })
    
                summary.time = dtime;
                summary.image = rightImage;
                summary.temp = dtemp;
                summary.status = dstatus;
                summary.extraData = extraDatas;
            })

            let nearbyStations = [];
            $('body > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(2)').each( (item, el) => {
                let city1 = $(el).find('div:nth-child(2) > h3[class="mgb0"]').text();
                let temp1 = $(el).find('div:nth-child(2) > div > span').text();
                let status1 = $(el).find('div:nth-child(2) > p').text();
                let image1 = $(el).find('div:nth-child(2) > div > div > img').attr('src');
                let rightImage1 = `https:${image1}`;
                let far1 = $(el).find('div:nth-child(2) > h3[class="mgb0"] > span[class="soft smaller"]').text();
                nearbyStations.push({
                    city1,
                    far1,
                    status1,
                    rightImage1,
                    temp1
                });
            })

            $('body > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(2)').each( (item, el) => {
                let city2 = $(el).find('div:nth-child(3) > h3').text();
                let temp2 = $(el).find('div:nth-child(3) > div > span').text();
                let status2 = $(el).find('div:nth-child(3) > p').text();
                let image2 = $(el).find('div:nth-child(3) > div > div > img').attr('src');
                let rightImage2 = `https:${image2}`;
                let far2 = $(el).find('div:nth-child(3) > h3[class="mgb0"] > span[class="soft smaller"]').text();
                nearbyStations.push({
                    city2,
                    far2,
                    status2,
                    rightImage2,
                    temp2
                });
            })

            $('body > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(2)').each( (item, el) => {
                let city3 = $(el).find('div:nth-child(4) > h3').text();
                let temp3 = $(el).find('div:nth-child(4) > div > span').text();
                let status3 = $(el).find('div:nth-child(4) > p').text();
                let image3 = $(el).find('div:nth-child(4) > div[class="clear fr tc"] > div[class="mtt"] > img').attr('src');
                let rightImage3 = `https:${image3}`;
                let far3 = $(el).find('div:nth-child(4) > h3[class="mgb0"] > span[class="soft smaller"]').text();
                nearbyStations.push({
                    city3,
                    far3,
                    status3,
                    rightImage3,
                    temp3
                });
            })

            let yesterDayWeather = {
                title: '',
                image: '',
                status: ''
            }
            $('body > div.main-content-div > main > article > section.fixed > div.row.pdflexi > div.four.columns > div:nth-child(1)').each( (item, el) => {
                let dtitle = $(el).find('h3').text();
                let dimage = $(el).find('div > img').attr('src');
                let rightImage = `https:${dimage}`;
                let dstatus = $(el).find('p:nth-child(3)').text();

                yesterDayWeather.title = dtitle;
                yesterDayWeather.image = rightImage;
                yesterDayWeather.status = dstatus;
            })


            let upcommingWeather = [];
            
            let first = {
                time: '',
                image: '',
                temp: ''
            }
            let second = {
                time: '',
                image: '',
                temp: ''
            }
            let third = {
                time: '',
                image: '',
                temp: ''
            }
            let fourth = {
                time: '',
                image: '',
                temp: ''
            }
            let fifth = {
                time: '',
                image: '',
                temp: ''
            }
            let sixth = {
                time: '',
                image: '',
                temp: ''
            }
            $('#wt-5hr > tbody').each( (item, el) => {
                let dtime = $(el).find('tr:nth-child(1) > td:nth-child(1)').text();
                let dimage = $(el).find('tr:nth-child(2) > td:nth-child(1) > div > img').attr('src');
                let dtemp = $(el).find('tr.h2.soft > td:nth-child(1)').text();

                first.temp = dtemp;
                first.time = dtime;
                first.image = `https:${dimage}`;
            })
            $('#wt-5hr > tbody').each( (item, el) => {
                let dtime = $(el).find('tr:nth-child(1) > td:nth-child(2)').text();
                let dimage = $(el).find('tr:nth-child(2) > td:nth-child(2) > div > img').attr('src');
                let dtemp = $(el).find('tr.h2.soft > td:nth-child(2)').text();

                second.temp = dtemp;
                second.time = dtime;
                second.image = `https:${dimage}`;
            })
            $('#wt-5hr > tbody').each( (item, el) => {
                let dtime = $(el).find('tr:nth-child(1) > td:nth-child(3)').text();
                let dimage = $(el).find('tr:nth-child(2) > td:nth-child(3) > div > img').attr('src');
                let dtemp = $(el).find('tr.h2.soft > td:nth-child(3)').text();

                third.temp = dtemp;
                third.time = dtime;
                third.image = `https:${dimage}`;
            })
            $('#wt-5hr > tbody').each( (item, el) => {
                let dtime = $(el).find('tr:nth-child(1) > td:nth-child(4)').text();
                let dimage = $(el).find('tr:nth-child(2) > td:nth-child(4) > div > img').attr('src');
                let dtemp = $(el).find('tr.h2.soft > td:nth-child(4)').text();

                fourth.temp = dtemp;
                fourth.time = dtime;
                fourth.image = `https:${dimage}`;
            })
            $('#wt-5hr > tbody').each( (item, el) => {
                let dtime = $(el).find('tr:nth-child(1) > td:nth-child(5)').text();
                let dimage = $(el).find('tr:nth-child(2) > td:nth-child(5) > div > img').attr('src');
                let dtemp = $(el).find('tr.h2.soft > td:nth-child(5)').text();

                fifth.temp = dtemp;
                fifth.time = dtime;
                fifth.image = `https:${dimage}`;
            })
            $('#wt-5hr > tbody').each( (item, el) => {
                let dtime = $(el).find('tr:nth-child(1) > td:nth-child(6)').text();
                let dimage = $(el).find('tr:nth-child(2) > td:nth-child(6) > div > img').attr('src');
                let dtemp = $(el).find('tr.h2.soft > td:nth-child(6)').text();

                sixth.temp = dtemp;
                sixth.time = dtime;
                sixth.image = `https:${dimage}`;
            })

            upcommingWeather.push(first, second, third, fourth, fifth, sixth);

            let weekforecast = [];
            $('#wt-14d > tbody > tr:nth-child(1) > td[class="wa"]').each( (item, el) => {
                let date = $(el).find('div[class="wt-dn"]').text();
                let image = $(el).find('div.mtt > img').attr('src');
                let temp = $(el).find('p').text();
                
                weekforecast.push({
                    date,
                    image,
                    temp
                });
            })

            dataList.push({
                info,
                summary,
                nearbyStations,
                yesterDayWeather,
                upcommingWeather,
                weekforecast
            }); //Add the data to the list.
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

})

//for Sri Lanka Whole Weather
const slurl = 'https://www.timeanddate.com/weather/sri-lanka';

router.get('/sriLanka', cache('5 minutes'), async (req, res) => {

    try {

            const response = await axios.get(slurl); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)
    
            let info = [];
            $('div[class="bk-focus__info"] > table > tbody > tr').each( (item, el) => {
                let title = info.location = $(el).find('th').text().replace(":", "");
                let value = info.location = $(el).find('td').text().replace(":", "");
                info.push({
                    title,
                    value
                });
            })
    
            let summary = {
                title: '',
                image: '',
                temp: '',
                status: '',
                extraData: [String],
            }
            $('#qlook').each( (item, el) => {
                let dtitle = $(el).find('div.h1').text();
                let image = $('#cur-weather').attr('src');
                let rightImage = `https:${image}`;
                let dtemp = $(el).find('div.h2').text();
                let dstatus = $(el).find('p:nth-child(5)').text().replace(".", "");
                let extraDatas = [];
                $('#qlook > p').each( (item, el) => {
                    let extraData = $(el).text();
                    extraDatas.push(extraData);
                })
    
                summary.title = dtitle;
                summary.image = rightImage;
                summary.temp = dtemp;
                summary.status = dstatus;
                summary.extraData = extraDatas;
            })

        await res.status(200).json({
            info,
            summary
        });

    } catch (error) {
        console.log(error);
    }

})

module.exports = router;