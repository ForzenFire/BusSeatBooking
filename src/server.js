const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const routeRoutes = require('./controller/api/route');
const driverRoutes = require('./controller/api/driver');
const busRoutes = require('./controller/api/bus');
const conductorRoutes = require('./controller/api/conductor');
const busScheduleROutes = require('./controller/api/busSchedule');

app.use('/api/routes', routeRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/schedule', busScheduleROutes);
app.use('/api/conductor', conductorRoutes);

app.get('/', (req, res) => {
    res.send('Welcome! Server is running');
});

// const mongoUrl = process.env.MONGO_URL;
// if(!mongoUrl){
//     console.log('Mongo URL is not defined in env variables')
//     process.exit(1);
// }
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Mongo DB Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on http://localhost:5000'));