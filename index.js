import express from 'express';
import axios from 'axios';
import ejs from 'ejs';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


let player0 = {};
let player1 = {};
let player2 = {};
let playerCardImage = '';
let player4 = {};

const axiosGetWithAuthorization = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: process.env.API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(((error || {}).response || {}).data);
    throw error;
  }
};

//gets called when the page is loaded
app.get('/', async (req, res) => {
  res.render('index.ejs', [
    player0,
    player1,
    player2,
    { playerCardImage },
    player4,
  ]);
});

//gets called when the submit button is pressed
app.post('/', async (req, res) => {
  //gets the value of the submit button
  const playerNameInput = req.body['playerNameInput']; // Jayson Tatum
  const [firstName, lastName] = playerNameInput.split(' '); // ['Jayson', 'Tatum']

  try {
    //makes call to the api for player information
    const firstNamePlayers = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/players?per_page=100&search=${firstName}`
    );

    const firstNameSet = new Set(
      firstNamePlayers.data.map(
        (player) => `${player.first_name} ${player.last_name}`
      )
    );

    const lastNamePlayers = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/players?search=${lastName}`
    );

    const playerInformation = lastNamePlayers.data.length
      ? lastNamePlayers.data.find((player) =>
          firstNameSet.has(`${player.first_name} ${player.last_name}`)
        )
      : firstNamePlayers.data[0];

    const playerId = playerInformation.id; //player id

    //makes call to the api for player stats
    const playerStats = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/season_averages/general?season=2023&season_type=regular&type=base&player_ids[]=${playerId}`
    );
    const seasonStats = playerStats.data[0];

    //combines player information
    player0 = Object.assign(playerInformation, seasonStats);

    //reloads the page
    res.redirect('/');
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
});

app.post('/player1', async (req, res) => {
  //gets the value of the submit button
  const playerNameInput = req.body['playerCompOne'];
  const [firstName, lastName] = playerNameInput.split(' '); // ['Jayson', 'Tatum']
  try {
    //makes call to the api for player information
    const firstNamePlayers = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/players?per_page=100&search=${firstName}`
    );

    const firstNameSet = new Set(
      firstNamePlayers.data.map(
        (player) => `${player.first_name} ${player.last_name}`
      )
    );

    const lastNamePlayers = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/players?search=${lastName}`
    );

    const playerInformation = lastNamePlayers.data.length
      ? lastNamePlayers.data.find((player) =>
          firstNameSet.has(`${player.first_name} ${player.last_name}`)
        )
      : firstNamePlayers.data[0];

    const playerId = playerInformation.id; //player id

    //makes call to the api for player stats
    const playerStats = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/season_averages/general?season=2023&season_type=regular&type=base&player_ids[]=${playerId}`
    );

    const seasonStats = playerStats.data[0];

    //combines player information
    player1 = Object.assign(playerInformation, seasonStats);

    //reloads the page
    res.redirect('/');
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
});

app.post('/player2', async (req, res) => {
  //gets the value of the submit button
  const playerNameInput = req.body['playerCompTwo'];
  const [firstName, lastName] = playerNameInput.split(' '); // ['Jayson', 'Tatum']
  try {
      //makes call to the api for player information
    const firstNamePlayers = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/players?per_page=100&search=${firstName}`
    );

    const firstNameSet = new Set(
      firstNamePlayers.data.map(
        (player) => `${player.first_name} ${player.last_name}`
      )
    );

    const lastNamePlayers = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/players?search=${lastName}`
    );

    const playerInformation = lastNamePlayers.data.length
      ? lastNamePlayers.data.find((player) =>
          firstNameSet.has(`${player.first_name} ${player.last_name}`)
        )
      : firstNamePlayers.data[0];

    const playerId = playerInformation.id; //player id

    //makes call to the api for player stats
    const playerStats = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/season_averages/general?season=2023&season_type=regular&type=base&player_ids[]=${playerId}`
    );

    const seasonStats = playerStats.data[0];

    //combines player information
    player2 = Object.assign(playerInformation, seasonStats);

    //reloads the page
    res.redirect('/');
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
});

app.post('/playerTile', async (req, res) => {
  const playerNamePath = Object.keys(req.body)[0];

  try {
    //reloads the page
    playerCardImage = `/images/${playerNamePath}.png`;

    const [firstName, lastName] = playerNamePath.split('_'); // ['Jayson', 'Tatum']

    //makes call to the api for player information
    const firstNamePlayers = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/players?per_page=100&search=${firstName}`
    );

    const firstNameSet = new Set(
      firstNamePlayers.data.map(
        (player) => `${player.first_name} ${player.last_name}`
      )
    );

    const lastNamePlayers = await axiosGetWithAuthorization(
      `http://api.balldontlie.io/v1/players?search=${lastName}`
    );

    const playerInformation = lastNamePlayers.data.length
      ? lastNamePlayers.data.find((player) =>
          firstNameSet.has(`${player.first_name} ${player.last_name}`)
        )
      : firstNamePlayers.data[0];


    const playerId = playerInformation.id; //player id

    //makes call to the api for player stats
    const playerStats = await axiosGetWithAuthorization(
      `https://api.balldontlie.io/v1/season_averages/general?season=2023&season_type=regular&type=base&player_ids[]=${playerId}`
    );

    const seasonStats = playerStats.data[0];

    //combines player information
    player4 = Object.assign(playerInformation, seasonStats);
    res.redirect('/');
  } catch (error) {
    console.log(((error || {}).response || {}).data);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
