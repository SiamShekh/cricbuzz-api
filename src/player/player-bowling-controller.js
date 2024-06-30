const cheerio = require('cheerio');

const player_bowling_controller = async (req, res) => {
    const playerId = req.query.playerId;
    const fetchHtml = await fetch(`https://www.cricbuzz.com/profiles/${playerId}/a`);
    const body = await fetchHtml.text();
    const $ = cheerio.load(body);

    const name = $("div.cb-player-name-wrap > h1.cb-font-40").text().trim();
    
    const bowling_career = $("tbody").eq(1);
    const bowling_array = [];
    $(bowling_career).children().each(function () {
        const formet = $(this).find(".cb-col-8").eq(0).text().trim();
        const match = $(this).find(".text-right").eq(0).text().trim();
        const innings = $(this).find(".text-right").eq(1).text().trim();
        const bowl = $(this).find(".text-right").eq(2).text().trim();
        const runs = $(this).find(".text-right").eq(3).text().trim();
        const wickets = $(this).find(".text-right").eq(4).text().trim();
        const best_bowling_innings = $(this).find(".text-right").eq(5).text().trim();
        const best_bowling_matchs = $(this).find(".text-right").eq(6).text().trim();
        const econ = $(this).find(".text-right").eq(7).text().trim();
        const avg = $(this).find(".text-right").eq(8).text().trim();
        const strike = $(this).find(".text-right").eq(9).text().trim();
        const W5 = $(this).find(".text-right").eq(10).text().trim();
        const W10 = $(this).find(".text-right").eq(11).text().trim();

        // console.log($(this).text()+"\n");
        if (formet) {
            bowling_array.push({
                formet,
                match,
                innings,
                bowl,
                runs,
                wickets,
                best_bowling_innings,
                best_bowling_matchs,
                econ,
                avg,
                strike,
                W5,
                W10,
            })
        }      
    });
   
    const data = {
       id: playerId,
       name,
       bowling_array
    }

    return res.send({
        status: true,
        msg: 'player data retrive',
        data: data
    })
};

module.exports = player_bowling_controller;