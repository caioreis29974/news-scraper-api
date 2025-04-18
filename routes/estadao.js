const axios = require("axios");
const cheerio = require("cheerio");

const FetchData = async (url) => {
    const result = await axios.get(url);
    return result.data;
}

const ESTADAO = async() => {
    const content = await FetchData('https://www.estadao.com.br');
    const $ = cheerio.load(content);
    const titles = [];
    $('.headline').each((i, el) => {
        titles.push($(el).text().trim());
    });

    const formattedNews = {};
    const numberOfNews = Math.min(5, titles.length);

    for (let i = 0; i < numberOfNews; i++) {
        formattedNews[`new${i + 1}`] = titles[i];
        formattedNews[`img_new${i + 1}`] = "";
    }

    return [
        {
            "site": "Estadão"
        },
        {
            "link": "https://www.estadao.com.br"
        },
        {
            ...formattedNews
        }
    ];
};

async function main() {
    const estadaoData = await ESTADAO();
    console.log(JSON.stringify(estadaoData, null, 2));
}

main();

module.exports = { ESTADAO }