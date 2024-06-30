const express = require('express');
const cors = require('cors');
const upcoming_match_controller = require('./src/upcoming-match-controller');
const recent_match_controller = require('./src/recent-match-controller');
const live_match_controller = require('./src/live-match-controller');
const scorecards = require('./src/info/scorecards');
const squad_controller = require('./src/info/squad');
const player_info_controller = require('./src/player/player-info-controller');
const player_identity_controller = require('./src/player/player-identity-controller');
const player_batting_controller = require('./src/player/player-batting-controller');
const player_bowling_controller = require('./src/player/player-bowling-controller');
const points_controller = require('./src/info/points');
const app = express();



app.use(express.json());
app.use(cors());

app.get('/', async(req, res)=> {
    res.send({
        status: true,
        msg: 'server is running',
        data: []
    })
})

app.get('/api/v1/match/upcoming', upcoming_match_controller);
app.get('/api/v1/match/recent', recent_match_controller);
app.get('/api/v1/match/live', live_match_controller);
app.get('/api/v1/info/score', scorecards);
app.get('/api/v1/info/squad', squad_controller);
app.get('/api/v1/info/player', player_info_controller);
app.get('/api/v1/info/player/identity', player_identity_controller);
app.get('/api/v1/info/player/batting', player_batting_controller);
app.get('/api/v1/info/player/bowling', player_bowling_controller);
app.get('/api/v1/info/point', points_controller);

app.listen(3000, () => {
    console.log(`SERVER RUNNING AT 3000`);
})