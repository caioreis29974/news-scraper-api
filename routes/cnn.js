const axios = require("axios");
const cheerio = require("cheerio");

const FetchData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

const CNN = async() => {
    const content = await FetchData('https://www.cnnbrasil.com.br');
    const $ = cheerio.load(content);
    const titles = [];
    $('.block__news__title').each((i, el) => {
        const text = $(el).text().trim();
        if (text.length > 15) {
            titles.push(text);
        }
    });
    return {
        "site": "CNN Brasil",
        "link": "https://www.cnnbrasil.com.br",
        "news": titles
    };
};

module.exports = { CNN }