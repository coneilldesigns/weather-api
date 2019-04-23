export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function formatDate(date) {
  var datedone = date.split("T"),
    dateString = datedone[0],
    timeString = datedone[1];

  return dateString + " " + timeString;
}

export function tempUpdate(temp) {
  var tempdone = temp.split("."),
    string1 = tempdone[0];
  return string1;
}

export function fixUnitsSomething(units) {
  if (units === "celsius") {
    units = "C";
  } else {
    units = "F";
  }
  return units;
}

export function backgroundFixer(requestStatus, bgImg, errorImage) {
  if (requestStatus === "failed") {
    bgImg = errorImage;
  }
  return bgImg;
}

export function weatherIconFunc(icon) {
  if (!icon) {
    icon = "https://openweathermap.org/img/w/01n.png";
  } else {
    icon = `https://openweathermap.org/img/w/${icon}.png`;
  }
  return icon;
}

export function formatDateWithZeros() {
  var date = new Date();
  // Format Hours
  var hours = date.getHours();
  var finalHours = ("0" + hours).slice(-2);
  // Format Mins
  var mins = date.getMinutes();
  var finalMins = ("0" + mins).slice(-2);
  // Format Seconds
  var sec = date.getSeconds();
  var finalSec = ("0" + sec).slice(-2);

  return finalHours + ":" + finalMins + ":" + finalSec;
}

export function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export function correctWeatherIcon(iconCode) {
  if (!iconCode) {
    return "03d";
  } else {
    return iconCode;
  }
}
