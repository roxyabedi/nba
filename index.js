import express from "express";
import axios from "axios";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiKey = '28186af8-31c8-4c0b-a7fb-a88172da42b2';

let player0 = {};
let player1 = {};
let player2 = {};
let playerCardImage = "";
let player4 = {};

const axiosGetWithAuthorization = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': apiKey,
      }
    });
    return response.data;
  } catch (error) {
    console.error(((error || {}).response || {}).data);
    throw error;
  }
};

//gets called when the page is loaded
app.get("/", async (req, res) => {
  res.render("index.ejs", [player0, player1, player2, { playerCardImage }, player4]);
});

//gets called when the submit button is pressed
app.post("/", async (req, res) => {
  //gets the value of the submit button
  const playerNameInput = req.body["playerNameInput"];
  try {
    //makes call to the api for player information
    const apiPlayerInfo = await axiosGetWithAuthorization(
      `http://api.balldontlie.io/v1/players?search=${playerNameInput}`
    );
  
    //sets the object to be passed to the ejs
    const playerInformation = apiPlayerInfo.data[0];
    console.log("scoot", apiPlayerInfo.data)
    
    const playerId = playerInformation.id; //player id
    console.log("roxytest", playerId)

    //makes call to the api for player stats
    const playerStats = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerId}`
    );
    console.log("hello", playerStats)
    const seasonStats = playerStats.data[0];
    console.log("points", seasonStats)
    
    //combines player information
    player0 = Object.assign(playerInformation, seasonStats);

    //reloads the page
    res.redirect("/");
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
});

app.post("/player1", async (req, res) => {
  //gets the value of the submit button
  const playerNameInput = req.body["playerCompOne"];
  try {
    //makes call to the api for player information
    const apiPlayerInfo = await axiosGetWithAuthorization(
      `http://api.balldontlie.io/v1/players?search=${playerNameInput}`
    );

    //sets the object to be passed to the ejs
    const playerInformation = apiPlayerInfo.data[0];

    const playerId = playerInformation.id; //player id

    //makes call to the api for player stats
    const playerStats = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerId}`
    );

    const seasonStats = playerStats.data[0];

    //combines player information
    player1 = Object.assign(playerInformation, seasonStats);

    //reloads the page
    res.redirect("/");
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
});

app.post("/player2", async (req, res) => {
  //gets the value of the submit button
  const playerNameInput = req.body["playerCompTwo"];
  try {
    //makes call to the api for player information
    const apiPlayerInfo = await axiosGetWithAuthorization(
      `http://api.balldontlie.io/v1/players?search=${playerNameInput}`
    );

    //sets the object to be passed to the ejs
    const playerInformation = apiPlayerInfo.data[0];

    const playerId = playerInformation.id; //player id

    //makes call to the api for player stats
    const playerStats = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerId}`
    );

    const seasonStats = playerStats.data[0];

    //combines player information
    player2 = Object.assign(playerInformation, seasonStats);

    //reloads the page
    res.redirect("/");
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
});

app.post("/playerTile", async (req, res) => {
  console.log("scotttest goes through");
  const playerNamePath = Object.keys(req.body)[0];
  try {
    //reloads the page
    console.log("scotttest test1", playerNamePath);
    playerCardImage = `/images/${playerNamePath}.png`;
    console.log(playerCardImage);
    console.log("roxtest test1", playerNamePath);
    const apiPlayerInfo = await axiosGetWithAuthorization(
      `http://api.balldontlie.io/v1/players?search=${playerNamePath}`
    );
    console.log("ik", apiPlayerInfo)

    //sets the object to be passed to the ejs
    const playerInformation = apiPlayerInfo.data[0];
    console.log("what", playerInformation)

    const playerId = playerInformation.id; //player id

    //makes call to the api for player stats
    const playerStats = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/season_averages?season=2023&player_ids[]=${playerId}`
    );

    const seasonStats = playerStats.data[0];

    //combines player information
    player4 = Object.assign(playerInformation, seasonStats);
    res.redirect("/");
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
