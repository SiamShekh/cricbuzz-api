const cheerio = require('cheerio');

const player_identity_controller = async (req, res) => {
    const playerId = req.query.playerId;
    const fetchHtml = await fetch(`https://www.cricbuzz.com/profiles/${playerId}/a`);
    const body = await fetchHtml.text();
    const $ = cheerio.load(body);

    const name = $("div.cb-player-name-wrap > h1.cb-font-40").text().trim();
    const player_image = $("div.cb-col.cb-col-20.cb-col-rt > img").attr("src");
    const country = $("div.cb-player-name-wrap > h3.cb-font-18.text-gray").text().trim();
    const player_info = $("div.cb-col.cb-col-100.cb-bg-grey > div.cb-col.cb-col-33.text-black > div.cb-hm-rght");
    const born = player_info.find(".cb-col.cb-col-60").eq(0).text().trim();
    const birth_place = player_info.find(".cb-col.cb-col-60").eq(1).text().trim();
    const height = player_info.find(".cb-col.cb-col-60").eq(2).text().trim();
    const role = player_info.find(".cb-col.cb-col-60").eq(3).text().trim();
    const batting_style = player_info.find(".cb-col.cb-col-60").eq(4).text().trim();
    const bowling_style = player_info.find(".cb-col.cb-col-60").eq(5).text().trim();
    const team = player_info.find(".cb-col.cb-col-60").eq(6).text().trim();

   
   
    const data = {
        id: playerId,
        name,
        img: player_image,
        country,
        born,
        birth_place,
        height,
        role,
        batting_style,
        bowling_style,
        team,
    }

    return res.send({
        status: false,
        msg: 'player data retrive',
        data: data
    })
};

module.exports = player_identity_controller;