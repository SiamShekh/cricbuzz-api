const cheerio = require('cheerio');

const scorecards = async (req, res) => {
    const matchId = req.query.matchId;
    const fetchHtml = await fetch(`https://www.cricbuzz.com/live-cricket-scorecard/${matchId}/a`);
    const body = await fetchHtml.text();
    const $ = cheerio.load(body);

    const noData = $(".cb-scrcrd-status").text().trim();
    if (noData.includes('The scorecard will appear once the match starts.')) {
        return res.send({
            status: false,
            msg: noData,
            data: {}
        })
    } else {
        const title = $('h1.cb-nav-hdr').text().trim();

        const match_info = $('div.cb-nav-subhdr');

        const series_id_Href = match_info.find('a').attr('href') || "/cricket-series/80629/south-africa-women-tour-of-india-2024";
        const seriesIdPart = series_id_Href.split("cricket-series/")[1];
        const series_id = seriesIdPart.split("/")[0];

        const match_info_text = $('div.cb-nav-subhdr').text().trim();
        const seriesName = match_info_text.split("Series:  ")[1].split(" Venue:")[0];
        const venu = match_info_text.split("Series:  ")[1].split(" Venue: ")[1].split("Date & Time: ")[0];
        const time = match_info_text.split("Series:  ")[1].split(" Venue: ")[1].split("Date & Time: ")[1];

        const infos = $('div.cb-scrd-lft-col');

        const innings1 = $(infos).find('div > div#innings_1');
        //div#innings_1 > div.cb-ltst-wgt-hdr
        const innings1_batting = [];
        const innings1_fall_of_wickets = [];
        const innings1_wickets = [];

        $(innings1).children().each(function (e, ele) {
            if (e === 0) {
                const play = $(this).find('div.cb-scrd-itms');
                $(play).each(function (i, ele) {
                    const playerName = $(this).find("div.cb-col.cb-col-25 > a").text().trim().trim();
                    const playerNameHref = $(this).find("div.cb-col.cb-col-25 > a").attr('href') || '/profiles/1427578/zakir-patel';

                    const PlayerIdPart = playerNameHref.split("profiles/")[1];
                    const Player_id = PlayerIdPart.split("/")[0];

                    const PlayerWickets = $(this).find("div.cb-col.cb-col-33>span").text().trim().trim();
                    const runs = $(this).find('div.cb-col.cb-col-8.text-right').eq(0).text().trim().trim();
                    const bowl = $(this).find('div.cb-col.cb-col-8.text-right').eq(1).text().trim().trim();
                    const four = $(this).find('div.cb-col.cb-col-8.text-right').eq(2).text().trim().trim();
                    const six = $(this).find('div.cb-col.cb-col-8.text-right').eq(3).text().trim().trim();
                    const strike_rate = $(this).find('div.cb-col.cb-col-8.text-right').eq(4).text().trim().trim();

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
                    const player = $(this).find("span > a").text().trim();

                    const playerNameHref = $(this).find("span > a").attr('href') || '/profiles/1427578/zakir-patel';
                    const PlayerIdPart = playerNameHref.split("profiles/")[1];
                    const player_id = PlayerIdPart.split("/")[0];

                    const runs = $(this).text().trim().split("(")[0].trim();
                    const bowl = $(this).text().trim().split(",")[1].split(")")[0].trim();
                    innings1_fall_of_wickets.push({ player, player_id, runs, bowl })
                })
            } else if (e === 3) {
                const Bowler = $(this);
                $(Bowler).children().each(function () {
                    const BowlerItem = $(this);
                    $(BowlerItem).each(function () {
                        const Name = $(this).find("a.cb-text-link").text().trim();

                        const playerNameHref = $(this).find("a.cb-text-link").attr('href') || '/profiles/1427578/zakir-patel';
                        const PlayerIdPart = playerNameHref.split("profiles/")[1];
                        const PlayerId = PlayerIdPart.split("/")[0];

                        const Over = $(this).find("div.cb-col.cb-col-8.text-right").eq(0).text().trim();
                        const Maden = $(this).find("div.cb-col.cb-col-8.text-right").eq(1).text().trim();
                        const Run = $(this).find("div.cb-col.cb-col-10.text-right").eq(0).text().trim();
                        const Wickets = $(this).find("div.cb-col.cb-col-8.text-right").eq(2).text().trim();
                        const NoBowl = $(this).find("div.cb-col.cb-col-8.text-right").eq(3).text().trim();
                        const Wide = $(this).find("div.cb-col.cb-col-8.text-right").eq(4).text().trim();
                        const Eco = $(this).find("div.cb-col.cb-col-10.text-right").eq(1).text().trim();

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
                    const playerName = $(this).find("div.cb-col.cb-col-25 > a").text().trim().trim();
                    const playerNameHref = $(this).find("div.cb-col.cb-col-25 > a").attr('href') || '/profiles/1427578/zakir-patel';

                    const PlayerIdPart = playerNameHref.split("profiles/")[1];
                    const Player_id = PlayerIdPart.split("/")[0];

                    const PlayerWickets = $(this).find("div.cb-col.cb-col-33>span").text().trim().trim();
                    const runs = $(this).find('div.cb-col.cb-col-8.text-right').eq(0).text().trim().trim();
                    const bowl = $(this).find('div.cb-col.cb-col-8.text-right').eq(1).text().trim().trim();
                    const four = $(this).find('div.cb-col.cb-col-8.text-right').eq(2).text().trim().trim();
                    const six = $(this).find('div.cb-col.cb-col-8.text-right').eq(3).text().trim().trim();
                    const strike_rate = $(this).find('div.cb-col.cb-col-8.text-right').eq(4).text().trim().trim();

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
                    const player = $(this).find("span > a").text().trim();

                    const playerNameHref = $(this).find("span > a").attr('href') || '/profiles/1427578/zakir-patel';
                    const PlayerIdPart = playerNameHref.split("profiles/")[1];
                    const player_id = PlayerIdPart.split("/")[0];

                    const runs = $(this).text().trim().split("(")[0].trim();
                    const bowl = $(this).text().trim().split(",")[1].split(")")[0].trim();
                    innings2_fall_of_wickets.push({ player, player_id, runs, bowl })
                })
            } else if (e === 3) {
                const Bowler = $(this);
                $(Bowler).children().each(function () {
                    const BowlerItem = $(this);
                    $(BowlerItem).each(function () {
                        const Name = $(this).find("a.cb-text-link").text().trim();

                        const playerNameHref = $(this).find("a.cb-text-link").attr('href') || '/profiles/1427578/zakir-patel';
                        const PlayerIdPart = playerNameHref.split("profiles/")[1];
                        const PlayerId = PlayerIdPart.split("/")[0];

                        const Over = $(this).find("div.cb-col.cb-col-8.text-right").eq(0).text().trim();
                        const Maden = $(this).find("div.cb-col.cb-col-8.text-right").eq(1).text().trim();
                        const Run = $(this).find("div.cb-col.cb-col-10.text-right").eq(0).text().trim();
                        const Wickets = $(this).find("div.cb-col.cb-col-8.text-right").eq(2).text().trim();
                        const NoBowl = $(this).find("div.cb-col.cb-col-8.text-right").eq(3).text().trim();
                        const Wide = $(this).find("div.cb-col.cb-col-8.text-right").eq(4).text().trim();
                        const Eco = $(this).find("div.cb-col.cb-col-10.text-right").eq(1).text().trim();

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

        const match_information = $("div.cb-scrd-lft-col > div.cb-col").eq(1).children(".cb-col").eq(1);

        const match = match_information.find(".cb-mtch-info-itm").eq(0).find(".cb-col").eq(1).text().trim().trim();
        const date = match_information.find(".cb-mtch-info-itm").eq(1).find(".cb-col").eq(1).find(".schedule-date").attr("timestamp");
        const toss = match_information.find(".cb-mtch-info-itm").eq(2).find(".cb-col").eq(1).text().trim().trim();

        const team1 = match_information.find(".cb-minfo-tm-nm").eq(1).find(".cb-col").eq(1);
        const team1PlayerObject = [];
        $(team1).children().each(function () {
            const player = $(this).text().trim();

            const playerNameHref = $(this).attr('href') || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];
            const player_id = PlayerIdPart.split("/")[0];

            team1PlayerObject.push({ player, player_id })
        });

        const team1Bench = match_information.find(".cb-minfo-tm-nm").eq(2).find(".cb-col").eq(1);
        const team1PlayerBenchObject = [];
        $(team1Bench).children().each(function () {
            const player = $(this).text().trim();

            const playerNameHref = $(this).attr('href') || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];
            const player_id = PlayerIdPart.split("/")[0];

            team1PlayerBenchObject.push({ player, player_id })
        });

        const team1SupportStaff = match_information.find(".cb-minfo-tm-nm").eq(3).find(".cb-col").eq(1);
        const team1SupportStaffObject = [];
        $(team1SupportStaff).children().each(function () {
            const player = $(this).text().trim();

            const playerNameHref = $(this).attr('href') || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];
            const player_id = PlayerIdPart.split("/")[0];

            team1SupportStaffObject.push({ player, player_id })
        });


        const team2 = match_information.find(".cb-minfo-tm-nm").eq(5).find(".cb-col").eq(1);
        const team2PlayerObject = [];
        $(team2).children().each(function () {
            const player = $(this).text().trim();

            const playerNameHref = $(this).attr('href') || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];
            const player_id = PlayerIdPart.split("/")[0];

            team2PlayerObject.push({ player, player_id })
        });

        const team2Bench = match_information.find(".cb-minfo-tm-nm").eq(6).find(".cb-col").eq(1);
        const team2PlayerBenchObject = [];
        $(team2Bench).children().each(function () {
            const player = $(this).text().trim();

            const playerNameHref = $(this).attr('href') || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];
            const player_id = PlayerIdPart.split("/")[0];

            team2PlayerBenchObject.push({ player, player_id })
        });

        const team2SupportStaff = match_information.find(".cb-minfo-tm-nm").eq(7).find(".cb-col").eq(1);
        const team2SupportStaffObject = [];
        $(team2SupportStaff).children().each(function () {
            const player = $(this).text().trim();

            const playerNameHref = $(this).attr('href') || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];
            const player_id = PlayerIdPart.split("/")[0];

            team2SupportStaffObject.push({ player, player_id })
        });

        const data = {
            match,
            date: {
                timestamp: date,
                time
            },
            toss,
            venu,
            team: {
                team_1: {
                    team1PlayerObject,
                    team1PlayerBenchObject,
                    team1SupportStaffObject
                },
                team_2: {
                    team2PlayerObject,
                    team2PlayerBenchObject,
                    team2SupportStaffObject
                },
            }
        };

        return res.send({
            status: true,
            msg: "scorecards retrive done!",
            data: {
                match: {
                    title,
                    venu,
                    time
                },
                series: {
                    seriesName,
                    series_id
                },
                info: data,
                innings: [
                    {
                        innings_1: {
                            batting: innings1_batting,
                            fall_of_wickets: innings1_fall_of_wickets,
                            bowling: innings1_wickets
                        },
                        innings_2: {
                            batting: innings2_batting,
                            fall_of_wickets: innings2_fall_of_wickets,
                            bowling: innings2_wickets
                        }
                    }
                ]
            }
        });
    }
};

module.exports = scorecards;