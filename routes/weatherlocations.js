const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();



const centralUrls1 = [
    'https://www.accuweather.com/en/lk/abasingammedda/842940/weather-forecast/842940',
    'https://www.accuweather.com/en/lk/adhikarigama/842905/weather-forecast/842905',
    'https://www.accuweather.com/en/lk/agalakumbura/842892/weather-forecast/842892',
    'https://www.accuweather.com/en/lk/agalawatta/842890/weather-forecast/842890',
    'https://www.accuweather.com/en/lk/agappola/842884/weather-forecast/842884',
    'https://www.accuweather.com/en/lk/agrapatana/842877/weather-forecast/842877',
    'https://www.accuweather.com/en/lk/akarahaduwa/842853/weather-forecast/842853',
    'https://www.accuweather.com/en/lk/akarahediya/842852/weather-forecast/842852',
    'https://www.accuweather.com/en/lk/akuramboda/842835/weather-forecast/842835',
    'https://www.accuweather.com/en/lk/akurambodwatta/842834/weather-forecast/842834',
    'https://www.accuweather.com/en/lk/akurana/307310/weather-forecast/307310',
    'https://www.accuweather.com/en/lk/aladeniya/842818/weather-forecast/842818',
    'https://www.accuweather.com/en/lk/alagalla/842814/weather-forecast/842814',
    'https://www.accuweather.com/en/lk/alagalla-kondagama/842812/weather-forecast/842812',
    'https://www.accuweather.com/en/lk/alagalla-pahalagama/842811/weather-forecast/842811',
    'https://www.accuweather.com/en/lk/alagoda/842810/weather-forecast/842810',
    'https://www.accuweather.com/en/lk/alakagama/842800/weather-forecast/842800',
    'https://www.accuweather.com/en/lk/alakola-anga/842797/weather-forecast/842797',
    'https://www.accuweather.com/en/lk/alakola-ela/842794/weather-forecast/842794',
    'https://www.accuweather.com/en/lk/alakoladeniya/842796/weather-forecast/842796',
    'https://www.accuweather.com/en/lk/alakolamada/842791/weather-forecast/842791',
    'https://www.accuweather.com/en/lk/alakolamaditta/842789/weather-forecast/842789',
    'https://www.accuweather.com/en/lk/alakolawewa/842786/weather-forecast/842786',
    'https://www.accuweather.com/en/lk/alakolawewa/842787/weather-forecast/842787',
    'https://www.accuweather.com/en/lk/alawatugoda/307311/weather-forecast/307311', 
    'https://www.accuweather.com/en/lk/ampitiya/307312/weather-forecast/307312',
    'https://www.accuweather.com/en/lk/ankumbura-pallegama/307313/weather-forecast/307313',
    'https://www.accuweather.com/en/lk/bogawantalawa/307314/weather-forecast/307314',
    'https://www.accuweather.com/en/lk/dambulla/307369/weather-forecast/307369',
    'https://www.accuweather.com/en/lk/danture/307315/weather-forecast/307315',
    'https://www.accuweather.com/en/lk/deltota/307316/weather-forecast/307316',
    'https://www.accuweather.com/en/lk/dikoya/307304/weather-forecast/307304',
    'https://www.accuweather.com/en/lk/dolosbage/307317/weather-forecast/307317',
    'https://www.accuweather.com/en/lk/dombawala/307373/weather-forecast/307373',
    'https://www.accuweather.com/en/lk/galagedara/307318/weather-forecast/307318',
    'https://www.accuweather.com/en/lk/galaha/307319/weather-forecast/307319',
    'https://www.accuweather.com/en/lk/galewela/307370/weather-forecast/307370',
    'https://www.accuweather.com/en/lk/gampola/307306/weather-forecast/307306',
    'https://www.accuweather.com/en/lk/geli-oya/307320/weather-forecast/307320',
    'https://www.accuweather.com/en/lk/ginigathena/307321/weather-forecast/307321',
    'https://www.accuweather.com/en/lk/gunnepana-udagammedda/307322/weather-forecast/307322',
];
const centerUrls2= [
    'https://www.accuweather.com/en/lk/handessa/307323/weather-forecast/307323',
    'https://www.accuweather.com/en/lk/hangranoya/307324/weather-forecast/307324',
    'https://www.accuweather.com/en/lk/hanguranketa/307367/weather-forecast/307367',
    'https://www.accuweather.com/en/lk/hassalaka/307325/weather-forecast/307325',
    'https://www.accuweather.com/en/lk/hataraliyadda/307326/weather-forecast/307326',
    'https://www.accuweather.com/en/lk/hatton/307309/weather-forecast/307309',
    'https://www.accuweather.com/en/lk/hembarawa/307374/weather-forecast/307374',
    'https://www.accuweather.com/en/lk/kandapola/307327/weather-forecast/307327',
    'https://www.accuweather.com/en/lk/kandy/307303/weather-forecast/307303',
    'https://www.accuweather.com/en/lk/ketakumbura/307328/weather-forecast/307328',
    'https://www.accuweather.com/en/lk/kibissa/307368/weather-forecast/307368',
    'https://www.accuweather.com/en/lk/kongahawela/307329/weather-forecast/307329',
    'https://www.accuweather.com/en/lk/kotmale/307331/weather-forecast/307331',
    'https://www.accuweather.com/en/lk/kundasale/307332/weather-forecast/307332',
    'https://www.accuweather.com/en/lk/lindula/307333/weather-forecast/307333',
    'https://www.accuweather.com/en/lk/madugoda/307375/weather-forecast/307375',
    'https://www.accuweather.com/en/lk/madulkele/307334/weather-forecast/307334',
    'https://www.accuweather.com/en/lk/mahawela/307335/weather-forecast/307335',
    'https://www.accuweather.com/en/lk/marassana/307366/weather-forecast/307366',
    'https://www.accuweather.com/en/lk/maskeliya/307336/weather-forecast/307336',
    'https://www.accuweather.com/en/lk/matale/307305/weather-forecast/307305',
    'https://www.accuweather.com/en/lk/menikdiwela/307337/weather-forecast/307337',
    'https://www.accuweather.com/en/lk/menikhinna/307338/weather-forecast/307338',
    'https://www.accuweather.com/en/lk/nalanda/307378/weather-forecast/307378',
    'https://www.accuweather.com/en/lk/nanu-oya/307365/weather-forecast/307365',
    'https://www.accuweather.com/en/lk/naula/307371/weather-forecast/307371',
    'https://www.accuweather.com/en/lk/nawalapitiya/307307/weather-forecast/307307',
    'https://www.accuweather.com/en/lk/nildandahinna/307339/weather-forecast/307339',
    'https://www.accuweather.com/en/lk/nuwara-eliya/307308/weather-forecast/307308',
    'https://www.accuweather.com/en/lk/ovilikanda/307340/weather-forecast/307340',
    'https://www.accuweather.com/en/lk/padiyapelella/307341/weather-forecast/307341',
    'https://www.accuweather.com/en/lk/palapatwela/307342/weather-forecast/307342',
    'https://www.accuweather.com/en/lk/pallegama/307372/weather-forecast/307372',
    'https://www.accuweather.com/en/lk/panwila/307343/weather-forecast/307343',
    'https://www.accuweather.com/en/lk/paranagama-mandandawela/307344/weather-forecast/307344',
    'https://www.accuweather.com/en/lk/peradeniya/307363/weather-forecast/307363',
    'https://www.accuweather.com/en/lk/piligama/307345/weather-forecast/307345',
    'https://www.accuweather.com/en/lk/polgolla/307346/weather-forecast/307346',
    'https://www.accuweather.com/en/lk/pundaluoya/307347/weather-forecast/307347',
    'https://www.accuweather.com/en/lk/pussellawa/307362/weather-forecast/307362',
    'https://www.accuweather.com/en/lk/ramboda/307348/weather-forecast/307348',
    'https://www.accuweather.com/en/lk/rattota/307349/weather-forecast/307349',
    'https://www.accuweather.com/en/lk/rikillagaskada/307350/weather-forecast/307350',
    'https://www.accuweather.com/en/lk/sigiriya/307364/weather-forecast/307364',
    'https://www.accuweather.com/en/lk/talatuoya/307351/weather-forecast/307351',
    'https://www.accuweather.com/en/lk/talawakele/307379/weather-forecast/307379',
    'https://www.accuweather.com/en/lk/teldeniya/307352/weather-forecast/307352',
    'https://www.accuweather.com/en/lk/uda-pussellawa/307353/weather-forecast/307353',
    'https://www.accuweather.com/en/lk/udawela/307354/weather-forecast/307354',
    'https://www.accuweather.com/en/lk/udumulla/307355/weather-forecast/307355',
    'https://www.accuweather.com/en/lk/wahakotte/307356/weather-forecast/307356',
    'https://www.accuweather.com/en/lk/watagoda/307357/weather-forecast/307357',
    'https://www.accuweather.com/en/lk/watawala/307358/weather-forecast/307358',
    'https://www.accuweather.com/en/lk/wattegama/307376/weather-forecast/307376',
    'https://www.accuweather.com/en/lk/welamboda/307359/weather-forecast/307359',
    'https://www.accuweather.com/en/lk/weligalla/307360/weather-forecast/307360',
    'https://www.accuweather.com/en/lk/weragantota/307377/weather-forecast/307377',
    'https://www.accuweather.com/en/lk/werellagama/307361/weather-forecast/307361',
];

