function todaysDate() {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let today = new Date();

  // get todays month and date
  let day = weekday[today.getDay()];
  let dayNumber = today.getDate(); // get todays date as a number
  let monthNumber = today.getMonth() + 1; // get month
  // create string for day and month as: day/month
  let dayMonthString = `${dayNumber}/${monthNumber}`;
  // get html reference
  let todayNumbers = document.getElementById("todayNumbers");
  // update html
  todayNumbers.textContent = `${day} - ${dayMonthString}`;
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  // Lägg till en nolla framför minuterna om det är mindre än 10
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const timeElement = document.getElementById("clock");
  timeElement.textContent = `${hours}:${minutes}`;
}
