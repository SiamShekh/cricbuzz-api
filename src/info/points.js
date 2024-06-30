const cheerio = require('cheerio');

const points_controller = async (req, res) => {
    const seriesId = req.query.seriesId;
    const fetchHtml = await fetch(`https://www.cricbuzz.com/cricket-series/${seriesId}/a/points-table`);
    const body = await fetchHtml.text();
    const $ = cheerio.load(body);

    const noData = $(".cb-hm-rght").text().trim();
    if (noData.includes('Points table is not available for this series.')) {
        return res.send({
            status: false,
            msg: noData,
            data: {}
        })
    } else {
        const table = $(".cb-col-67.cb-col.cb-left.cb-hm-rght");
        const point_array = [];
        table.children(".cb-srs-pnts").each(function () {
            const TBody = $(this).find("tbody");
            const Thead = $(this).find("thead > tr").find("th").eq(0).text().trim();
            const groupArray = [];
            $(TBody).children("tr[class]").each(function () {
                //  > a > div > div.cb-col.cb-col-84 > span
                const name = $(this).find("div > div").find("img").attr("title");
                const img = $(this).find("div > div").find("img").attr("src");
                const position = $(this).find("div > div").eq(1).find("span").text().trim();

                const match = $(this).find(".cb-srs-pnts-td").eq(0).text().trim();
                const won = $(this).find(".cb-srs-pnts-td").eq(1).text().trim();
                const lost = $(this).find(".cb-srs-pnts-td").eq(2).text().trim();
                const tied = $(this).find(".cb-srs-pnts-td").eq(3).text().trim();
                const no_result = $(this).find(".cb-srs-pnts-td").eq(4).text().trim();
                const pts = $(this).find(".cb-srs-pnts-td").eq(5).text().trim();
                const nrr = $(this).find(".cb-srs-pnts-td").eq(6).text().trim();
                
                const data = {
                    team: {
                        name, img, position
                    },
                    info: {
                        match, won, lost, tied, no_result, pts, nrr
                    }
                };

                groupArray.push(data);
            });
            point_array.push({
                stage: Thead,
                group: groupArray
            })
        })

        return res.send({
            status: true,
            msg: 'point table retrive done!',
            data: point_array
        });
    }
};

module.exports = points_controller;