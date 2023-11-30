const currentDate = document.querySelector(".current-date"),
  daysTag = document.querySelector(".days"),
  prevIcon = document.getElementById("prevMonth"),
  nextIcon = document.getElementById("nextMonth");

// Getting new date, current year and month
let date = new Date();
(currYear = date.getFullYear()), (currMonth = date.getMonth());

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  firstDayofMonth = firstDayofMonth === 0 ? 6 : firstDayofMonth - 1;
  lastDayofMonth = lastDayofMonth === 0 ? 6 : lastDayofMonth - 1;

  let liTag = "";

  /*for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive" data-cy="calendar-cell">${
      lastDateofLastMonth - i + 1
    }</li>`;
  }
*/
  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive" data-cy="calendar-cell" data-date="${currYear}-${currMonth
      .toString()
      .padStart(2, "0")}-${
      lastDateofLastMonth - i + (1).toString().padStart(2, "0")
    }">${lastDateofLastMonth - i + 1}</li>`;
  }
  /* for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}" data-cy="calendar-cell">${i}</li>`;
  }
*/
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}" data-cy="calendar-cell" data-date="${currYear}-${(
      currMonth + 1
    )
      .toString()
      .padStart(2, "0")}-${i.toString().padStart(2, "0")}">${i}</li>`;
  }
  /*
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive" data-cy="calendar-cell">${
      i - lastDayofMonth + 1
    }</li>`;
  }
*/
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive" data-cy="calendar-cell" data-date="${currYear}-${(
      currMonth + 2
    )
      .toString()
      .padStart(2, "0")}-${
      i - lastDayofMonth + (1).toString().padStart(2, "0")
    }">${i - lastDayofMonth + 1}</li>`;
  }

  // Uppdatera månadsnamnet i HTML
  const activeMonthElement = document.querySelector(".activeMonth");
  activeMonthElement.innerHTML = `${months[currMonth]} <span class="activeYear">${currYear}</span>`;

  currentDate.innerText = "";
  daysTag.innerHTML = liTag;
};

renderCalendar();
// Attach event listener to each calendar cell
const calendarCells = document.querySelectorAll("[data-cy='calendar-cell']");
calendarCells.forEach((cell) => {
  cell.addEventListener("click", showEventsForDate);
});

// Lägg till klickhändelser för ikonerna för att byta månad
prevIcon.addEventListener("click", () => {
  currMonth -= 1;
  handleMonthChange();
});

nextIcon.addEventListener("click", () => {
  currMonth += 1;
  handleMonthChange();
});

// Function to handle month change
function handleMonthChange() {
  // Check if the current month is out of bounds
  if (currMonth < 0 || currMonth > 11) {
    // If the month is out of bounds, update the year and month
    date = new Date(currYear, currMonth);
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  } else {
    // Otherwise, reset the date to the current date
    date = new Date();
  }

  // Render the calendar with the updated values for the year and month
  renderCalendar();

  // Reattach event listeners to the new calendar cells
  attachEventListeners();

  // Load events for the new month
  loadEvents();
}
