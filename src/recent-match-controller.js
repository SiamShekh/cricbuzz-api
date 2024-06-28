const cheerio = require('cheerio');

const recent_match_controller = async (req, res) => {
    const request = await fetch('https://www.cricbuzz.com/cricket-match/live-scores/recent-matches');
    const body = await request.text();
    const $ = cheerio.load(body);

    let series_array = [];

    $('div.cb-rank-tabs').each(function () {
        const parent = $(this);

        parent.children().each(function () {
            const children = $(this);

            const seriesName = children.find('div.cb-rank-hdr > h2 > a').text();
            let match = [];

            children.find('div.cb-rank-hdr > div > div > div').each(function () {
                const team = $(this).find('h3 > a').text();
                const matchId = $(this).find('h3 > a').attr('href');
                const matchStage = $(this).find('span.text-gray').first().text().trim();
                const venu = $(this).find('div.text-gray > span.text-gray').text().split("at ")[1];
                const date = $(this).find('div.text-gray').html();

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

                match.push({ team, matchId, matchStage, venu, time })
            })

            if (seriesName) {
                series_array.push({ seriesName, match });
            }

        })

    })


    return res.send(series_array);
}

module.exports = recent_match_controller;