router.get('/centrallocations1', async (req, res) => {

    const dataList = [];

    try {

        for(let url of centralUrls1){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Central/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});

router.get('/centrallocations2', async (req, res) => {

    const dataList = [];

    try {

        for(let url of centerUrls2){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Central/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});





const easternUrls1 = [
    'https://www.accuweather.com/en/lk/adaichakal/842919/weather-forecast/842919',
    'https://www.accuweather.com/en/lk/adampanai/842915/weather-forecast/842915',
    'https://www.accuweather.com/en/lk/addaippallam/842907/weather-forecast/842907',
    'https://www.accuweather.com/en/lk/addalachena/307535/weather-forecast/307535',
    'https://www.accuweather.com/en/lk/aiyanatidal/842862/weather-forecast/842862',
    'https://www.accuweather.com/en/lk/aiyankerni/842861/weather-forecast/842861',
    'https://www.accuweather.com/en/lk/aiyankernitalawai/842860/weather-forecast/842860',
    'https://www.accuweather.com/en/lk/akkaraipattu/307574/weather-forecast/307574',
    'https://www.accuweather.com/en/lk/akkuranai/842840/weather-forecast/842840',
    'https://www.accuweather.com/en/lk/akulobe/842839/weather-forecast/842839',
    'https://www.accuweather.com/en/lk/alahena/842807/weather-forecast/842807',
    'https://www.accuweather.com/en/lk/alankeni/842779/weather-forecast/842779',
    'https://www.accuweather.com/en/lk/alayadi-vempu/842753/weather-forecast/842753',
    'https://www.accuweather.com/en/lk/alayadimaduchchenai/842754/weather-forecast/842754',
    'https://www.accuweather.com/en/lk/aliyarvaddai/842737/weather-forecast/842737',
    'https://www.accuweather.com/en/lk/alutkotelinda/842684/weather-forecast/842684',
    'https://www.accuweather.com/en/lk/amarivayal/842648/weather-forecast/842648',
    'https://www.accuweather.com/en/lk/ambagahawela/842633/weather-forecast/842633',
    'https://www.accuweather.com/en/lk/ambalam/842605/weather-forecast/842605',
    'https://www.accuweather.com/en/lk/ambalama/842603/weather-forecast/842603',
    'https://www.accuweather.com/en/lk/ambalamoya/842602/weather-forecast/842602',
    'https://www.accuweather.com/en/lk/amirthakaly/842553/weather-forecast/842553',
    'https://www.accuweather.com/en/lk/ambagahawela/842633/weather-forecast/842633',
    'https://www.accuweather.com/en/lk/ambalam/842605/weather-forecast/842605',
    'https://www.accuweather.com/en/lk/ambalama/842603/weather-forecast/842603',
    'https://www.accuweather.com/en/lk/ambalamoya/842602/weather-forecast/842602',
    'https://www.accuweather.com/en/lk/amirthakaly/842553/weather-forecast/842553',
    'https://www.accuweather.com/en/lk/ammanthanaveli/842551/weather-forecast/842551',
    'https://www.accuweather.com/en/lk/ampara/307526/weather-forecast/307526',
    'https://www.accuweather.com/en/lk/ampilanturai/842537/weather-forecast/842537',
    'https://www.accuweather.com/en/lk/anaisuddapottanai/842497/weather-forecast/842497',
    'https://www.accuweather.com/en/lk/anaitivu/842496/weather-forecast/842496',
    'https://www.accuweather.com/en/lk/analkaddimady/842492/weather-forecast/842492',
    'https://www.accuweather.com/en/lk/andankulam/842474/weather-forecast/842474',
    'https://www.accuweather.com/en/lk/angoda/842410/weather-forecast/842410',
    'https://www.accuweather.com/en/lk/annamalai/842377/weather-forecast/842377',
    'https://www.accuweather.com/en/lk/aralupitiya/842337/weather-forecast/842337',
    'https://www.accuweather.com/en/lk/arapattai/307536/weather-forecast/307536',
    'https://www.accuweather.com/en/lk/arapotta/842314/weather-forecast/842314',
    'https://www.accuweather.com/en/lk/arasadichenai/842313/weather-forecast/842313',
    'https://www.accuweather.com/en/lk/arasaditivu/842312/weather-forecast/842312',
    'https://www.accuweather.com/en/lk/aravawatte/842307/weather-forecast/842307',
    'https://www.accuweather.com/en/lk/arippu/842300/weather-forecast/842300',
    'https://www.accuweather.com/en/lk/arukarkudah/842287/weather-forecast/842287',
    'https://www.accuweather.com/en/lk/attuchenai/842202/weather-forecast/842202',
    'https://www.accuweather.com/en/lk/avaddaveli/842186/weather-forecast/842186',
    'https://www.accuweather.com/en/lk/ayittiyamalai/842172/weather-forecast/842172',
];
const easternUrls2 = [
    'https://www.accuweather.com/en/lk/batticaloa/307525/weather-forecast/307525',
    'https://www.accuweather.com/en/lk/chenkalady/307537/weather-forecast/307537',
    'https://www.accuweather.com/en/lk/china-bay/307538/weather-forecast/307538',
    'https://www.accuweather.com/en/lk/dehiattekandiya/307539/weather-forecast/307539',
    'https://www.accuweather.com/en/lk/dunukepotanela/307575/weather-forecast/307575',
    'https://www.accuweather.com/en/lk/eravur/307531/weather-forecast/307531',
    'https://www.accuweather.com/en/lk/foul-point/307559/weather-forecast/307559',
    'https://www.accuweather.com/en/lk/hingurana/307540/weather-forecast/307540',
    'https://www.accuweather.com/en/lk/inginiyagala/307541/weather-forecast/307541',
    'https://www.accuweather.com/en/lk/irakkamam/307542/weather-forecast/307542',
    'https://www.accuweather.com/en/lk/kalkudah/307569/weather-forecast/307569',
    'https://www.accuweather.com/en/lk/kallar/307543/weather-forecast/307543',
    'https://www.accuweather.com/en/lk/kalmunai/307532/weather-forecast/307532',
    'https://www.accuweather.com/en/lk/kaluvanchikudiyiruppu/307544/weather-forecast/307544',
    'https://www.accuweather.com/en/lk/kantale/307545/weather-forecast/307545',
    'https://www.accuweather.com/en/lk/karangawa/307533/weather-forecast/307533',
    'https://www.accuweather.com/en/lk/karativu/307561/weather-forecast/307561',
    'https://www.accuweather.com/en/lk/kattankudy/307527/weather-forecast/307527',
    'https://www.accuweather.com/en/lk/kokkadichcholai/307546/weather-forecast/307546',
    'https://www.accuweather.com/en/lk/komari/307557/weather-forecast/307557',
    'https://www.accuweather.com/en/lk/kuchchaveli/307565/weather-forecast/307565',
    'https://www.accuweather.com/en/lk/kumana/307578/weather-forecast/307578',
    'https://www.accuweather.com/en/lk/kurukkalmadam/307566/weather-forecast/307566',
    'https://www.accuweather.com/en/lk/maha-oya/307570/weather-forecast/307570',
    'https://www.accuweather.com/en/lk/mandur/307548/weather-forecast/307548',
    'https://www.accuweather.com/en/lk/mudduchchenai/307568/weather-forecast/307568',
    'https://www.accuweather.com/en/lk/mutur/307530/weather-forecast/307530',
    'https://www.accuweather.com/en/lk/nilaveli/307582/weather-forecast/307582',
    'https://www.accuweather.com/en/lk/nintavur/307583/weather-forecast/307583',
    'https://www.accuweather.com/en/lk/oddaimavadi/307549/weather-forecast/307549',
    'https://www.accuweather.com/en/lk/okanda/307585/weather-forecast/307585',
    'https://www.accuweather.com/en/lk/oluvil/307550/weather-forecast/307550',
    'https://www.accuweather.com/en/lk/paddiruppu/307571/weather-forecast/307571',
    'https://www.accuweather.com/en/lk/padiyatalawa/307572/weather-forecast/307572',
    'https://www.accuweather.com/en/lk/palattadichchenai/307563/weather-forecast/307563',
    'https://www.accuweather.com/en/lk/panama/307577/weather-forecast/307577',
    'https://www.accuweather.com/en/lk/pansalgoda/307547/weather-forecast/307547',
    'https://www.accuweather.com/en/lk/periyaporativu/307551/weather-forecast/307551',
    'https://www.accuweather.com/en/lk/pottuvil/307576/weather-forecast/307576',
    'https://www.accuweather.com/en/lk/pullumalai/307552/weather-forecast/307552',
    'https://www.accuweather.com/en/lk/pulmoddai/307579/weather-forecast/307579',
    'https://www.accuweather.com/en/lk/saintamaruthu/307553/weather-forecast/307553',
    'https://www.accuweather.com/en/lk/sammanthurai/307529/weather-forecast/307529',
    'https://www.accuweather.com/en/lk/sempadu/307581/weather-forecast/307581',
    'https://www.accuweather.com/en/lk/seruwawila/307564/weather-forecast/307564',
    'https://www.accuweather.com/en/lk/sinnakinniyai/3524/weather-forecast/3524',
    'https://www.accuweather.com/en/lk/thirukkaikuda/307528/weather-forecast/307528',
    'https://www.accuweather.com/en/lk/thottama/307560/weather-forecast/307560',
    'https://www.accuweather.com/en/lk/tirrukkovil/307584/weather-forecast/307584',
    'https://www.accuweather.com/en/lk/toppur/307554/weather-forecast/307554',
    'https://www.accuweather.com/en/lk/trincomalee/307534/weather-forecast/307534',
    'https://www.accuweather.com/en/lk/tukkuvittan/307562/weather-forecast/307562',
    'https://www.accuweather.com/en/lk/uhana/307573/weather-forecast/307573',
    'https://www.accuweather.com/en/lk/vaikaladichchenai/307556/weather-forecast/307556',
    'https://www.accuweather.com/en/lk/vakarai/307555/weather-forecast/307555',
    'https://www.accuweather.com/en/lk/valaichchenai/307558/weather-forecast/307558',
    'https://www.accuweather.com/en/lk/veranativu/307567/weather-forecast/307567',
];

router.get('/easternlocations1', async (req, res) => {

    const dataList = [];

    try {

        for(let url of easternUrls1){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Eastern/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});
router.get('/easternlocations2', async (req, res) => {

    const dataList = [];

    try {

        for(let url of easternUrls2){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Eastern/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});





const northCentralIrls1 = [
    'https://www.accuweather.com/en/lk/achari-madatugama/842928/weather-forecast/842928',
    'https://www.accuweather.com/en/lk/acharigama/842934/weather-forecast/842934',
    'https://www.accuweather.com/en/lk/achchirikulama/842924/weather-forecast/842924',
    'https://www.accuweather.com/en/lk/achirigama/842922/weather-forecast/842922',
    'https://www.accuweather.com/en/lk/adampane/842913/weather-forecast/842913',
    'https://www.accuweather.com/en/lk/aiyatayagama/842859/weather-forecast/842859',
    'https://www.accuweather.com/en/lk/akirikanda/842846/weather-forecast/842846',
    'https://www.accuweather.com/en/lk/akuranayagama/842830/weather-forecast/842830',
    'https://www.accuweather.com/en/lk/alagollewa/842809/weather-forecast/842809',
    'https://www.accuweather.com/en/lk/alahapperumagama/842808/weather-forecast/842808',
    'https://www.accuweather.com/en/lk/alankulama/842775/weather-forecast/842775',
    'https://www.accuweather.com/en/lk/alinchipotana/842743/weather-forecast/842743',
    'https://www.accuweather.com/en/lk/alittana/842741/weather-forecast/842741',
    'https://www.accuweather.com/en/lk/aliyakada/842740/weather-forecast/842740',
    'https://www.accuweather.com/en/lk/aliyamalagala/842739/weather-forecast/842739',
    'https://www.accuweather.com/en/lk/aliyawetunawewa/842735/weather-forecast/842735',
    'https://www.accuweather.com/en/lk/alut-gantiriyagama/842691/weather-forecast/842691',
    'https://www.accuweather.com/en/lk/alutgama/308822/weather-forecast/308822',
    'https://www.accuweather.com/en/lk/aluthwewa/842686/weather-forecast/842686',
    'https://www.accuweather.com/en/lk/alutoya/308794/weather-forecast/308794',
    'https://www.accuweather.com/en/lk/alutwewa/842666/weather-forecast/842666',
    'https://www.accuweather.com/en/lk/aluwaketuwala/842664/weather-forecast/842664',
    'https://www.accuweather.com/en/lk/amane/842652/weather-forecast/842652',
    'https://www.accuweather.com/en/lk/ambagahagama/842644/weather-forecast/842644',
    'https://www.accuweather.com/en/lk/ambagahawala/842635/weather-forecast/842635',
    'https://www.accuweather.com/en/lk/ambagahawewa/842631/weather-forecast/842631',
    'https://www.accuweather.com/en/lk/aminichchiya/842554/weather-forecast/842554',
    'https://www.accuweather.com/en/lk/amunugama/842521/weather-forecast/842521',
    'https://www.accuweather.com/en/lk/amunukole/842518/weather-forecast/842518',
    'https://www.accuweather.com/en/lk/amunuwetiya/842509/weather-forecast/842509',
    'https://www.accuweather.com/en/lk/amunwetiya/842507/weather-forecast/842507',
    'https://www.accuweather.com/en/lk/anaketawewa/842494/weather-forecast/842494',
    'https://www.accuweather.com/en/lk/anaolondewa/842490/weather-forecast/842490',
    'https://www.accuweather.com/en/lk/anaulundawa/842488/weather-forecast/842488',
    'https://www.accuweather.com/en/lk/andaragasmulla/842469/weather-forecast/842469',
    'https://www.accuweather.com/en/lk/andaragollewa/842467/weather-forecast/842467',
    'https://www.accuweather.com/en/lk/andarawewa/842464/weather-forecast/842464',
    'https://www.accuweather.com/en/lk/andiyagala/842443/weather-forecast/842443',
    'https://www.accuweather.com/en/lk/andiyankulama/842438/weather-forecast/842438',
    'https://www.accuweather.com/en/lk/anduwaketiyawa/842428/weather-forecast/842428',
    'https://www.accuweather.com/en/lk/anekattiya/842426/weather-forecast/842426',
    'https://www.accuweather.com/en/lk/angamedilla/842423/weather-forecast/842423',
    'https://www.accuweather.com/en/lk/angamuwa/842418/weather-forecast/842418',
    'https://www.accuweather.com/en/lk/angunachchiya/842400/weather-forecast/842400',
    'https://www.accuweather.com/en/lk/anuradhapura/308791/weather-forecast/308791',
    'https://www.accuweather.com/en/lk/appugama/842360/weather-forecast/842360',
    'https://www.accuweather.com/en/lk/appukuttigama/842359/weather-forecast/842359',
    'https://www.accuweather.com/en/lk/appuwewa/842358/weather-forecast/842358',
    'https://www.accuweather.com/en/lk/aramandakatuwa/842332/weather-forecast/842332',
    'https://www.accuweather.com/en/lk/arsanagar/842292/weather-forecast/842292'
];
const northCentralIrls2 = [
    'https://www.accuweather.com/en/lk/bakamune/308795/weather-forecast/308795',
    'https://www.accuweather.com/en/lk/dangollegama/308842/weather-forecast/308842',
    'https://www.accuweather.com/en/lk/elahera/308833/weather-forecast/308833',
    'https://www.accuweather.com/en/lk/eppawala/308796/weather-forecast/308796',
    'https://www.accuweather.com/en/lk/galatanwewa/308797/weather-forecast/308797',
    'https://www.accuweather.com/en/lk/galenbindunuwewa/308798/weather-forecast/308798',
    'https://www.accuweather.com/en/lk/galkiriyagama/308799/weather-forecast/308799',
    'https://www.accuweather.com/en/lk/galkiriyagama/308800/weather-forecast/308800',
    'https://www.accuweather.com/en/lk/ganangolla/308831/weather-forecast/308831',
    'https://www.accuweather.com/en/lk/ganewalpola/308843/weather-forecast/308843',
    'https://www.accuweather.com/en/lk/habarane/308845/weather-forecast/308845',
    'https://www.accuweather.com/en/lk/hingurakdamana/308793/weather-forecast/308793',
    'https://www.accuweather.com/en/lk/horowupotana/308835/weather-forecast/308835',
    'https://www.accuweather.com/en/lk/ipalogama/308801/weather-forecast/308801',
    'https://www.accuweather.com/en/lk/kahatagasdigiliya/308837/weather-forecast/308837',
    'https://www.accuweather.com/en/lk/kanduruwela/308832/weather-forecast/308832',
    'https://www.accuweather.com/en/lk/kapugollewa/308802/weather-forecast/308802',
    'https://www.accuweather.com/en/lk/kebitigollewa/308834/weather-forecast/308834',
    'https://www.accuweather.com/en/lk/kekirawa/308844/weather-forecast/308844',
    'https://www.accuweather.com/en/lk/kolakanaweli/308830/weather-forecast/308830',
    'https://www.accuweather.com/en/lk/kuda-galnewa/308803/weather-forecast/308803',
    'https://www.accuweather.com/en/lk/madatugama/308804/weather-forecast/308804',
    'https://www.accuweather.com/en/lk/maha-iluppallama/308805/weather-forecast/308805',
    'https://www.accuweather.com/en/lk/mannampitiya/308806/weather-forecast/308806',
    'https://www.accuweather.com/en/lk/maradankadawalagama/308807/weather-forecast/308807',
    'https://www.accuweather.com/en/lk/medawachchiya/308808/weather-forecast/308808',
    'https://www.accuweather.com/en/lk/medirigiriya/308840/weather-forecast/308840',
    'https://www.accuweather.com/en/lk/migaswewa/308825/weather-forecast/308825',
    'https://www.accuweather.com/en/lk/mihintale/308820/weather-forecast/308820',
    'https://www.accuweather.com/en/lk/minneriya/308809/weather-forecast/308809',
    'https://www.accuweather.com/en/lk/mutugalla/308821/weather-forecast/308821',
    'https://www.accuweather.com/en/lk/negama/308823/weather-forecast/308823',
    'https://www.accuweather.com/en/lk/negampaha/308810/weather-forecast/308810',
    'https://www.accuweather.com/en/lk/nochchiyagama/308811/weather-forecast/308811',
    'https://www.accuweather.com/en/lk/pahala-galkulama/308812/weather-forecast/308812',
    'https://www.accuweather.com/en/lk/pahala-maragahawewa/308813/weather-forecast/308813',
    'https://www.accuweather.com/en/lk/polonnaruwa/308792/weather-forecast/308792',
    'https://www.accuweather.com/en/lk/rambewa/308826/weather-forecast/308826',
    'https://www.accuweather.com/en/lk/ratmalagahawewa/308829/weather-forecast/308829',
    'https://www.accuweather.com/en/lk/sippukulama/308815/weather-forecast/308815',
    'https://www.accuweather.com/en/lk/talawa/308816/weather-forecast/308816',
    'https://www.accuweather.com/en/lk/tambuttegama/308841/weather-forecast/308841',
    'https://www.accuweather.com/en/lk/tammannewa/308836/weather-forecast/308836',
    'https://www.accuweather.com/en/lk/tirikonamadu/308817/weather-forecast/308817',
    'https://www.accuweather.com/en/lk/welikanda/308818/weather-forecast/308818',
    'https://www.accuweather.com/en/lk/yakalla/308839/weather-forecast/308839',
];

router.get('/northcentrallocations1', async (req, res) => {

    const dataList = [];

    try {

        for(let url of northCentralIrls1){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, North Central/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});

router.get('/northcentrallocations2', async (req, res) => {

    const dataList = [];

    try {

        for(let url of northCentralIrls2){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, North Central/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});




const northWesternUrls1 = [
    'https://www.accuweather.com/en/lk/abakolawewa/842941/weather-forecast/842941',
    'https://www.accuweather.com/en/lk/abbowa/842939/weather-forecast/842939',
    'https://www.accuweather.com/en/lk/achari-hinukwewa/842932/weather-forecast/842932',
    'https://www.accuweather.com/en/lk/achari-ihalagama/842931/weather-forecast/842931',
    'https://www.accuweather.com/en/lk/acharigama/842935/weather-forecast/842935',
    'https://www.accuweather.com/en/lk/acharikelegama/842930/weather-forecast/842930',
    'https://www.accuweather.com/en/lk/acharikonwewa/842929/weather-forecast/842929',
    'https://www.accuweather.com/en/lk/achchamulai/842927/weather-forecast/842927',
    'https://www.accuweather.com/en/lk/achirigama/842923/weather-forecast/842923',
    'https://www.accuweather.com/en/lk/achiriyakotuwa/842920/weather-forecast/842920',
    'https://www.accuweather.com/en/lk/adampane/842914/weather-forecast/842914',
    'https://www.accuweather.com/en/lk/adappanavillu/842911/weather-forecast/842911',
    'https://www.accuweather.com/en/lk/adapparagama/842909/weather-forecast/842909',
    'https://www.accuweather.com/en/lk/adikarigama/842904/weather-forecast/842904',
    'https://www.accuweather.com/en/lk/adippola/842899/weather-forecast/842899',
    'https://www.accuweather.com/en/lk/adukkane/842897/weather-forecast/842897',
    'https://www.accuweather.com/en/lk/adukkanewatuyaya/842896/weather-forecast/842896',
    'https://www.accuweather.com/en/lk/agalegama/842889/weather-forecast/842889',
    'https://www.accuweather.com/en/lk/agarauda/842883/weather-forecast/842883',
    'https://www.accuweather.com/en/lk/agare/842882/weather-forecast/842882',
    'https://www.accuweather.com/en/lk/agaregedara/842880/weather-forecast/842880',
    'https://www.accuweather.com/en/lk/agulgomuwa/842876/weather-forecast/842876',
    'https://www.accuweather.com/en/lk/ahasyanapitiya/842870/weather-forecast/842870',
    'https://www.accuweather.com/en/lk/ahatuwewe/842869/weather-forecast/842869',
    'https://www.accuweather.com/en/lk/ahubodagama/842868/weather-forecast/842868',
    'https://www.accuweather.com/en/lk/ahugoda/842866/weather-forecast/842866',
    'https://www.accuweather.com/en/lk/akade/842857/weather-forecast/842857',
    'https://www.accuweather.com/en/lk/akarawatta/308897/weather-forecast/308897',
    'https://www.accuweather.com/en/lk/alawwegama/308850/weather-forecast/308850',
    'https://www.accuweather.com/en/lk/ambanpola/308889/weather-forecast/308889',
    'https://www.accuweather.com/en/lk/anamaduwa/308904/weather-forecast/308904',
    'https://www.accuweather.com/en/lk/anawilundawa/308851/weather-forecast/308851',
    'https://www.accuweather.com/en/lk/bangadeniya/308891/weather-forecast/308891',
    'https://www.accuweather.com/en/lk/bingiriya/308852/weather-forecast/308852',
    'https://www.accuweather.com/en/lk/bolawatta/308884/weather-forecast/308884',
    'https://www.accuweather.com/en/lk/chilaw-town/308848/weather-forecast/308848',
    'https://www.accuweather.com/en/lk/dambadeniya/308853/weather-forecast/308853',
    'https://www.accuweather.com/en/lk/dandagamuwa/308896/weather-forecast/308896',
    'https://www.accuweather.com/en/lk/dankotuwa/308854/weather-forecast/308854',
    'https://www.accuweather.com/en/lk/dodangaslanda/308855/weather-forecast/308855',
    'https://www.accuweather.com/en/lk/dummalasuriya/308856/weather-forecast/308856',
    'https://www.accuweather.com/en/lk/galgamuwa/308910/weather-forecast/308910',
    'https://www.accuweather.com/en/lk/ganewatta/308857/weather-forecast/308857',
    'https://www.accuweather.com/en/lk/gonawila/308858/weather-forecast/308858',
    'https://www.accuweather.com/en/lk/hettipola/308906/weather-forecast/308906',
    'https://www.accuweather.com/en/lk/hiripitiya/308888/weather-forecast/308888',
    'https://www.accuweather.com/en/lk/ibbagomuwa/308859/weather-forecast/308859',
    'https://www.accuweather.com/en/lk/ihala-bujjamuwa/309470/weather-forecast/309470',
    'https://www.accuweather.com/en/lk/kalpitiya/1145/weather-forecast/1145',
    'https://www.accuweather.com/en/lk/katupota/308894/weather-forecast/308894',
    'https://www.accuweather.com/en/lk/katupotha/308861/weather-forecast/308861',
    'https://www.accuweather.com/en/lk/kobeyigane/308862/weather-forecast/308862',
    'https://www.accuweather.com/en/lk/kolongahawewa/308860/weather-forecast/308860',
];
const northWesternUrls2 = [
    'https://www.accuweather.com/en/lk/konwewa/308863/weather-forecast/308863',
    'https://www.accuweather.com/en/lk/kottukachchiya/308892/weather-forecast/308892',
    'https://www.accuweather.com/en/lk/kuliyapitiya/308907/weather-forecast/308907',
    'https://www.accuweather.com/en/lk/kurunegala/308847/weather-forecast/308847',
    'https://www.accuweather.com/en/lk/lunuwila/308864/weather-forecast/308864',
    'https://www.accuweather.com/en/lk/madampe/308899/weather-forecast/308899',
    'https://www.accuweather.com/en/lk/madigepola/308895/weather-forecast/308895',
    'https://www.accuweather.com/en/lk/madurankuli/308890/weather-forecast/308890',
    'https://www.accuweather.com/en/lk/maha-wewa/308865/weather-forecast/308865',
    'https://www.accuweather.com/en/lk/mahakumbukkadawala/308901/weather-forecast/308901',
    'https://www.accuweather.com/en/lk/mahawewa/308866/weather-forecast/308866',
    'https://www.accuweather.com/en/lk/maho/308882/weather-forecast/308882',
    'https://www.accuweather.com/en/lk/makulpota/308867/weather-forecast/308867',
    'https://www.accuweather.com/en/lk/mampuri/308886/weather-forecast/308886',
    'https://www.accuweather.com/en/lk/marawila/308868/weather-forecast/308868',
    'https://www.accuweather.com/en/lk/mawatagama/308869/weather-forecast/308869',
    'https://www.accuweather.com/en/lk/melsiripura/308870/weather-forecast/308870',
    'https://www.accuweather.com/en/lk/moragollagama/308903/weather-forecast/308903',
    'https://www.accuweather.com/en/lk/mundal/308912/weather-forecast/308912',
    'https://www.accuweather.com/en/lk/nagollagama/308871/weather-forecast/308871',
    'https://www.accuweather.com/en/lk/narammala/308908/weather-forecast/308908',
    'https://www.accuweather.com/en/lk/nattandiya/308883/weather-forecast/308883',
    'https://www.accuweather.com/en/lk/nawagattegama/308872/weather-forecast/308872',
    'https://www.accuweather.com/en/lk/nayinamadama-east/308873/weather-forecast/308873',
    'https://www.accuweather.com/en/lk/nikapota/308911/weather-forecast/308911',
    'https://www.accuweather.com/en/lk/nikaweratiya/308898/weather-forecast/308898',
    'https://www.accuweather.com/en/lk/pahala-katuneriya/308913/weather-forecast/308913',
    'https://www.accuweather.com/en/lk/palavi/308914/weather-forecast/308914',
    'https://www.accuweather.com/en/lk/pallama/308874/weather-forecast/308874',
    'https://www.accuweather.com/en/lk/pannala/308875/weather-forecast/308875',
    'https://www.accuweather.com/en/lk/polgahawela/308909/weather-forecast/308909',
    'https://www.accuweather.com/en/lk/polpitigama/308876/weather-forecast/308876',
    'https://www.accuweather.com/en/lk/pomparippu/308902/weather-forecast/308902',
    'https://www.accuweather.com/en/lk/potuhera/308900/weather-forecast/308900',
    'https://www.accuweather.com/en/lk/puliyankulam/308887/weather-forecast/308887',
    'https://www.accuweather.com/en/lk/puttalam/308849/weather-forecast/308849',
    'https://www.accuweather.com/en/lk/ridigama/308877/weather-forecast/308877',
    'https://www.accuweather.com/en/lk/udappuwa-north/308878/weather-forecast/308878',
    'https://www.accuweather.com/en/lk/udubaddawa/308879/weather-forecast/308879',
    'https://www.accuweather.com/en/lk/wariyapola/308905/weather-forecast/308905',
    'https://www.accuweather.com/en/lk/wayikkal/308915/weather-forecast/308915',
    'https://www.accuweather.com/en/lk/wellawa/308880/weather-forecast/308880',
    'https://www.accuweather.com/en/lk/wennappuwa/308916/weather-forecast/308916',
    'https://www.accuweather.com/en/lk/weuda/308881/weather-forecast/308881',
    'https://www.accuweather.com/en/lk/wewalagama/308885/weather-forecast/308885',
];

router.get('/northwesternlocations1', async (req, res) => {

    const dataList = [];

    try {

        for(let url of northWesternUrls1){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, North Western/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});

router.get('/northwesternlocations2', async (req, res) => {

    const dataList = [];

    try {

        for(let url of northWesternUrls2){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, North Western/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});




const nothernUrls1 = [
    'https://www.accuweather.com/en/lk/achchankulam/842926/weather-forecast/842926',
    'https://www.accuweather.com/en/lk/achchelu/842925/weather-forecast/842925',
    'https://www.accuweather.com/en/lk/achchuveli/308946/weather-forecast/308946',
    'https://www.accuweather.com/en/lk/adaikkalamoddai/842918/weather-forecast/842918',
    'https://www.accuweather.com/en/lk/adampan/842916/weather-forecast/842916',
    'https://www.accuweather.com/en/lk/adampantalvu/842912/weather-forecast/842912',
    'https://www.accuweather.com/en/lk/adappankulam/842910/weather-forecast/842910',
    'https://www.accuweather.com/en/lk/adiyakulam/842898/weather-forecast/842898',
    'https://www.accuweather.com/en/lk/aiyamperumal/842863/weather-forecast/842863',
    'https://www.accuweather.com/en/lk/akattikkulam/842848/weather-forecast/842848',
    'https://www.accuweather.com/en/lk/akattimurippu/842847/weather-forecast/842847',
    'https://www.accuweather.com/en/lk/aladikattaikatu/842817/weather-forecast/842817',
    'https://www.accuweather.com/en/lk/aladikulam/842816/weather-forecast/842816',
    'https://www.accuweather.com/en/lk/alagalla/842813/weather-forecast/842813',
    'https://www.accuweather.com/en/lk/alaikallupodda-alankulam/842803/weather-forecast/842803',
    'https://www.accuweather.com/en/lk/alaikallupoddakulam/842802/weather-forecast/842802',
    'https://www.accuweather.com/en/lk/alaikkalluppoddakulam/842801/weather-forecast/842801',
    'https://www.accuweather.com/en/lk/alampil/842784/weather-forecast/842784',
    'https://www.accuweather.com/en/lk/alankulam/842777/weather-forecast/842777',
    'https://www.accuweather.com/en/lk/alavakkaisirukkulam/842768/weather-forecast/842768',
    'https://www.accuweather.com/en/lk/alaveddi/842767/weather-forecast/842767',
    'https://www.accuweather.com/en/lk/alavedduvan/842766/weather-forecast/842766',
    'https://www.accuweather.com/en/lk/aliavalai/842744/weather-forecast/842744',
    'https://www.accuweather.com/en/lk/alipalai/842742/weather-forecast/842742',
    'https://www.accuweather.com/en/lk/aliyansaintakulam/842738/weather-forecast/842738',
    'https://www.accuweather.com/en/lk/alkaddiveli/842733/weather-forecast/842733',
    'https://www.accuweather.com/en/lk/allaippiddi/842730/weather-forecast/842730',
    'https://www.accuweather.com/en/lk/allarai/842727/weather-forecast/842727',
    'https://www.accuweather.com/en/lk/alut-hammillewa/842689/weather-forecast/842689',
    'https://www.accuweather.com/en/lk/alvai-north/842662/weather-forecast/842662',
    'https://www.accuweather.com/en/lk/alvai-south/842661/weather-forecast/842661',
    'https://www.accuweather.com/en/lk/alvai-west/842660/weather-forecast/842660',
    'https://www.accuweather.com/en/lk/ammivaittan/842549/weather-forecast/842549',
    'https://www.accuweather.com/en/lk/ampakamam/842546/weather-forecast/842546',
    'https://www.accuweather.com/en/lk/ampalavanpokkanai/842545/weather-forecast/842545',
    'https://www.accuweather.com/en/lk/ampan/842544/weather-forecast/842544',
    'https://www.accuweather.com/en/lk/amutankulam/842503/weather-forecast/842503',
    'https://www.accuweather.com/en/lk/anaikkoddai/842501/weather-forecast/842501',
    'https://www.accuweather.com/en/lk/anaipanthy/842499/weather-forecast/842499',
    'https://www.accuweather.com/en/lk/anaippapan/842498/weather-forecast/842498',
    'https://www.accuweather.com/en/lk/anaiviluntan/842495/weather-forecast/842495',
    'https://www.accuweather.com/en/lk/analaitivu/842493/weather-forecast/842493',
    'https://www.accuweather.com/en/lk/anantarpuliyankulam/842491/weather-forecast/842491',
    'https://www.accuweather.com/en/lk/andiyapuliyankulam/842437/weather-forecast/842437',
    'https://www.accuweather.com/en/lk/aninchiyankulam/842385/weather-forecast/842385',
    'https://www.accuweather.com/en/lk/annammakulam/842376/weather-forecast/842376',
    'https://www.accuweather.com/en/lk/annatevanmadu/842375/weather-forecast/842375',
    'https://www.accuweather.com/en/lk/antanantidai/842374/weather-forecast/842374',
    'https://www.accuweather.com/en/lk/antonimelingilkulam/842372/weather-forecast/842372',
    'https://www.accuweather.com/en/lk/appakkuttikinattadi/842362/weather-forecast/842362',
];
const nothernUrls2 = [
    'https://www.accuweather.com/en/lk/arachchikulam/842351/weather-forecast/842351',
    'https://www.accuweather.com/en/lk/arali-east/842342/weather-forecast/842342',
    'https://www.accuweather.com/en/lk/arali-north/842341/weather-forecast/842341',
    'https://www.accuweather.com/en/lk/arali-south/842340/weather-forecast/842340',
    'https://www.accuweather.com/en/lk/arali-west/842339/weather-forecast/842339',
    'https://www.accuweather.com/en/lk/araly/842334/weather-forecast/842334',
    'https://www.accuweather.com/en/lk/chankanai/308920/weather-forecast/308920',
    'https://www.accuweather.com/en/lk/chavakachcheri/308924/weather-forecast/308924',
    'https://www.accuweather.com/en/lk/cheddikulam/308935/weather-forecast/308935',
    'https://www.accuweather.com/en/lk/chekkadippulavu/308955/weather-forecast/308955',
    'https://www.accuweather.com/en/lk/chunnakam/308923/weather-forecast/308923',
    'https://www.accuweather.com/en/lk/elephant-pass/308937/weather-forecast/308937',
    'https://www.accuweather.com/en/lk/jaffna/308917/weather-forecast/308917',
    'https://www.accuweather.com/en/lk/kallolunkanpuliyankulam/308928/weather-forecast/308928',
    'https://www.accuweather.com/en/lk/kankesanturai/308958/weather-forecast/308958',
    'https://www.accuweather.com/en/lk/kanukkeni/308936/weather-forecast/308936',
    'https://www.accuweather.com/en/lk/kayts/308945/weather-forecast/308945',
    'https://www.accuweather.com/en/lk/kilinochchi/308925/weather-forecast/308925',
    'https://www.accuweather.com/en/lk/kokkavil/308929/weather-forecast/308929',
    'https://www.accuweather.com/en/lk/kokkuttoduvai/308941/weather-forecast/308941',
    'https://www.accuweather.com/en/lk/kumulamunai/308943/weather-forecast/308943',
    'https://www.accuweather.com/en/lk/manipay/308934/weather-forecast/308934',
    'https://www.accuweather.com/en/lk/mankulam/308949/weather-forecast/308949',
    'https://www.accuweather.com/en/lk/mannar/308922/weather-forecast/308922',
    'https://www.accuweather.com/en/lk/mantota/308942/weather-forecast/308942',
    'https://www.accuweather.com/en/lk/maveliturai/308960/weather-forecast/308960',
    'https://www.accuweather.com/en/lk/mullaittivu/308926/weather-forecast/308926',
    'https://www.accuweather.com/en/lk/mulliyavalai/308944/weather-forecast/308944',
    'https://www.accuweather.com/en/lk/mundumurippu/308951/weather-forecast/308951',
    'https://www.accuweather.com/en/lk/nanaddan/308939/weather-forecast/308939',
    'https://www.accuweather.com/en/lk/nedunkeni/308950/weather-forecast/308950',
    'https://www.accuweather.com/en/lk/nelladi/308918/weather-forecast/308918',
    'https://www.accuweather.com/en/lk/oddusuddan/308931/weather-forecast/308931',
    'https://www.accuweather.com/en/lk/palampiddi/308953/weather-forecast/308953',
    'https://www.accuweather.com/en/lk/pallamadu/308940/weather-forecast/308940',
    'https://www.accuweather.com/en/lk/pandattarippu/308921/weather-forecast/308921',
    'https://www.accuweather.com/en/lk/paraiyanalankulam/308954/weather-forecast/308954',
    'https://www.accuweather.com/en/lk/parantan/308938/weather-forecast/308938',
    'https://www.accuweather.com/en/lk/pesalai/308959/weather-forecast/308959',
    'https://www.accuweather.com/en/lk/point-pedro/308957/weather-forecast/308957',
    'https://www.accuweather.com/en/lk/pooneryn/308947/weather-forecast/308947',
    'https://www.accuweather.com/en/lk/puliyankulam/308952/weather-forecast/308952',
    'https://www.accuweather.com/en/lk/punkudutivu-west/308932/weather-forecast/308932',
    'https://www.accuweather.com/en/lk/puthukkudiyiruppu/308933/weather-forecast/308933',
    'https://www.accuweather.com/en/lk/silavatturai/308962/weather-forecast/308962',
    'https://www.accuweather.com/en/lk/talaimannar/308961/weather-forecast/308961',
    'https://www.accuweather.com/en/lk/urumpirai/308919/weather-forecast/308919',
    'https://www.accuweather.com/en/lk/valvedditturai/308956/weather-forecast/308956',
    'https://www.accuweather.com/en/lk/vavuniya/308927/weather-forecast/308927',
    'https://www.accuweather.com/en/lk/vellankulam/308948/weather-forecast/308948',
];

router.get('/northernlocations1', async (req, res) => {

    const dataList = [];

    try {

        for(let url of nothernUrls1){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Northern/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});

router.get('/northernlocations2', async (req, res) => {

    const dataList = [];

    try {

        for(let url of nothernUrls2){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Northern/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});




const sabaragamuUrls1 = [
    'https://www.accuweather.com/en/lk/adawikanda/842908/weather-forecast/842908',
    'https://www.accuweather.com/en/lk/adikariya/842901/weather-forecast/842901',
    'https://www.accuweather.com/en/lk/agalagama/842894/weather-forecast/842894',
    'https://www.accuweather.com/en/lk/agalagamuwa/842893/weather-forecast/842893',
    'https://www.accuweather.com/en/lk/agalawatta/842891/weather-forecast/842891',
    'https://www.accuweather.com/en/lk/agalekumbura/842887/weather-forecast/842887',
    'https://www.accuweather.com/en/lk/agaregama/842881/weather-forecast/842881',
    'https://www.accuweather.com/en/lk/ahaspokuna/842871/weather-forecast/842871',
    'https://www.accuweather.com/en/lk/ahuliyadda/842865/weather-forecast/842865',
    'https://www.accuweather.com/en/lk/akarella/842849/weather-forecast/842849',
    'https://www.accuweather.com/en/lk/akurana/842833/weather-forecast/842833',
    'https://www.accuweather.com/en/lk/akurugegangoda/842825/weather-forecast/842825',
    'https://www.accuweather.com/en/lk/akwatta/842819/weather-forecast/842819',
    'https://www.accuweather.com/en/lk/alagalkanda/842815/weather-forecast/842815',
    'https://www.accuweather.com/en/lk/alakolaella/842793/weather-forecast/842793',
    'https://www.accuweather.com/en/lk/alankarapanguwa/842782/weather-forecast/842782',
    'https://www.accuweather.com/en/lk/alapaladeniya/842772/weather-forecast/842772',
    'https://www.accuweather.com/en/lk/alapalawala/842770/weather-forecast/842770',
    'https://www.accuweather.com/en/lk/alawala/842763/weather-forecast/842763',
    'https://www.accuweather.com/en/lk/alawala/842764/weather-forecast/842764',
    'https://www.accuweather.com/en/lk/alawatura/842756/weather-forecast/842756',
    'https://www.accuweather.com/en/lk/aldora/842751/weather-forecast/842751',
    'https://www.accuweather.com/en/lk/algama-egodagama/842749/weather-forecast/842749',
    'https://www.accuweather.com/en/lk/algama-ihalagama/842748/weather-forecast/842748',
    'https://www.accuweather.com/en/lk/algama-medagama/842747/weather-forecast/842747',
    'https://www.accuweather.com/en/lk/algoda/842746/weather-forecast/842746',
    'https://www.accuweather.com/en/lk/alkegama/842732/weather-forecast/842732',
    'https://www.accuweather.com/en/lk/alpitiya/842726/weather-forecast/842726',
    'https://www.accuweather.com/en/lk/aludeniya/842720/weather-forecast/842720',
    'https://www.accuweather.com/en/lk/aluketiya/842712/weather-forecast/842712',
    'https://www.accuweather.com/en/lk/alupatgala/842710/weather-forecast/842710',
    'https://www.accuweather.com/en/lk/alupola/842709/weather-forecast/842709',
    'https://www.accuweather.com/en/lk/alupota/842708/weather-forecast/842708',
    'https://www.accuweather.com/en/lk/alutnuwara/842683/weather-forecast/842683',
    'https://www.accuweather.com/en/lk/amanawala/842654/weather-forecast/842654',
    'https://www.accuweather.com/en/lk/amarakonmulla/842650/weather-forecast/842650',
    'https://www.accuweather.com/en/lk/ambadeniya/842646/weather-forecast/842646',
    'https://www.accuweather.com/en/lk/ambagahakanda/842640/weather-forecast/842640',
    'https://www.accuweather.com/en/lk/ambagala/842630/weather-forecast/842630',
    'https://www.accuweather.com/en/lk/ambagasmulla/842626/weather-forecast/842626',
    'https://www.accuweather.com/en/lk/ambakumbura/842609/weather-forecast/842609',
    'https://www.accuweather.com/en/lk/ambalakanda/842606/weather-forecast/842606',
    'https://www.accuweather.com/en/lk/ambalanpitiya/842595/weather-forecast/842595',
    'https://www.accuweather.com/en/lk/ambalanyaya/842593/weather-forecast/842593',
    'https://www.accuweather.com/en/lk/ambamalla/842586/weather-forecast/842586',
    'https://www.accuweather.com/en/lk/ambanpitiya/842581/weather-forecast/842581',
    'https://www.accuweather.com/en/lk/ambatenna/842572/weather-forecast/842572',
    'https://www.accuweather.com/en/lk/ambawala/842568/weather-forecast/842568',
    'https://www.accuweather.com/en/lk/ambepussa/842562/weather-forecast/842562',
];
const sabaragamuUrls2 = [
    'https://www.accuweather.com/en/lk/ambulugala/842557/weather-forecast/842557',
    'https://www.accuweather.com/en/lk/ambuwakka/842556/weather-forecast/842556',
    'https://www.accuweather.com/en/lk/amitirigala/309436/weather-forecast/309436',
    'https://www.accuweather.com/en/lk/ammuduwa/842548/weather-forecast/842548',
    'https://www.accuweather.com/en/lk/ampagala/842547/weather-forecast/842547',
    'https://www.accuweather.com/en/lk/aranayaka/309437/weather-forecast/309437',
    'https://www.accuweather.com/en/lk/balangoda/309435/weather-forecast/309435',
    'https://www.accuweather.com/en/lk/belihul-oya/309438/weather-forecast/309438',
    'https://www.accuweather.com/en/lk/bulatkohupitiya/309439/weather-forecast/309439',
    'https://www.accuweather.com/en/lk/colombage-ara/309440/weather-forecast/309440',
    'https://www.accuweather.com/en/lk/dehiowita/309468/weather-forecast/309468',
    'https://www.accuweather.com/en/lk/deraniyagala/309441/weather-forecast/309441',
    'https://www.accuweather.com/en/lk/dewalegama/309442/weather-forecast/309442',
    'https://www.accuweather.com/en/lk/eheliyagoda/309466/weather-forecast/309466',
    'https://www.accuweather.com/en/lk/embilipitiya/309479/weather-forecast/309479',
    'https://www.accuweather.com/en/lk/galigomuwa/309467/weather-forecast/309467',
    'https://www.accuweather.com/en/lk/getahetta/309443/weather-forecast/309443',
    'https://www.accuweather.com/en/lk/godakewela/309444/weather-forecast/309444',
    'https://www.accuweather.com/en/lk/hemmatagama/309445/weather-forecast/309445',
    'https://www.accuweather.com/en/lk/hettimulla/309446/weather-forecast/309446',
    'https://www.accuweather.com/en/lk/hingula/309447/weather-forecast/309447',
    'https://www.accuweather.com/en/lk/kadugannawa/309448/weather-forecast/309448',
    'https://www.accuweather.com/en/lk/kahawatta/309475/weather-forecast/309475',
    'https://www.accuweather.com/en/lk/kalawana/309465/weather-forecast/309465',
    'https://www.accuweather.com/en/lk/kegalla/309434/weather-forecast/309434',
    'https://www.accuweather.com/en/lk/kiriella/309449/weather-forecast/309449',
    'https://www.accuweather.com/en/lk/kitulgala/309469/weather-forecast/309469',
    'https://www.accuweather.com/en/lk/kolonne/309450/weather-forecast/309450',
    'https://www.accuweather.com/en/lk/kuruwita/309472/weather-forecast/309472',
    'https://www.accuweather.com/en/lk/madampe/309476/weather-forecast/309476',
    'https://www.accuweather.com/en/lk/marapitiya/309452/weather-forecast/309452',
    'https://www.accuweather.com/en/lk/meramitipana/309433/weather-forecast/309433',
    'https://www.accuweather.com/en/lk/morontota/309451/weather-forecast/309451',
    'https://www.accuweather.com/en/lk/niwitigala/309453/weather-forecast/309453',
    'https://www.accuweather.com/en/lk/opanake/309454/weather-forecast/309454',
    'https://www.accuweather.com/en/lk/padalangala/309455/weather-forecast/309455',
    'https://www.accuweather.com/en/lk/pallebedda/309456/weather-forecast/309456',
    'https://www.accuweather.com/en/lk/parakaduwa/309457/weather-forecast/309457',
    'https://www.accuweather.com/en/lk/pelmadulla/309458/weather-forecast/309458',
    'https://www.accuweather.com/en/lk/pinnawala/309459/weather-forecast/309459',
    'https://www.accuweather.com/en/lk/pitagaladeniya/309460/weather-forecast/309460',
    'https://www.accuweather.com/en/lk/rakwana/309477/weather-forecast/309477',
    'https://www.accuweather.com/en/lk/rambukkana/309461/weather-forecast/309461',
    'https://www.accuweather.com/en/lk/ratnapura/309432/weather-forecast/309432',
    'https://www.accuweather.com/en/lk/ruwanwella/309474/weather-forecast/309474',
    'https://www.accuweather.com/en/lk/udawela/309462/weather-forecast/309462',
    'https://www.accuweather.com/en/lk/uggalkaltota/309478/weather-forecast/309478',
    'https://www.accuweather.com/en/lk/undugoda/309463/weather-forecast/309463',
    'https://www.accuweather.com/en/lk/ussapitiya/309464/weather-forecast/309464',
    'https://www.accuweather.com/en/lk/warakapola/309473/weather-forecast/309473',
    'https://www.accuweather.com/en/lk/yatiyantota/309471/weather-forecast/309471',
];

router.get('/sabaragamuwalocations1', async (req, res) => {

    const dataList = [];

    try {

        for(let url of sabaragamuUrls1){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Sabaragamuwa/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});

router.get('/sabaragamuwalocations2', async (req, res) => {

    const dataList = [];

    try {

        for(let url of sabaragamuUrls2){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Sabaragamuwa/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});






const sothernUrls1 = [
    'https://www.accuweather.com/en/lk/abakolawewa/842942/weather-forecast/842942',
    'https://www.accuweather.com/en/lk/abeyesekaragama/842938/weather-forecast/842938',
    'https://www.accuweather.com/en/lk/acharigama/842936/weather-forecast/842936',
    'https://www.accuweather.com/en/lk/acharigoda/842933/weather-forecast/842933',
    'https://www.accuweather.com/en/lk/addarawellana/842906/weather-forecast/842906',
    'https://www.accuweather.com/en/lk/agalaboda/842895/weather-forecast/842895',
    'https://www.accuweather.com/en/lk/agaliya/842886/weather-forecast/842886',
    'https://www.accuweather.com/en/lk/aggarahere/842878/weather-forecast/842878',
    'https://www.accuweather.com/en/lk/ahangama/309723/weather-forecast/309723',
    'https://www.accuweather.com/en/lk/ahangama-central/842875/weather-forecast/842875',
    'https://www.accuweather.com/en/lk/ahangama-east/842874/weather-forecast/842874',
    'https://www.accuweather.com/en/lk/ahangama-nakanda/842873/weather-forecast/842873',
    'https://www.accuweather.com/en/lk/ahangama-west/842872/weather-forecast/842872',
    'https://www.accuweather.com/en/lk/ahungalla/309732/weather-forecast/309732',
    'https://www.accuweather.com/en/lk/ahungalla-middaramulla/842864/weather-forecast/842864',
    'https://www.accuweather.com/en/lk/akadagoda/842858/weather-forecast/842858',
    'https://www.accuweather.com/en/lk/akmimana/309733/weather-forecast/309733',
    'https://www.accuweather.com/en/lk/akunadiwela/842838/weather-forecast/842838',
    'https://www.accuweather.com/en/lk/akurala/842837/weather-forecast/842837',
    'https://www.accuweather.com/en/lk/akuraladuwa/842836/weather-forecast/842836',
    'https://www.accuweather.com/en/lk/akuratiya/842828/weather-forecast/842828',
    'https://www.accuweather.com/en/lk/akuressa/309796/weather-forecast/309796',
    'https://www.accuweather.com/en/lk/akurugoda/842824/weather-forecast/842824',
    'https://www.accuweather.com/en/lk/alahenpita/842805/weather-forecast/842805',
    'https://www.accuweather.com/en/lk/ambalangoda/309726/weather-forecast/309726',
    'https://www.accuweather.com/en/lk/ambalantota/309728/weather-forecast/309728',
    'https://www.accuweather.com/en/lk/angunakolapelessa/309798/weather-forecast/309798',
    'https://www.accuweather.com/en/lk/baddegama/309797/weather-forecast/309797',
    'https://www.accuweather.com/en/lk/badungala/309724/weather-forecast/309724',
    'https://www.accuweather.com/en/lk/balapitiya/309780/weather-forecast/309780',
    'https://www.accuweather.com/en/lk/barawakumbuka/309734/weather-forecast/309734',
    'https://www.accuweather.com/en/lk/batapola/309735/weather-forecast/309735',
    'https://www.accuweather.com/en/lk/beliatta/309801/weather-forecast/309801',
    'https://www.accuweather.com/en/lk/bussa/309736/weather-forecast/309736',
    'https://www.accuweather.com/en/lk/denipitiya/309737/weather-forecast/309737',
    'https://www.accuweather.com/en/lk/deniyaya/309792/weather-forecast/309792',
    'https://www.accuweather.com/en/lk/devinuwara/309738/weather-forecast/309738',
    'https://www.accuweather.com/en/lk/deyiyandara/309739/weather-forecast/309739',
    'https://www.accuweather.com/en/lk/dikwella-south/309740/weather-forecast/309740',
    'https://www.accuweather.com/en/lk/dodanduwa/309783/weather-forecast/309783',
    'https://www.accuweather.com/en/lk/dondra-west/309741/weather-forecast/309741',
    'https://www.accuweather.com/en/lk/elpitiya/309725/weather-forecast/309725',
    'https://www.accuweather.com/en/lk/galle/309721/weather-forecast/309721',
    'https://www.accuweather.com/en/lk/gandara-west/309742/weather-forecast/309742',
    'https://www.accuweather.com/en/lk/ganegoda/309743/weather-forecast/309743',
    'https://www.accuweather.com/en/lk/getamanna-south/309744/weather-forecast/309744',
    'https://www.accuweather.com/en/lk/ginimellagaha-west/309745/weather-forecast/309745',
    'https://www.accuweather.com/en/lk/gintota/309746/weather-forecast/309746',
    'https://www.accuweather.com/en/lk/gonapinuwala-west/309747/weather-forecast/309747',
    'https://www.accuweather.com/en/lk/habaraduwa-central/309748/weather-forecast/309748',
];
const sothernUrls2 = [
    'https://www.accuweather.com/en/lk/hambantota/309727/weather-forecast/309727',
    'https://www.accuweather.com/en/lk/hikkaduwa/309778/weather-forecast/309778',
    'https://www.accuweather.com/en/lk/hiniduma/309791/weather-forecast/309791',
    'https://www.accuweather.com/en/lk/hungama/309749/weather-forecast/309749',
    'https://www.accuweather.com/en/lk/katuwana/309754/weather-forecast/309754',
    'https://www.accuweather.com/en/lk/kekanadura/309755/weather-forecast/309755',
    'https://www.accuweather.com/en/lk/kirama/309756/weather-forecast/309756',
    'https://www.accuweather.com/en/lk/kirinda/309795/weather-forecast/309795',
    'https://www.accuweather.com/en/lk/kosgoda/309757/weather-forecast/309757',
    'https://www.accuweather.com/en/lk/imaduwa/309800/weather-forecast/309800',
    'https://www.accuweather.com/en/lk/induruwa/309750/weather-forecast/309750',
    'https://www.accuweather.com/en/lk/kahaduwa/309751/weather-forecast/309751',
    'https://www.accuweather.com/en/lk/kahawa/309789/weather-forecast/309789',
    'https://www.accuweather.com/en/lk/kamburugamuwa/309752/weather-forecast/309752',
    'https://www.accuweather.com/en/lk/kamburupitiya/309786/weather-forecast/309786',
    'https://www.accuweather.com/en/lk/karandeniya/309753/weather-forecast/309753',
    'https://www.accuweather.com/en/lk/katuwana/309754/weather-forecast/309754',
    'https://www.accuweather.com/en/lk/kekanadura/309755/weather-forecast/309755',
    'https://www.accuweather.com/en/lk/kirama/309756/weather-forecast/309756',
    'https://www.accuweather.com/en/lk/kirinda/309795/weather-forecast/309795',
    'https://www.accuweather.com/en/lk/kosgoda/309757/weather-forecast/309757',
    'https://www.accuweather.com/en/lk/kotapola-north/309758/weather-forecast/309758',
    'https://www.accuweather.com/en/lk/kottagoda/309759/weather-forecast/309759',
    'https://www.accuweather.com/en/lk/makandura/309760/weather-forecast/309760',
    'https://www.accuweather.com/en/lk/matara/309731/weather-forecast/309731',
    'https://www.accuweather.com/en/lk/middeniya/309761/weather-forecast/309761',
    'https://www.accuweather.com/en/lk/mirissa-south/309803/weather-forecast/309803',
    'https://www.accuweather.com/en/lk/mitiyagoda/309762/weather-forecast/309762',
    'https://www.accuweather.com/en/lk/morawaka/309763/weather-forecast/309763',
    'https://www.accuweather.com/en/lk/nagoda/309782/weather-forecast/309782',
    'https://www.accuweather.com/en/lk/nonagegama/309764/weather-forecast/309764',
    'https://www.accuweather.com/en/lk/palatuwa/309765/weather-forecast/309765',
    'https://www.accuweather.com/en/lk/pitabeddara/309766/weather-forecast/309766',
    'https://www.accuweather.com/en/lk/pitigala/309793/weather-forecast/309793',
    'https://www.accuweather.com/en/lk/poddala/309767/weather-forecast/309767',
    'https://www.accuweather.com/en/lk/puhulwella/309768/weather-forecast/309768',
    'https://www.accuweather.com/en/lk/ranna/309781/weather-forecast/309781',
    'https://www.accuweather.com/en/lk/ratgama-hegoda/309769/weather-forecast/309769',
    'https://www.accuweather.com/en/lk/ratmale/309770/weather-forecast/309770',
    'https://www.accuweather.com/en/lk/talawa/309794/weather-forecast/309794',
    'https://www.accuweather.com/en/lk/tangalla/309729/weather-forecast/309729',
    'https://www.accuweather.com/en/lk/thihagoda/309771/weather-forecast/309771',
    'https://www.accuweather.com/en/lk/tissamaharama/309785/weather-forecast/309785',
    'https://www.accuweather.com/en/lk/udugama/309787/weather-forecast/309787',
    'https://www.accuweather.com/en/lk/unawatuna/309772/weather-forecast/309772',
    'https://www.accuweather.com/en/lk/uragasmanhandiya/309773/weather-forecast/309773',
    'https://www.accuweather.com/en/lk/urubokka/309774/weather-forecast/309774',
    'https://www.accuweather.com/en/lk/urugamuwa-east/309775/weather-forecast/309775',
    'https://www.accuweather.com/en/lk/walasgala/309776/weather-forecast/309776',
    'https://www.accuweather.com/en/lk/walasmulla/309779/weather-forecast/309779',
    'https://www.accuweather.com/en/lk/wanduramba/309777/weather-forecast/309777',
    'https://www.accuweather.com/en/lk/watugedara/309722/weather-forecast/309722',
    'https://www.accuweather.com/en/lk/weligama/309730/weather-forecast/309730',
    'https://www.accuweather.com/en/lk/weligatta/309790/weather-forecast/309790',
    'https://www.accuweather.com/en/lk/wiraketiya/309799/weather-forecast/309799',
];

router.get('/southernlocations1', async (req, res) => {

    const dataList = [];

    try {

        for(let url of sothernUrls1){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Southern/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});

router.get('/southernlocations2', async (req, res) => {

    const dataList = [];

    try {

        for(let url of sothernUrls2){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Southern/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});







const uva1UrlLinks1 = [
    'https://www.accuweather.com/en/lk/agampodigama/842885/weather-forecast/842885',
    'https://www.accuweather.com/en/lk/aggalaulpota/842879/weather-forecast/842879',
    'https://www.accuweather.com/en/lk/akurukaduwa/842823/weather-forecast/842823',
    'https://www.accuweather.com/en/lk/alakkangama/842798/weather-forecast/842798',
    'https://www.accuweather.com/en/lk/alakolagalagama/842792/weather-forecast/842792',
    'https://www.accuweather.com/en/lk/alakolawatta/842788/weather-forecast/842788',
    'https://www.accuweather.com/en/lk/alanmulla/842774/weather-forecast/842774',
    'https://www.accuweather.com/en/lk/alawatugoda/842758/weather-forecast/842758',
    'https://www.accuweather.com/en/lk/alpitiya/842725/weather-forecast/842725',
    'https://www.accuweather.com/en/lk/alubogolla/842723/weather-forecast/842723',
    'https://www.accuweather.com/en/lk/alugalge/842717/weather-forecast/842717',
    'https://www.accuweather.com/en/lk/alugolla/842716/weather-forecast/842716',
    'https://www.accuweather.com/en/lk/alukalawita/842713/weather-forecast/842713',
    'https://www.accuweather.com/en/lk/aluketiyawa/842711/weather-forecast/842711',
    'https://www.accuweather.com/en/lk/alupota/842707/weather-forecast/842707',
    'https://www.accuweather.com/en/lk/aluttarama/842678/weather-forecast/842678',
    'https://www.accuweather.com/en/lk/alutwela/842672/weather-forecast/842672',
    'https://www.accuweather.com/en/lk/alutwelagama/842671/weather-forecast/842671',
    'https://www.accuweather.com/en/lk/alutwewa/842669/weather-forecast/842669',
    'https://www.accuweather.com/en/lk/amarakongama/842651/weather-forecast/842651',
    'https://www.accuweather.com/en/lk/ambadandegama/842647/weather-forecast/842647',
    'https://www.accuweather.com/en/lk/ambagahakandura/842639/weather-forecast/842639',
    'https://www.accuweather.com/en/lk/ambagasdowa/310611/weather-forecast/310611',
    'https://www.accuweather.com/en/lk/ambagolla/842619/weather-forecast/842619',
    'https://www.accuweather.com/en/lk/ambagolle/842617/weather-forecast/842617',
    'https://www.accuweather.com/en/lk/ambalanda/842599/weather-forecast/842599',
    'https://www.accuweather.com/en/lk/ambamulla/842585/weather-forecast/842585',
    'https://www.accuweather.com/en/lk/ambanporuwa/842579/weather-forecast/842579',
    'https://www.accuweather.com/en/lk/ambatenna/842573/weather-forecast/842573',
    'https://www.accuweather.com/en/lk/ambawela/842566/weather-forecast/842566',
    'https://www.accuweather.com/en/lk/ampitiya/842533/weather-forecast/842533',
    'https://www.accuweather.com/en/lk/amunekandura/842526/weather-forecast/842526',
    'https://www.accuweather.com/en/lk/amunumulla/842515/weather-forecast/842515',
    'https://www.accuweather.com/en/lk/anda-ulpota/842462/weather-forecast/842462',
    'https://www.accuweather.com/en/lk/andanpahura/842473/weather-forecast/842473',
    'https://www.accuweather.com/en/lk/andawalagama/842459/weather-forecast/842459',
    'https://www.accuweather.com/en/lk/andawalayaya/842458/weather-forecast/842458',
    'https://www.accuweather.com/en/lk/andeniya/842456/weather-forecast/842456',
    'https://www.accuweather.com/en/lk/andiawela/842453/weather-forecast/842453',
    'https://www.accuweather.com/en/lk/angoda/842413/weather-forecast/842413',
    'https://www.accuweather.com/en/lk/angunakolapelessa/310634/weather-forecast/310634',
    'https://www.accuweather.com/en/lk/angunakolawewa/842399/weather-forecast/842399',
    'https://www.accuweather.com/en/lk/ankada/842384/weather-forecast/842384',
    'https://www.accuweather.com/en/lk/aralutalawa/842336/weather-forecast/842336',
    'https://www.accuweather.com/en/lk/araluwinna/842335/weather-forecast/842335',
    'https://www.accuweather.com/en/lk/aratumedilla/842308/weather-forecast/842308',
    'https://www.accuweather.com/en/lk/arawa/842306/weather-forecast/842306',
    'https://www.accuweather.com/en/lk/arawakumbura/842305/weather-forecast/842305',
    'https://www.accuweather.com/en/lk/arawatta/842304/weather-forecast/842304',
];
const uva1UrlLinks2 = [
    'https://www.accuweather.com/en/lk/asweddumegama/842253/weather-forecast/842253',
    'https://www.accuweather.com/en/lk/asweddumwelagama/842252/weather-forecast/842252',
    'https://www.accuweather.com/en/lk/atale/842245/weather-forecast/842245',
    'https://www.accuweather.com/en/lk/athimale-colony/842229/weather-forecast/842229',
    'https://www.accuweather.com/en/lk/attambagaskandura/842226/weather-forecast/842226',
    'https://www.accuweather.com/en/lk/attanagolla/842224/weather-forecast/842224',
    'https://www.accuweather.com/en/lk/ayiwela/842171/weather-forecast/842171',
    'https://www.accuweather.com/en/lk/badalagammana/842143/weather-forecast/842143',
    'https://www.accuweather.com/en/lk/badalkumbura/310612/weather-forecast/310612',
    'https://www.accuweather.com/en/lk/badulla/310610/weather-forecast/310610',
    'https://www.accuweather.com/en/lk/bandarawela/310649/weather-forecast/310649',
    'https://www.accuweather.com/en/lk/bibile/310644/weather-forecast/310644',
    'https://www.accuweather.com/en/lk/boralanda/310613/weather-forecast/310613',
    'https://www.accuweather.com/en/lk/buttala/310651/weather-forecast/310651',
    'https://www.accuweather.com/en/lk/dambagalla/310614/weather-forecast/310614',
    'https://www.accuweather.com/en/lk/demodara/310615/weather-forecast/310615',
    'https://www.accuweather.com/en/lk/diyatalawa/310616/weather-forecast/310616',
    'https://www.accuweather.com/en/lk/dombagahawela/310617/weather-forecast/310617',
    'https://www.accuweather.com/en/lk/ella/310640/weather-forecast/310640',
    'https://www.accuweather.com/en/lk/etiliwewa/310618/weather-forecast/310618',
    'https://www.accuweather.com/en/lk/ettampitiya/310619/weather-forecast/310619',
    'https://www.accuweather.com/en/lk/giranduwa/310620/weather-forecast/310620',
    'https://www.accuweather.com/en/lk/haldummulla/310639/weather-forecast/310639',
    'https://www.accuweather.com/en/lk/hali-ela/310642/weather-forecast/310642',
    'https://www.accuweather.com/en/lk/hambegamuwa/310632/weather-forecast/310632',
    'https://www.accuweather.com/en/lk/haputale/310635/weather-forecast/310635',
    'https://www.accuweather.com/en/lk/hulandawa/310647/weather-forecast/310647',
    'https://www.accuweather.com/en/lk/kandegedara/310621/weather-forecast/310621',
    'https://www.accuweather.com/en/lk/kataragama/310654/weather-forecast/310654',
    'https://www.accuweather.com/en/lk/kodayanna/310637/weather-forecast/310637',
    'https://www.accuweather.com/en/lk/koslanda/310622/weather-forecast/310622',
    'https://www.accuweather.com/en/lk/kuda-oya/310653/weather-forecast/310653',
    'https://www.accuweather.com/en/lk/lunugala/310645/weather-forecast/310645',
    'https://www.accuweather.com/en/lk/magandena/310646/weather-forecast/310646',
    'https://www.accuweather.com/en/lk/mahawelatota/310652/weather-forecast/310652',
    'https://www.accuweather.com/en/lk/mahiyangana/310623/weather-forecast/310623',
    'https://www.accuweather.com/en/lk/medagama/310624/weather-forecast/310624',
    'https://www.accuweather.com/en/lk/metigahatenna/310625/weather-forecast/310625',
    'https://www.accuweather.com/en/lk/monaragala/310626/weather-forecast/310626',
    'https://www.accuweather.com/en/lk/namunukula/310627/weather-forecast/310627',
    'https://www.accuweather.com/en/lk/okkampitiya-ihalagama/310628/weather-forecast/310628',
    'https://www.accuweather.com/en/lk/passara/310636/weather-forecast/310636',
    'https://www.accuweather.com/en/lk/pelwatta-udawela/310641/weather-forecast/310641',
    'https://www.accuweather.com/en/lk/sinuggala/310631/weather-forecast/310631',
    'https://www.accuweather.com/en/lk/siyambalanduwa/310630/weather-forecast/310630',
    'https://www.accuweather.com/en/lk/tanamalwila/310633/weather-forecast/310633',
    'https://www.accuweather.com/en/lk/telulla/310629/weather-forecast/310629',
    'https://www.accuweather.com/en/lk/wattegama/310650/weather-forecast/310650',
    'https://www.accuweather.com/en/lk/welanpela/310643/weather-forecast/310643',
    'https://www.accuweather.com/en/lk/welimada/310638/weather-forecast/310638',
    'https://www.accuweather.com/en/lk/wellawaya/310655/weather-forecast/310655',
];

router.get('/uvalocations1', async (req, res) => {

    const dataList = [];

    try {

        for(let url of uva1UrlLinks1){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Uva/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});

router.get('/uvalocations2', async (req, res) => {

    const dataList = [];

    try {

        for(let url of uva1UrlLinks2){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Uva/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});





const westernUrlLinks1 = [
    'https://www.accuweather.com/en/lk/adikarigoda/842903/weather-forecast/842903',
    'https://www.accuweather.com/en/lk/adikarimulla/842902/weather-forecast/842902',
    'https://www.accuweather.com/en/lk/adikkandiya/842900/weather-forecast/842900',
    'https://www.accuweather.com/en/lk/agalawatta/311471/weather-forecast/311471',
    'https://www.accuweather.com/en/lk/agalegedara/842888/weather-forecast/842888',
    'https://www.accuweather.com/en/lk/ahugammana/842867/weather-forecast/842867',
    'https://www.accuweather.com/en/lk/akaragama/842855/weather-forecast/842855',
    'https://www.accuweather.com/en/lk/akarangaha/842851/weather-forecast/842851',
    'https://www.accuweather.com/en/lk/akarawita/842850/weather-forecast/842850',
    'https://www.accuweather.com/en/lk/akkaragoda/842845/weather-forecast/842845',
    'https://www.accuweather.com/en/lk/akureliya/842826/weather-forecast/842826',
    'https://www.accuweather.com/en/lk/akurukalawita/842822/weather-forecast/842822',
    'https://www.accuweather.com/en/lk/akurumulla/842821/weather-forecast/842821',
    'https://www.accuweather.com/en/lk/alutgama/309784/weather-forecast/309784',
    'https://www.accuweather.com/en/lk/anguruwatota/311419/weather-forecast/311419',
    'https://www.accuweather.com/en/lk/attanagalla/311420/weather-forecast/311420',
    'https://www.accuweather.com/en/lk/aturugiriya/311421/weather-forecast/311421',
    'https://www.accuweather.com/en/lk/avissawella/311415/weather-forecast/311415',
    'https://www.accuweather.com/en/lk/badureliya/311422/weather-forecast/311422',
    'https://www.accuweather.com/en/lk/bandaragama/311423/weather-forecast/311423',
    'https://www.accuweather.com/en/lk/battaramulla/311424/weather-forecast/311424',
    'https://www.accuweather.com/en/lk/bemmulla/311425/weather-forecast/311425',
    'https://www.accuweather.com/en/lk/beruwala/311414/weather-forecast/311414',
    'https://www.accuweather.com/en/lk/biyagama/311426/weather-forecast/311426',
    'https://www.accuweather.com/en/lk/boralesgomuwa/311427/weather-forecast/311427',
    'https://www.accuweather.com/en/lk/buthpitiya/311428/weather-forecast/311428',
    'https://www.accuweather.com/en/lk/colombo/311399/weather-forecast/311399',
    'https://www.accuweather.com/en/lk/dalugama/311400/weather-forecast/311400',
    'https://www.accuweather.com/en/lk/dehiwala/311402/weather-forecast/311402',
    'https://www.accuweather.com/en/lk/delgoda/311429/weather-forecast/311429',
    'https://www.accuweather.com/en/lk/demanhandiya/311430/weather-forecast/311430',
    'https://www.accuweather.com/en/lk/divulapitiya/311476/weather-forecast/311476',
    'https://www.accuweather.com/en/lk/dodangoda/311431/weather-forecast/311431',
    'https://www.accuweather.com/en/lk/dompe/311432/weather-forecast/311432',
    'https://www.accuweather.com/en/lk/ekala/311433/weather-forecast/311433',
    'https://www.accuweather.com/en/lk/gampaha/311409/weather-forecast/311409',
    'https://www.accuweather.com/en/lk/ganemulla/311434/weather-forecast/311434',
    'https://www.accuweather.com/en/lk/giriulla/311435/weather-forecast/311435',
    'https://www.accuweather.com/en/lk/gonapola/311436/weather-forecast/311436',
    'https://www.accuweather.com/en/lk/gonawala/311437/weather-forecast/311437',
    'https://www.accuweather.com/en/lk/gowinna/311438/weather-forecast/311438',
    'https://www.accuweather.com/en/lk/hanwella/311479/weather-forecast/311479',
    'https://www.accuweather.com/en/lk/hendala/311483/weather-forecast/311483',
    'https://www.accuweather.com/en/lk/henegama/311439/weather-forecast/311439',
    'https://www.accuweather.com/en/lk/hettiwatta/311440/weather-forecast/311440',
    'https://www.accuweather.com/en/lk/hirana/311473/weather-forecast/311473',
    'https://www.accuweather.com/en/lk/homagama/311407/weather-forecast/311407',
    'https://www.accuweather.com/en/lk/horana/311416/weather-forecast/311416',
    'https://www.accuweather.com/en/lk/ingiriya/311481/weather-forecast/311481',
    'https://www.accuweather.com/en/lk/kadawata/311441/weather-forecast/311441',
    'https://www.accuweather.com/en/lk/ja-ela/311410/weather-forecast/311410',
    'https://www.accuweather.com/en/lk/kadawata/311441/weather-forecast/311441',
    'https://www.accuweather.com/en/lk/kaduwela/311442/weather-forecast/311442',
];
const western1UrlLinks = [
    'https://www.accuweather.com/en/lk/kaleliya/311443/weather-forecast/311443',
    'https://www.accuweather.com/en/lk/kalutara/311413/weather-forecast/311413',
    'https://www.accuweather.com/en/lk/kalutara-north/311470/weather-forecast/311470',
    'https://www.accuweather.com/en/lk/kandana/311408/weather-forecast/311408',
    'https://www.accuweather.com/en/lk/katunayaka/311406/weather-forecast/311406',
    'https://www.accuweather.com/en/lk/kehelwatta/311444/weather-forecast/311444',
    'https://www.accuweather.com/en/lk/kelaniya/311445/weather-forecast/311445',
    'https://www.accuweather.com/en/lk/kirillawala/311446/weather-forecast/311446',
    'https://www.accuweather.com/en/lk/kirindiwela/311478/weather-forecast/311478',
    'https://www.accuweather.com/en/lk/kochchikade/311482/weather-forecast/311482',
    'https://www.accuweather.com/en/lk/kolonnawa/311447/weather-forecast/311447',
    'https://www.accuweather.com/en/lk/kotikawatta/311418/weather-forecast/311418',
    'https://www.accuweather.com/en/lk/kotugoda/311448/weather-forecast/311448',
    'https://www.accuweather.com/en/lk/kuda-waskaduwa/311449/weather-forecast/311449',
    'https://www.accuweather.com/en/lk/maggona/311484/weather-forecast/311484',
    'https://www.accuweather.com/en/lk/mahagama-north/311450/weather-forecast/311450',
    'https://www.accuweather.com/en/lk/maharagama/311451/weather-forecast/311451',
    'https://www.accuweather.com/en/lk/makola/311452/weather-forecast/311452',
    'https://www.accuweather.com/en/lk/malwana/311453/weather-forecast/311453',
    'https://www.accuweather.com/en/lk/matugama/311417/weather-forecast/311417',
    'https://www.accuweather.com/en/lk/migahatenna/311454/weather-forecast/311454',
    'https://www.accuweather.com/en/lk/minuwangoda/311475/weather-forecast/311475',
    'https://www.accuweather.com/en/lk/mirigama/311469/weather-forecast/311469',
    'https://www.accuweather.com/en/lk/moratuwa/311405/weather-forecast/311405',
    'https://www.accuweather.com/en/lk/mount-lavinia/311485/weather-forecast/311485',
    'https://www.accuweather.com/en/lk/neboda/311455/weather-forecast/311455',
    'https://www.accuweather.com/en/lk/negombo/311404/weather-forecast/311404',
    'https://www.accuweather.com/en/lk/nittambuwa/311477/weather-forecast/311477',
    'https://www.accuweather.com/en/lk/nugegoda/311456/weather-forecast/311456',
    'https://www.accuweather.com/en/lk/padukka/311480/weather-forecast/311480',
    'https://www.accuweather.com/en/lk/paiyagala-south/311486/weather-forecast/311486',
    'https://www.accuweather.com/en/lk/pallewela/311457/weather-forecast/311457',
    'https://www.accuweather.com/en/lk/pamunugama/311458/weather-forecast/311458',
    'https://www.accuweather.com/en/lk/panadura/311411/weather-forecast/311411',
    'https://www.accuweather.com/en/lk/pannipitiya/311459/weather-forecast/311459',
    'https://www.accuweather.com/en/lk/polgasowita/311460/weather-forecast/311460',
    'https://www.accuweather.com/en/lk/pugoda/311461/weather-forecast/311461',
    'https://www.accuweather.com/en/lk/raddoluwa/311462/weather-forecast/311462',
    'https://www.accuweather.com/en/lk/ragama/311401/weather-forecast/311401',
    'https://www.accuweather.com/en/lk/siduwa/311463/weather-forecast/311463',
    'https://www.accuweather.com/en/lk/sri-jayewardenepura-kotte/311403/weather-forecast/311403',
    'https://www.accuweather.com/en/lk/udugampola/311464/weather-forecast/311464',
    'https://www.accuweather.com/en/lk/veyangoda/311474/weather-forecast/311474',
    'https://www.accuweather.com/en/lk/wadduwa/311412/weather-forecast/311412',
    'https://www.accuweather.com/en/lk/waga/311465/weather-forecast/311465',
    'https://www.accuweather.com/en/lk/wattala/311466/weather-forecast/311466',
    'https://www.accuweather.com/en/lk/weliweriya/311472/weather-forecast/311472',
    'https://www.accuweather.com/en/lk/yakwala/311467/weather-forecast/311467'
];

router.get('/westernlocations1', async (req, res) => {

    const dataList = [];

    try {

        for(let url of westernUrlLinks1){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Western/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});
router.get('/westernlocations2', async (req, res) => {

    const dataList = [];

    try {

        for(let url of western1UrlLinks){
           const response = await axios.get(url); //URL to be read from the page.
            const $ = cheerio.load(response.data); //Load HTML into a Cheerio API. (lazy loading)

            let location = $('body > div > div.basic-header > div.header-outer > div > a.header-city-link > h1').text().replace(/, Western/g, '');

            let currentWeather = {
                time: '',
                temp: '',
                realFell: '',
                status: '',
                extraData: [Object]
            }
            $('body > div.template-root > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > a.cur-con-weather-card.card-module.content-module.lbar-panel').each( (item, el) => {
                let dtime = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > p[class="cur-con-weather-card__subtitle"]').text().replace(/\n|\t/g, "");
                let dtemp = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();

                let dRealFeel = $(el).find('div[class="cur-con-weather-card__body"] > div[class="cur-con-weather-card__panel"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text().replace(/\n|\t/g, "");

                let dstatus = $(el).find('div[class="spaced-content"] > span[class="phrase"]').text();

                let ddatas = [];
                $('div[class="cur-con-weather-card__panel details-container"] > div[class="spaced-content detail"]').each( (item, el) => {
                    let title = $(el).find('span[class="label"]').text();
                    let data = $(el).find('span[class="value"]').text();
                    ddatas.push({
                        title,
                        data
                    });
                })

                currentWeather.time = dtime;
                currentWeather.temp = dtemp;
                currentWeather.realFell = dRealFeel;
                currentWeather.status = dstatus;
                currentWeather.extraData  = ddatas;
            })

            let airQuality = {
                date: '',
                status: '',
                description: ''
            }   
            $('div[class="air-quality-card content-module"] > div[class="air-quality-content"]').each( (item, el) => {
                let dtime = $(el).find('div[class="date-wrapper"] > p[class="date"]').text();
                let dstatus = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="category-text"]').text();
                let ddescription = $(el).find('div[class="content-wrapper"] > div[class="air-quality-data-wrapper"] > h3[class="air-quality-data"] > p[class="statement"]').text().replace(/\n|\t/g, "");
                airQuality.date = dtime;
                airQuality.status = dstatus;
                airQuality.description = ddescription;
            })

            let forecast = [];
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(6)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(7)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            })
            $('body > div > div.two-column-page-content > div.page-column-1 > div.page-content.content-module > div:nth-child(8)').each( (item, el) => {
                let title = $(el).find('a > div[class="card-header"] > h2').text();
                let temp = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="temp"]').text();
                let realfeel = $(el).find('a > div[class="card-content"] > div[class="forecast-container"] > div[class="temp-container"] > div[class="real-feel"]').text();
                let description = $(el).find('a > div[class="card-content"] > div[class="phrase"]').text();
                let date = $(el).find('a > div[class="card-header"] > span').text();
                forecast.push({
                    title,
                    temp,
                    realfeel,
                    description,
                    date
                });
            }) 

            dataList.push({
                location,
                currentWeather,
                airQuality,
                forecast
            });
        }

        await res.status(200).json(dataList);

    } catch (error) {
        console.log(error);
    }

});

module.exports = router;