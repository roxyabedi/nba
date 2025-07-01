# [Boston Celtics Stats Website](https://nba-celtics.onrender.com)

## ⚠️ Notice: API Access Update

<b>Note:</b> This project originally used the [balldontlie API](https://docs.balldontlie.io/#nba-api) for live data. As of recently, the API has moved behind a paywall, so the live version is no longer functional.
The full source code remains available here, and you can explore the app’s structure, logic, and components.

## Overview

Welcome to the Boston Celtics Stats Website! This project is a web application developed using Express.js, Node.js, EJS, JavaScript, HTML, and CSS. It provides current statistics and player information for the Boston Celtics roster during the 2023-2024 NBA season. The data is dynamically fetched from the [balldontlie API](https://www.balldontlie.io/#introduction) to ensure up-to-date information on player stats.

<img width="1470" alt="celtics" src="https://github.com/user-attachments/assets/11dadf64-6971-4032-ba46-9bf21b08442a">

### Features

- Current Player Stats: View and compare up-to-date statistics for each player on the Boston Celtics roster.
- Player Information: Access detailed information about each player, including their position, height, weight, and more.
- 2023-2024 Season Data: All statistics are specific to the Boston Celtics players for the 2023-2024 NBA Championship season.
- Responsive Design: The website is fully responsive, ensuring a seamless experience across devices.

### Technologies Used

- Express.js: A fast and minimalist web framework for Node.js used to build the server-side logic.
- Node.js: A JavaScript runtime used to run the server-side application.
- EJS (Embedded JavaScript): A templating language that allows us to generate HTML markup with JavaScript.
- JavaScript: Used for client-side functionality and dynamic content updates.
- HTML/CSS: Used to structure and style the web pages, ensuring a user-friendly interface.

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:

- Node.js (version 14.x or higher)
- npm (Node package manager)

### Installation
Clone the repository to your local machine:
```
git clone https://github.com/your-username/boston-celtics-stats.git
```
Navigate to the project directory:
```
cd boston-celtics-stats
```
Install the necessary dependencies:
```
npm install
```
### Running the Application
1. Start the server:
```
npm start
````
2. Open your web browser and visit:
```
http://localhost:3000
```

The website should now be running, and you can view the Boston Celtics player stats for the 2023-2024 season.

### API Integration

This project utilizes the [balldontlie API](https://www.balldontlie.io/#introduction) to fetch real-time statistics and player information for the Boston Celtics. The API calls are handled server-side, and the data is rendered on the front end using EJS templates.
