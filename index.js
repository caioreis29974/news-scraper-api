const express = require("express");
app = express();
port = 6504;
const { UOLNews } = require("./routes/uol")

app.get("/", (req, res) => {
    res.send("First Test")
})

app.get("/uol", async (req, res) => {
    try {
        const data = await UOLNews();
        res.json(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ erro: "Error to search news!" });
    }
})

app.listen(port, () => {
    console.log(`API is running: < http://localhost:${port} >`)
})