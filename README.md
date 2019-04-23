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

This app uses multiple asynchronous API calls to fetch XML data, convert it to JSON and set it into a react/redux store to be used by the application. Firstly, it uses geolocation to get users current position (lat and long), it will use that information to query the OpenWeather API for current weather data and display it on the widget card. After that, 2 more calls are made, one that gets the timezone of the lat and long to display the correct offset time and another call to the Unsplash photo search API to get a background image based on your city name.

SCSS processing is being done by node-sass, and there is also appropriate error states in order to give the user a good description of what is going on.

(Disclaimer: There is a restriction on asking for location on page load https://developers.google.com/web/tools/lighthouse/audits/geolocation-on-load, a button was added so the geolocate is initiated by the user. The build of this project can only fetch your location on secure HTTPS connections).

Updates in mind for V2:

- Use Redux Thunk to handle async calls
- Create actions for async calls
- Once user location is established, only refresh card
- Loading animation on card when refresh button is clicked.
- Use weather to query more specific photo
- Look over code to identify possible object / array mutations

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
