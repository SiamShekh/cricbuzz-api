const cheerio = require('cheerio');

const scorecards = async (req, res) => {
    const matchId = req.query.matchId;
    const fetchHtml = await fetch(`https://www.cricbuzz.com/${matchId}`);
    const body = await fetchHtml.text();
    const $ = cheerio.load(body);
    const title = $('div>cb-team-lft-item > h1').text();
    console.log(title);

    res.send(body);
};

module.exports = scorecards;