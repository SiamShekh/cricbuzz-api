const cheerio = require('cheerio');

const live_match_controller = async (req, res) => {
    const request = await fetch('https://www.cricbuzz.com/cricket-match/live-scores');
    const body = await request.text();
    const $ = cheerio.load(body);

    let series_array = [];

    $('div.cb-rank-tabs').each(function () {
        const parent = $(this);

        parent.children().each(function () {
            const children = $(this);

            $(children).each(function () {
                const series = $(this); // Series Page
                const series_name = series.find('h2.cb-lv-scr-mtch-hdr > a').text();
                const series_id_Href = series.find('h2.cb-lv-scr-mtch-hdr > a').attr('href') || "/cricket-series/80629/south-africa-women-tour-of-india-2024";

                const seriesIdPart = series_id_Href.split("cricket-series/")[1];
                const series_id = seriesIdPart.split("/")[0];

                let matches_array = [];
                $(series).find('div.cb-mtch-lst').each(function () {
                    const matches = $(this); // Matches Page

                    const team = matches.find('h3.cb-lv-scr-mtch-hdr > a').text();
                    const matchIdHref = matches.find('h3.cb-lv-scr-mtch-hdr > a').attr('href');
                    const matchId = matchIdHref.split("live-cricket-scores/")[1].split("/")[0];

                    const matchStage = matches.find('div.cb-schdl > div > span.text-gray').text();
                    const date = matches.find('div.text-gray').html();

                    const timestampRegex = /(\d{13})/;
                    const timeStamp = date.match(timestampRegex)[0];
                    let time = {};
                    if (timeStamp) {
                        const timestamp = parseInt(timeStamp, 10);
                        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

                        const date = new Date(timestamp);

                        const options = {
                            timeZone: userTimeZone,
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        };
                        const formattedDate = date.toLocaleDateString('en-US', options);

                        const timeOptions = {
                            timeZone: userTimeZone,
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true, // Use 12-hour format
                        };

                        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

                        time = {
                            formattedDate,
                            formattedTime
                        }
                    }

                    let score_data = {};

                    $(matches).find('div > a > div.cb-col').each(function () {
                        const score = $(this); // score


                        const Team1 = score.find('div> div.cb-hmscg-bwl-txt > div.cb-hmscg-tm-nm').text();
                        const Team1Score = score.find('div> div.cb-hmscg-bwl-txt > div.cb-ovr-flo').text().split(Team1)[1];

                        const Team2 = score.find('div> div.cb-hmscg-bat-txt > div.cb-hmscg-tm-nm').text();
                        const Team2Score = score.find('div> div.cb-hmscg-bat-txt > div.cb-ovr-flo').text().split(Team2)[1];

                        const Result = score.find('div> div.cb-text-complete').text();
                        const Live_Result = score.find('div> div.cb-text-live').text();

                        score_data = {
                            Team1,
                            Team2,
                            Team1Score: Team1Score || `the ${Team1} not batted yet`,
                            Team2Score: Team2Score || `the ${Team2} not batted yet`,
                            Result: Result || 'The match is not completed.',
                            Live_Result: Live_Result || 'The match result is declared.'
                        }
                    });

                    matches_array.push({
                        team,
                        matchId,
                        matchStage,
                        time,
                        score_data
                    })
                });

                if (series_name) {
                    series_array.push({
                        series_name,
                        series_id,
                        matches_array
                    })
                }
            })


        })

    })


    return res.send(series_array);
}

module.exports = live_match_controller;
