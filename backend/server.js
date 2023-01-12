const express = require("express");
const cors = require("cors");
const app = express();
// const corsOptions = { origin: "http://localhost:8080" };
const port = process.env.API_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "App listening" });
});

require("./routes/session.routes")(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});