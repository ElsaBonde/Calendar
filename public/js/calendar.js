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

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive" data-cy="calendar-cell"><span data-cy="calendar-cell-date">${
      lastDateofLastMonth - i + 1
    }</span></li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}" data-cy="calendar-cell"><span data-cy="calendar-cell-date">${i}</span></li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive" data-cy="calendar-cell"><span data-cy="calendar-cell-date">${
      i - lastDayofMonth + 1
    }</span>npm </li>`;
  }

  // Uppdatera månadsnamnet i HTML
  const activeMonthElement = document.querySelector(".activeMonth");
  activeMonthElement.innerHTML = `${months[currMonth]} <span class="activeYear">${currYear}</span>`;

  currentDate.innerText = "";
  daysTag.innerHTML = liTag;
};
renderCalendar();

// Lägg till klickhändelser för ikonerna för att byta månad
prevIcon.addEventListener("click", () => {
  currMonth -= 1;
  handleMonthChange();
});

nextIcon.addEventListener("click", () => {
  currMonth += 1;
  handleMonthChange();
});

// Funktion för att hantera förändring av månad
function handleMonthChange() {
  if (currMonth < 0 || currMonth > 11) {
    // Om månaden är mindre än 0 eller större än 11, uppdatera år och månad
    date = new Date(currYear, currMonth);
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  } else {
    // Annars, återställ datumet till dagens datum
    date = new Date();
  }
  // Rendera kalendern med de uppdaterade värdena för år och månad
  renderCalendar();
}
