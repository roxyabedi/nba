import express from "express";
import axios from "axios";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

//scott was here

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let playerNameInput = "";
let playerInformation = {};
let points = {};

//gets called when the page is loaded
app.get("/", async (req, res) => {
  res.render("index.ejs", playerInformation);
});

//gets called when the submit button is pressed
app.post("/", async (req, res) => {
  //gets the value of the submit button
  playerNameInput = req.body["playerNameInput"];
  try {
    //makes call to the api for player information
    const apiPlayerInfo = await axios.get(
      `https://www.balldontlie.io/api/v1/players?search=${playerNameInput}`
    );

    //sets the object to be passed to the ejs
    playerInformation = apiPlayerInfo.data.data[0];

    const playerId = playerInformation.id; //player id
    console.log("scotttest playerId", playerId);

    //makes call to the api for player stats
    const playerStats = await axios.get(
      `https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerId}`
    );
    console.log("scotttest playerStats", playerStats.data.data[0]);

    //reloads the page
    res.redirect("/");
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
});

// app.post("/", async (req, res) => {
//     try {
//       //const result = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=${playerID}`);
//       const result = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=434`);
//       //playerID = result.data.data.id;
//       points = result.data.data[0];
//       console.log("roxtest", points);

//     } catch (error) {
//       console.log(((error || {}).response || {}).data);
//     }
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
