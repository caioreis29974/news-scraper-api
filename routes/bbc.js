const axios = require("axios");
const cheerio = require("cheerio");

const FetchData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

const BBC = async() => {
    const content = await FetchData('https://www.bbc.com/portuguese');
    const $ = cheerio.load(content);
    const titles = [];
    $('.bbc-1i4ie53.e1d658bg0').each((i, el) => {
        const text = $(el).text().trim();
        if (text.length > 15) {
            titles.push(text);
        }
    });
    return {
        "site": "BBC News Brasil ",
        "link": "https://www.bbc.com/portuguese",
        "news": titles
    };
};

BBC().then(console.log).catch(console.error);

module.exports = { BBC }