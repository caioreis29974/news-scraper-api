const express = require("express");
app = express();
port = 6504;

app.get("/", (req, res) => {
    res.send("First Test")
})

app.listen(port, () => {
    console.log(`API is running: < http://localhost:${port} >`)
})