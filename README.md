<pre>
 ▄█     █▄     ▄████████    ▄████████     ███        ▄█    █▄       ▄████████    ▄████████         ▄████████    ▄███████▄  ▄█
███     ███   ███    ███   ███    ███ ▀█████████▄   ███    ███     ███    ███   ███    ███        ███    ███   ███    ███ ███
███     ███   ███    █▀    ███    ███    ▀███▀▀██   ███    ███     ███    █▀    ███    ███        ███    ███   ███    ███ ███▌
███     ███  ▄███▄▄▄       ███    ███     ███   ▀  ▄███▄▄▄▄███▄▄  ▄███▄▄▄      ▄███▄▄▄▄██▀        ███    ███   ███    ███ ███▌
███     ███ ▀▀███▀▀▀     ▀███████████     ███     ▀▀███▀▀▀▀███▀  ▀▀███▀▀▀     ▀▀███▀▀▀▀▀        ▀███████████ ▀█████████▀  ███▌
███     ███   ███    █▄    ███    ███     ███       ███    ███     ███    █▄  ▀███████████        ███    ███   ███        ███
███ ▄█▄ ███   ███    ███   ███    ███     ███       ███    ███     ███    ███   ███    ███        ███    ███   ███        ███
 ▀███▀███▀    ██████████   ███    █▀     ▄████▀     ███    █▀      ██████████   ███    ███        ███    █▀   ▄████▀      █▀   
                                                                                ███    ███
</pre>

## OpenWeatherAPI + GeoNames + Unsplash Weather Widget

## React / Redux / Redux Thunk (etc)

This app uses multiple asynchronous API calls to fetch XML data, convert it to JSON. It uses Redux and Redux thunk to store the data client side for use until refreshed. Firstly, it uses geolocation to get users current position (lat and long), once that is established it will query the OpenWeather API for current weather data in your area and display it on the widget card. Asynchronously 2 more calls are made, one that gets the timezone based on the lat and long to display the correct offset time and another call to the Unsplash photo search API to get a background image based on your city and country name.

SCSS processing is being done by node-sass, and there is also appropriate error states in order to give the user a good description of what is going on.

(Disclaimer: There is a restriction on asking for location on page load https://developers.google.com/web/tools/lighthouse/audits/geolocation-on-load, a button was added so the geolocate is initiated by the user. The build of this project can only fetch your location on secure HTTPS connections).

Live build is here: https://sidewalkhustle.com/weather-api/

### Project Details

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Steps to get this project running

### `Make sure location services is enabled`

Mac: System Prefs > Security & Privacy > Enable Location Services

Windows: 🤷‍ ¯\_(ツ)\_/¯

### `git clone https://github.com/coneilldesigns/weather-api.git`

Clone the git repo into a directory on your local machine.

### `cd weather-api`

cd into app directory

### `npm install`

Use NPM to install all dependencies

### `npm start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
The app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# weather-api
