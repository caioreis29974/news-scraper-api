const axios = require("axios");
const cheerio = require("cheerio");

const FetchData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

const ESTADAO = async() => {
    const content = await FetchData('https://www.estadao.com.br');
    const $ = cheerio.load(content);
    const formattedNews = {};
    const numberOfNews = 5;

    $('.headline').each((i, el) => {
        if (i < numberOfNews) {
            const title = $(el).text().trim();
            formattedNews[`new${i + 1}`] = title;
        }
    });

    return [
        {
            "site": "Estadão"
        },
        {
            "link": "https://www.estadao.com.br"
        },
        formattedNews
    ];
};

async function main() {
    const estadaoData = await ESTADAO();
}

main();

module.exports = { ESTADAO }