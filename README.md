
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
https://cricbuzzs.vercel.app/api/v1/match/live
```

#### Get Recent Matches

```
https://cricbuzzs.vercel.app/api/v1/match/recent
```

#### Get Upcoming Matches

```
https://cricbuzzs.vercel.app/api/v1/match/upcoming
```

### Match Info

#### Get Match Scorecards

```
https://cricbuzzs.vercel.app/api/v1/info/score?matchId=97050
```

#### Get Match Squads

```
https://cricbuzzs.vercel.app/api/v1/info/squad?matchId=97050
```

#### Get Point Table

```
https://cricbuzzs.vercel.app/api/v1/info/point?seriesId=7607
```

### Player

#### Get Player Info

```
https://cricbuzzs.vercel.app/api/v1/info/player?playerId=1413
```

#### Get Player Identity

```
https://cricbuzzs.vercel.app/api/v1/info/player/identity?playerId=9647
```

#### Get Player Batting Stats

```
https://cricbuzzs.vercel.app/api/v1/info/player/batting?playerId=9647
```

#### Get Player Bowling Stats

```
https://cricbuzzs.vercel.app/api/v1/info/player/bowling?playerId=9647
```

