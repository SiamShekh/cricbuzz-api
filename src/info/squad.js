const cheerio = require('cheerio');

const squad_controller = async (req, res) => {
    const matchId = req.query.matchId;
    const fetchHtml = await fetch(`https://www.cricbuzz.com/cricket-match-squads/${matchId}/a`);
    const body = await fetchHtml.text();
    const $ = cheerio.load(body);

    const noData = $(".cb-no-sqds-lft-col").text().trim();
    if (noData === "The squads will appear once it is announced.") {
        return res.send({
            status: false,
            msg: noData,
            data: {}
        })
    } else {
        const play11 = $(".cb-play11-lft-col").eq(0);
        const play11Array = [];
        $(play11).children().each(function () {
            const playerNameHref = $(this).find("a").attr("href") || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];

            const playerInfo = $(this).find("a > .cb-player-name-left > div").text().trim();

            const player_id = PlayerIdPart.split("/")[0];
            const playerImage = $(this).find("a > .cb-player-img-left > img").attr('src');
            const playerName = playerInfo.split("  ")[0];
            const playerStage = playerInfo.split("  ")[1];

            if (playerName) {
                play11Array.push(
                    {
                        id: player_id,
                        img: playerImage,
                        name: playerName,
                        stage: playerStage
                    }
                )
            }
        })

        const play11Bench = $(".cb-play11-lft-col").eq(1);
        const play11BenchArray = [];
        $(play11Bench).children().each(function () {
            const playerNameHref = $(this).find("a").attr("href") || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];

            const playerInfo = $(this).find("a > .cb-player-name-left > div").text().trim();

            const player_id = PlayerIdPart.split("/")[0];
            const playerImage = $(this).find("a > .cb-player-img-left > img").attr('src');
            const playerName = playerInfo.split("  ")[0];
            const playerStage = playerInfo.split("  ")[1];
            if (playerName) {
                play11BenchArray.push(
                    {
                        id: player_id,
                        img: playerImage,
                        name: playerName,
                        stage: playerStage
                    }
                )
            }
        })

        const play11Staff = $(".cb-play11-lft-col").eq(2);
        const play11StaffArray = [];
        $(play11Staff).children().each(function () {
            const playerNameHref = $(this).find("a").attr("href") || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];

            const playerInfo = $(this).find("a > .cb-player-name-left > div").text().trim();

            const player_id = PlayerIdPart.split("/")[0];
            const playerImage = $(this).find("a > .cb-player-img-left > img").attr('src');
            const playerName = playerInfo.split("  ")[0];
            const playerStage = playerInfo.split("  ")[1];

            if (playerName) {
                play11StaffArray.push(
                    {
                        id: player_id,
                        img: playerImage,
                        name: playerName,
                        stage: playerStage
                    }
                )
            }
        })

        const play11Team2 = $(".cb-play11-rt-col").eq(0);
        const play11Team2Array = [];
        $(play11Team2).children().each(function () {
            const playerNameHref = $(this).find("a").attr("href") || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];

            const playerInfo = $(this).find("a > .cb-player-name-right > div").text().trim();

            const player_id = PlayerIdPart.split("/")[0];
            const playerImage = $(this).find("a > .cb-player-img-right > img").attr('src');
            const playerName = playerInfo.split("  ")[0];
            const playerStage = playerInfo.split("  ")[1];

            if (playerName) {
                play11Team2Array.push(
                    {
                        id: player_id,
                        img: playerImage,
                        name: playerName,
                        stage: playerStage
                    }
                )
            }
        })

        // console.log(play11Team2Array);

        const play11Team2Bench = $(".cb-play11-rt-col").eq(1);
        const play11Team2BenchArray = [];
        $(play11Team2Bench).children().each(function () {
            const playerNameHref = $(this).find("a").attr("href") || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];

            const playerInfo = $(this).find("a > .cb-player-name-right > div").text().trim();

            const player_id = PlayerIdPart.split("/")[0];
            const playerImage = $(this).find("a > .cb-player-img-right > img").attr('src');
            const playerName = playerInfo.split("  ")[0];
            const playerStage = playerInfo.split("  ")[1];

            if (playerName) {

                play11Team2BenchArray.push(
                    {
                        id: player_id,
                        img: playerImage,
                        name: playerName,
                        stage: playerStage
                    }
                )
            }

        })

        const play11Team2Staff = $(".cb-play11-rt-col").eq(2);
        const play11Team2StaffArray = [];
        $(play11Team2Staff).children().each(function () {
            const playerNameHref = $(this).find("a").attr("href") || '/profiles/1427578/zakir-patel';
            const PlayerIdPart = playerNameHref.split("profiles/")[1];

            const playerInfo = $(this).find("a > .cb-player-name-right > div").text().trim();

            const player_id = PlayerIdPart.split("/")[0];
            const playerImage = $(this).find("a > .cb-player-img-right > img").attr('src');
            const playerName = playerInfo.split("  ")[0];
            const playerStage = playerInfo.split("  ")[1];

            if (playerName) {
                play11Team2StaffArray.push(
                    {
                        id: player_id,
                        img: playerImage,
                        name: playerName,
                        stage: playerStage
                    }
                )
            }
        })

        return res.send({
            data: {
                status: true,
                msg: "squad retrive done!",
                play11: {
                    team1: play11Array,
                    team2: play11Team2Array
                },
                bench: {
                    team1: play11BenchArray,
                    team2: play11Team2BenchArray
                },
                staff: {
                    team1: play11StaffArray,
                    team2: play11Team2StaffArray
                }
            }
        });
    }
};

module.exports = squad_controller;