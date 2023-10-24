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
let apiResults = {};
let points = {};

// app.get("/", async (req, res) => {
//   res.render("index.ejs", apiResults);
// });

app.get("/", async (req, res) => {
  res.render("index.ejs", points);
});

app.post("/", async (req, res) => {
  try {
    const result = await axios.get(
      "https://www.balldontlie.io/api/v1/season_averages?season=2022&player_ids[]=434"
    );
    res.render("index.ejs", result.data.data[0]);
  } catch (error) {
    console.log(error.response.data);
  }
});

app.post("/", async (req, res) => {
  playerNameInput = req.body["playerNameInput"];
  try {
    const result = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerNameInput}`);
    
   
    apiResults = result.data.data[0];
    console.log("scotttest apiResults", apiResults);

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
