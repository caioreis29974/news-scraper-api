const axios = require("axios");
const cheerio = require("cheerio");

const G1 = async () => {
    const response = await axios.get('https://g1.globo.com/');
    const $ = cheerio.load(response.data);
    const news = [];

    $('.feed-post').each((i, e) => {
        const new_g1 = $(e).find('a:first').text().trim();
        const image = $(e).find('img').attr('src') || '';
        const link = $(e).find('a:first').attr('href');
        const posted = $(e).find('span.feed-post-datetime').text().trim();

        news.push({
            new_g1,
            image,
            link,
            posted,
        });
    });

    return news;
};

module.exports = { G1 };