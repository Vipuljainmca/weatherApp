# Weather App

This is a simple React-based weather application that allows users to search for current weather information and forecast for a given city.

## Features
- Search for current weather information and forecast by city name.
- View hourly and daily forecast details.
- Change temperature units between Celsius and Fahrenheit.
- Display additional weather details such as sunrise, sunset, wind speed, and more.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Vipuljainmca/weatherApp.git
    ```

2. **Change to the project directory:**
    ```bash
    cd weather-app
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

## Usage

4. **Run the application:**
    ```bash
    npm start
    ```

   5. **Open your browser and go to [http://localhost:3000](http://localhost:3000)**

    The application should now be running locally. You can interact with the weather app by searching for cities and viewing the weather details.

## API Key

To run the application, you will need to obtain an API key from OpenWeatherMap. You can sign up for a free API key [here](https://openweathermap.org/api). Once you have the API key, add it to the `WeatherApiProvider` component in the `src/WeatherApi.js` file.

```jsx
// src/WeatherApi.js


