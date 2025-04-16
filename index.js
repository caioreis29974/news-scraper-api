const express = require("express");
app = express();
const { UOLNews } = require("./routes/uol")
const { CNN } = require("./routes/cnn")
const { BBC } = require("./routes/bbc")
const { G1 } = require("./routes/g1")

router.get('/', (req, res) => {
    res.json({
        nome: "RESTful News API using Web Scraping",
        status: "Online",
        autor: "CaioXyZ",
        endpoints: {
            g1: "/g1",
            uol: "/uol",
            cnn: "/cnn",
            bbc: "/bbc"
        }
    });
});

app.get("/uol", async (req, res) => {
    try {
        const data = await UOLNews();
        res.json(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ erro: "Error to search news!" });
    }
});

app.get("/cnn", async (req, res) => {
    try {
        const data = await CNN();
        res.json(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ erro: "Error to search news!" });
    }
});

app.get("/bbc", async (req, res) => {
    try {
        const data = await BBC();
        res.json(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ erro: "Error to search news!" });
    }
});

app.get('/g1', async (req, res) => {
    try {
        const news = await G1();

        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error to search news!');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API is running ${PORT}`);
});