require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const weatherRoutes = require('./routes/weatherData');
const planetRoutes = require('./routes/planets');
const locationRoutes = require('./routes/weatherlocations');
const stormRoutes = require('./routes/stormRoutes');
const sunRoutes = require('./routes/sunData');
const moonRoutes = require('./routes/moonData');
const eclipsesRoutes = require('./routes/eclipses');
const seasonsRoutes = require('./routes/seasons');
const allergyRoutes = require('./routes/alleryTracker');
const airQualityRoutes = require('./routes/airQuality');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/planets', planetRoutes);
app.use('/api/v1/locations', locationRoutes);
app.use('/api/v1/storms', stormRoutes);
app.use('/api/v1/sun', sunRoutes);
app.use('/api/v1/moon', moonRoutes);
app.use('/api/v1/eclipses', eclipsesRoutes);
app.use('/api/v1/seasons', seasonsRoutes);
app.use('/api/v1/allergies', allergyRoutes);
app.use('/api/v1/airquality', airQualityRoutes);

const port = process.env.PORT || 4000;      
//     .then( () => {
//         console.log('Database connected successfully');
//     })
//     .catch( (error) => {
//         console.log(error);
//     });

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});