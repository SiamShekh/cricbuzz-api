
## Project Structure

```
Cricbuzz API
├── node_modules
├── src
│   └── index.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── vercel.json
```

## API Endpoints

### Match Schedule

#### Get Live Matches

```
GET /api/v1/match/live
```

#### Get Recent Matches

```
GET /api/v1/match/recent
```

#### Get Upcoming Matches

```
GET /api/v1/match/upcoming
```

### Match Info

#### Get Match Scorecards

```
GET /api/v1/info/score?matchId=97050
```

#### Get Match Squads

```
GET /api/v1/info/squad?matchId=97050
```

#### Get Point Table

```
GET /api/v1/info/point?seriesId=7607
```

### Player

#### Get Player Info

```
GET /api/v1/info/player?playerId=1413
```

#### Get Player Identity

```
GET /api/v1/info/player/identity?playerId=9647
```

#### Get Player Batting Stats

```
GET /api/v1/info/player/batting?playerId=9647
```

#### Get Player Bowling Stats

```
GET /api/v1/info/player/bowling?playerId=9647
```

