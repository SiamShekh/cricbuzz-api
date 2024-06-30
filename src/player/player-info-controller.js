const cheerio = require('cheerio');

const player_info_controller = async (req, res) => {
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

    const batting_test_rank = player_info.find(".cb-col.cb-col-25.cb-plyr-rank").eq(4).text().trim();
    const batting_odi_rank = player_info.find(".cb-col.cb-col-25.cb-plyr-rank").eq(5).text().trim();
    const batting_t20_rank = player_info.find(".cb-col.cb-col-25.cb-plyr-rank").eq(6).text().trim();

    const bowl_test_rank = player_info.find(".cb-col.cb-col-25.cb-plyr-rank").eq(8).text().trim();
    const bowl_odi_rank = player_info.find(".cb-col.cb-col-25.cb-plyr-rank").eq(9).text().trim();
    const bowl_t20_rank = player_info.find(".cb-col.cb-col-25.cb-plyr-rank").eq(10).text().trim();
    const profile = $(".cb-player-bio").eq(1).text().trim();

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
        player: {
            id: playerId,
            name: name,
            img: player_image,
            country: country,
            born: born,
            birth_place: birth_place,
            height: height,
            role: role,
            batting_style: batting_style,
            bowling_style: bowling_style,
        },
        ranks: {
            bat: {
                test: batting_test_rank,
                odi: batting_odi_rank,
                t20: batting_t20_rank
            },
            bowl: {
                test: bowl_test_rank,
                odi: bowl_odi_rank,
                t20: bowl_t20_rank
            }
        },
        teams: team,
        career: [
            batting_array,
            bowling_array
        ],
        profile: profile
    }

    return res.send({
        status: true,
        msg: 'player data retrive',
        data: data
    })
};

module.exports = player_info_controller;