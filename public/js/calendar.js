const currentDate = document.querySelector(".current-date"),
  daysTag = document.querySelector(".days"),
  prevIcon = document.getElementById("prevMonth"),
  nextIcon = document.getElementById("nextMonth");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
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
    liTag += `<li class="inactive" data-cy="calendar-cell" data-date="${currYear}-${currMonth
      .toString()
      .padStart(2, "0")}-${(lastDateofLastMonth - i + 1).toString().padStart(2, "0")}">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}" data-cy="calendar-cell" data-date="${currYear}-${(currMonth + 1)
      .toString()
      .padStart(2, "0")}-${i.toString().padStart(2, "0")}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive" data-cy="calendar-cell" data-date="${currYear}-${(currMonth + 2)
      .toString()
      .padStart(2, "0")}-${(i - lastDayofMonth + 1).toString().padStart(2, "0")}">${i - lastDayofMonth + 1}</li>`;
  }

  const activeMonthElement = document.querySelector(".activeMonth");
  activeMonthElement.innerHTML = `${months[currMonth]} <span class="activeYear">${currYear}</span>`;

  currentDate.innerText = "";
  daysTag.innerHTML = liTag;
};

renderCalendar();

const calendarCells = document.querySelectorAll("[data-cy='calendar-cell']");
calendarCells.forEach((cell) => {
  cell.addEventListener("click", showEventsForDate);
});

prevIcon.addEventListener("click", () => {
  currMonth -= 1;
  handleMonthChange();
});

nextIcon.addEventListener("click", () => {
  currMonth += 1;
  handleMonthChange();
});

function handleMonthChange() {
  if (currMonth < 0) {
    currMonth = 11;
    currYear--;
  } else if (currMonth > 11) {
    currMonth = 0;
    currYear++;
  }

  renderCalendar();
  updateDateClickHandlers();
  loadEvents();
}

function updateDateClickHandlers() {
  const calendarCells = document.querySelectorAll("[data-cy='calendar-cell']");
  
  calendarCells.forEach((cell) => {
    cell.removeEventListener("click", showEventsForDate);
    cell.addEventListener("click", showEventsForDate);
  });
}
