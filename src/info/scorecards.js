const cheerio = require('cheerio');

const scorecards = async (req, res) => {
    const matchId = req.query.matchId;
    const fetchHtml = await fetch(`https://www.cricbuzz.com/live-cricket-scorecard/${matchId}/a`);
    const body = await fetchHtml.text();
    const $ = cheerio.load(body);
    const title = $('h1.cb-nav-hdr').text();

    const match_info = $('div.cb-nav-subhdr');

    const series_id_Href = match_info.find('a').attr('href') || "/cricket-series/80629/south-africa-women-tour-of-india-2024";
    const seriesIdPart = series_id_Href.split("cricket-series/")[1];
    const series_id = seriesIdPart.split("/")[0];

    const match_info_text = $('div.cb-nav-subhdr').text();
    const seriesName = match_info_text.split("Series:  ")[1].split(" Venue:")[0];
    const venu = match_info_text.split("Series:  ")[1].split(" Venue: ")[1].split("Date & Time: ")[0];
    const time = match_info_text.split("Series:  ")[1].split(" Venue: ")[1].split("Date & Time: ")[1];

    const infos = $('div.cb-scrd-lft-col');

    // const inning = {
    //     team1: {
    //         batter: [{

    //         }],
    //         bowler: [{

    //         }]
    //     },
    //     team2: {
    //         batter: [{

    //         }],
    //         bowler: [{

    //         }]
    //     },
    // };

    const innings1 = $(infos).find('div > div#innings_1');
    //div#innings_1 > div.cb-ltst-wgt-hdr
    const innings1_batting = [];
    const innings1_fall_of_wickets = [];
    const innings1_wickets = [];

    $(innings1).children().each(function (e, ele) {
        if (e === 0) {
            const play = $(this).find('div.cb-scrd-itms');
            $(play).each(function (i, ele) {
                const playerName = $(this).find("div.cb-col.cb-col-25 > a").text().trim();
                const playerNameHref = $(this).find("div.cb-col.cb-col-25 > a").attr('href') || '/profiles/1427578/zakir-patel';

                const PlayerIdPart = playerNameHref.split("profiles/")[1];
                const Player_id = PlayerIdPart.split("/")[0];

                const PlayerWickets = $(this).find("div.cb-col.cb-col-33>span").text().trim();
                const runs = $(this).find('div.cb-col.cb-col-8.text-right').eq(0).text().trim();
                const bowl = $(this).find('div.cb-col.cb-col-8.text-right').eq(1).text().trim();
                const four = $(this).find('div.cb-col.cb-col-8.text-right').eq(2).text().trim();
                const six = $(this).find('div.cb-col.cb-col-8.text-right').eq(3).text().trim();
                const strike_rate = $(this).find('div.cb-col.cb-col-8.text-right').eq(4).text().trim();

                // console.log(PlayerWickets);

                if (playerName) {
                    innings1_batting.push({
                        playerName,
                        Player_id,
                        PlayerWickets,
                        runs,
                        bowl,
                        four,
                        six,
                        strike_rate
                    })
                }

            });
        } else if (e === 2) {
            const fall_of_wickets = $(this);
            $(fall_of_wickets).children().each(function () {
                const player = $(this).find("span > a").text();

                const playerNameHref = $(this).find("span > a").attr('href') || '/profiles/1427578/zakir-patel';
                const PlayerIdPart = playerNameHref.split("profiles/")[1];
                const player_id = PlayerIdPart.split("/")[0];

                const runs = $(this).text().split("(")[0].trim();
                const bowl = $(this).text().split(",")[1].split(")")[0].trim();
                innings1_fall_of_wickets.push({ player, player_id, runs, bowl })
            })
        } else if (e === 3) {
            const Bowler = $(this);
            $(Bowler).children().each(function () {
                const BowlerItem = $(this);
                $(BowlerItem).each(function () {
                    const Name = $(this).find("a.cb-text-link").text();

                    const playerNameHref = $(this).find("a.cb-text-link").attr('href') || '/profiles/1427578/zakir-patel';
                    const PlayerIdPart = playerNameHref.split("profiles/")[1];
                    const PlayerId = PlayerIdPart.split("/")[0];

                    const Over = $(this).find("div.cb-col.cb-col-8.text-right").eq(0).text();
                    const Maden = $(this).find("div.cb-col.cb-col-8.text-right").eq(1).text();
                    const Run = $(this).find("div.cb-col.cb-col-10.text-right").eq(0).text();
                    const Wickets = $(this).find("div.cb-col.cb-col-8.text-right").eq(2).text();
                    const NoBowl = $(this).find("div.cb-col.cb-col-8.text-right").eq(3).text();
                    const Wide = $(this).find("div.cb-col.cb-col-8.text-right").eq(4).text();
                    const Eco = $(this).find("div.cb-col.cb-col-10.text-right").eq(1).text();

                    if (Name) {
                        innings1_wickets.push({
                            Name,
                            PlayerId,
                            Over,
                            Maden,
                            Run,
                            Wickets,
                            NoBowl,
                            Wide,
                            Eco
                        })
                    }
                })
            })
        }
    });

    const innings2 = $(infos).find('div > div#innings_2');
    //div#innings_1 > div.cb-ltst-wgt-hdr
    const innings2_batting = [];
    const innings2_fall_of_wickets = [];
    const innings2_wickets = [];

    $(innings2).children().each(function (e, ele) {
        if (e === 0) {
            const play = $(this).find('div.cb-scrd-itms');
            $(play).each(function (i, ele) {
                const playerName = $(this).find("div.cb-col.cb-col-25 > a").text().trim();
                const playerNameHref = $(this).find("div.cb-col.cb-col-25 > a").attr('href') || '/profiles/1427578/zakir-patel';

                const PlayerIdPart = playerNameHref.split("profiles/")[1];
                const Player_id = PlayerIdPart.split("/")[0];

                const PlayerWickets = $(this).find("div.cb-col.cb-col-33>span").text().trim();
                const runs = $(this).find('div.cb-col.cb-col-8.text-right').eq(0).text().trim();
                const bowl = $(this).find('div.cb-col.cb-col-8.text-right').eq(1).text().trim();
                const four = $(this).find('div.cb-col.cb-col-8.text-right').eq(2).text().trim();
                const six = $(this).find('div.cb-col.cb-col-8.text-right').eq(3).text().trim();
                const strike_rate = $(this).find('div.cb-col.cb-col-8.text-right').eq(4).text().trim();

                // console.log(PlayerWickets);

                if (playerName) {
                    innings2_batting.push({
                        playerName,
                        Player_id,
                        PlayerWickets,
                        runs,
                        bowl,
                        four,
                        six,
                        strike_rate
                    })
                }

            });
        } else if (e === 2) {
            const fall_of_wickets = $(this);
            $(fall_of_wickets).children().each(function () {
                const player = $(this).find("span > a").text();

                const playerNameHref = $(this).find("span > a").attr('href') || '/profiles/1427578/zakir-patel';
                const PlayerIdPart = playerNameHref.split("profiles/")[1];
                const player_id = PlayerIdPart.split("/")[0];

                const runs = $(this).text().split("(")[0].trim();
                const bowl = $(this).text().split(",")[1].split(")")[0].trim();
                innings2_fall_of_wickets.push({ player, player_id, runs, bowl })
            })
        } else if (e === 3) {
            const Bowler = $(this);
            $(Bowler).children().each(function () {
                const BowlerItem = $(this);
                $(BowlerItem).each(function () {
                    const Name = $(this).find("a.cb-text-link").text();

                    const playerNameHref = $(this).find("a.cb-text-link").attr('href') || '/profiles/1427578/zakir-patel';
                    const PlayerIdPart = playerNameHref.split("profiles/")[1];
                    const PlayerId = PlayerIdPart.split("/")[0];

                    const Over = $(this).find("div.cb-col.cb-col-8.text-right").eq(0).text();
                    const Maden = $(this).find("div.cb-col.cb-col-8.text-right").eq(1).text();
                    const Run = $(this).find("div.cb-col.cb-col-10.text-right").eq(0).text();
                    const Wickets = $(this).find("div.cb-col.cb-col-8.text-right").eq(2).text();
                    const NoBowl = $(this).find("div.cb-col.cb-col-8.text-right").eq(3).text();
                    const Wide = $(this).find("div.cb-col.cb-col-8.text-right").eq(4).text();
                    const Eco = $(this).find("div.cb-col.cb-col-10.text-right").eq(1).text();

                    if (Name) {
                        innings2_wickets.push({
                            Name,
                            PlayerId,
                            Over,
                            Maden,
                            Run,
                            Wickets,
                            NoBowl,
                            Wide,
                            Eco
                        })
                    }
                })
            })
        }
    });

    res.send({
        match: {
            title,
            venu,
            time
        },
        series: {
            seriesName,
            series_id
        },
        innings: [
            {
                innings_1: {
                    batting: innings1_batting,
                    fall_of_wickets: innings1_fall_of_wickets,
                    wickets: innings1_wickets
                },
                innings_2: {
                    batting: innings2_batting,
                    fall_of_wickets: innings2_fall_of_wickets,
                    wickets: innings2_wickets
                }
            }
        ]
    });
};

module.exports = scorecards;