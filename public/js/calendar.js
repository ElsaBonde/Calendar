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

function getTodosForDate(targetDate) {
  const allTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return allTodos.filter(todo => todo.date === targetDate);
}

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

    let targetDate = `${currYear}-${(currMonth + 1).toString().padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
    let todosForDate = getTodosForDate(targetDate);
    let todoCountElement = "";

    if (todosForDate.length) {
      todoCountElement = `<div class="todo-count" data-cy="calendar-cell-todos">${todosForDate.length}</div>`;
    }

    liTag += `<li class="${isToday}" data-cy="calendar-cell">
                  <span data-cy="calendar-cell-date">${i}</span>
                  ${todoCountElement}
               </li>`;
  }
 
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive" data-cy="calendar-cell"><span data-cy="calendar-cell-date">${
      i - lastDayofMonth + 1
    }</span></li>`;
  }

  const activeMonthElement = document.querySelector(".activeMonth");
  activeMonthElement.innerHTML = `${months[currMonth]} <span class="activeYear">${currYear}</span>`;

  currentDate.innerText = "";
  daysTag.innerHTML = liTag;
};

renderCalendar();


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
  loadEvents();
}
