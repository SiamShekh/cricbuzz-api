const express = require('express');
const cors = require('cors');
const upcoming_match_controller = require('./src/upcoming-match-controller');
const recent_match_controller = require('./src/recent-match-controller');
const app = express();



app.use(express.json());
app.use(cors());

app.get('/api/v1/match/upcoming', upcoming_match_controller);
app.get('/api/v1/match/recent', recent_match_controller);

app.listen(3000, () => {
    console.log(`SERVER RUNNING AT 3000`);
})