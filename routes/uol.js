const axios = require("axios");
const cheerio = require("cheerio");

const FetchData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

const UOLNews = async() => {
    const content = await FetchData('https://www.uol.com.br');
    const $ = cheerio.load(content);
    const titles = [];
    $('.title__element.headlineSub__content__title').each((i, el) => {
        titles.push($(el).text().trim());
    });
    return {
        "site": "UOL",
        "link": "https://www.uol.com.br",
        "news": titles
    };
};

UOLNews();

module.exports = { UOLNews }