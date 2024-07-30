// Module Imports
const express = require('express')
const axios = require('axios');
const path = require('path');
// loads the defined environment variables
require('dotenv').config();
console.log(process.env.WEATHER_API_KEY);

// Server Instance Creation
// Creates an instance of the Express server
const app = express();
//  Sets the port on which the server will run. First, it tries to get the value of the PORT environment variable, if it is not set, it defaults to port 3000.
const PORT = process.env.PORT || 3000;

// Middleware to Serve Static Files from the application to the client
app.use(express.static(path.join(__dirname, 'public')));

// Default Route to Send index.html to Client Request 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to Get Weather Forecast

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);

//     try {
//         const response = await axios.get(apiUrl);
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: 'Erro ao obter os dados da previsão do tempo'});
//     }
// });


try {
    console.log(`Fetching weather data for city: ${city}`);
    const response = await axios.get(apiUrl);
    res.json(response.data);
} catch (error) {
    console.error(`Erro ao obter os dados da previsão do tempo: ${error.message}`);
    if (error.response) {
        console.error(`Response data: ${error.response.data}`);
        console.error(`Response status: ${error.response.status}`);
        console.error(`Response headers: ${error.response.headers}`);
        res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
        console.error(`No response received: ${error.request}`);
        res.status(500).json({ error: 'No response received from weather API' });
    } else {
        console.error(`Error setting up request: ${error.message}`);
        res.status(500).json({ error: 'Error setting up request to weather API' });
    }
}
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})