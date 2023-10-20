import express from "express";
import axios from "axios";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//scott was here

const queryParams = {
  player_ids: 70,
  seasons: 2022,
};

app.use(express.static("public"));

// app.get("/", (req, res) => {
//     res.render("index.ejs");
// })

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.balldontlie.io/api/v1/players/434"
    );
    console.log("rockstest", result.data);
    res.render("index.ejs", result.data);
    // res.render("index.ejs", { name: result.data.first_name, info: result.data });
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
  // console.log(first_name);
});

app.get("/average", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=434"
    );
    res.render("index.ejs", result.data.data[0]);
  } catch (error) {
    console.log(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
