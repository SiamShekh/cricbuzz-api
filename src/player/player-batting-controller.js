const cheerio = require('cheerio');

const player_batting_controller = async (req, res) => {
    const playerId = req.query.playerId;
    const fetchHtml = await fetch(`https://www.cricbuzz.com/profiles/${playerId}/a`);
    const body = await fetchHtml.text();
    const $ = cheerio.load(body);

    const name = $("div.cb-player-name-wrap > h1.cb-font-40").text().trim();

    const batting_career = $("tbody").eq(0);
    const batting_array = [];
    $(batting_career).children().each(function () {
        const formet = $(this).find(".cb-col-8").eq(0).text().trim();
        const match = $(this).find(".text-right").eq(0).text().trim();
        const innings = $(this).find(".text-right").eq(1).text().trim();
        const no_bowl = $(this).find(".text-right").eq(2).text().trim();
        const runs = $(this).find(".text-right").eq(3).text().trim();
        const high_runs = $(this).find(".text-right").eq(4).text().trim();
        const avarage = $(this).find(".text-right").eq(5).text().trim();
        const balls_faced = $(this).find(".text-right").eq(6).text().trim();
        const strike_rate = $(this).find(".text-right").eq(7).text().trim();
        const R100 = $(this).find(".text-right").eq(8).text().trim();
        const R200 = $(this).find(".text-right").eq(9).text().trim();
        const R50 = $(this).find(".text-right").eq(10).text().trim();
        const fours = $(this).find(".text-right").eq(11).text().trim();
        const six = $(this).find(".text-right").eq(12).text().trim();
        // console.log($(this).text()+"\n");
        if (formet) {
            batting_array.push({
                formet,
                match,
                innings,
                no_bowl,
                runs,
                high_runs,
                avarage,
                balls_faced,
                strike_rate,
                R100,
                R200,
                R50,
                fours,
                six
            })
        }
    });


    const data = {
        id: playerId,
        name,
        batting_array
    }

    return res.send({
        status: true,
        msg: 'player data retrive',
        data: data
    })
};

module.exports = player_batting_controller;