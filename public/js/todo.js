/**Open modal function */

var existingEvents = JSON.parse(localStorage.getItem("events")) || [];
let selectedId = ""; //håller koll på ID i event

sortList(existingEvents);

function openModal() {
  document.getElementById("todoModal").style.display = "flex"; // Change 'flex' to 'block' if you prefer
}

function closeModal() {
  document.getElementById("todoModal").style.display = "none";
  document.getElementById("editModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("todoModal");
  const editModal = document.getElementById("editModal");
  if (event.target == modal || event.target == editModal) {
    modal.style.display = "none";
  }
};

function addEvent() {
  var title = document.getElementById("titleToDo").value;
  var date = document.getElementById("dateToDo").value;
  var time = document.getElementById("timeToDo").value;

  var newEvent = {
    title: title,
    date: date,
    time: time,
  };

  var existingEvents = JSON.parse(localStorage.getItem("events")) || [];
  existingEvents.push(newEvent);
  localStorage.setItem("events", JSON.stringify(existingEvents));

  updateEventList(existingEvents);

  closeModal();

  loadEvents();
}

function updateEventList(events) {
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = "";

  events.forEach(function (event) {
    const listItem = document.createElement("li");

    const eventInfo = document.createElement("span");
    eventInfo.className = "liEvents";
    eventInfo.textContent = `${event.date} at ${event.time}\r\n${event.title}`;
    listItem.appendChild(eventInfo);

    const editButton = document.createElement("button");
    editButton.className = "editButton";
    editButton.onclick = function () {
      handleEditClick(event, existingEvents);
    };
    listItem.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.dataset.cy = "delete-todo-button";
    deleteButton.onclick = function () {
      const listItem = this.parentNode;
      const eventList = listItem.parentNode;
      eventList.removeChild(listItem);
    };

    listItem.appendChild(deleteButton);
    eventList.appendChild(listItem);
  });
}

function handleEditClick(event, existingEvents) {
  const listItem = event.target.parentElement;
  const index = Array.from(listItem.parentNode.children).indexOf(listItem);
  const selectedEvent = existingEvents[index];
  selectedId = selectedEvent.id;

  fillEditModal(selectedEvent);
}

function fillEditModal(selectedEvent) {
  document.getElementById("editTitle").value = selectedEvent.title;
  document.getElementById("editDate").value = selectedEvent.date;
  document.getElementById("editTime").value = selectedEvent.time;

  document.getElementById("editModal").style.display = "flex";
}

function updateListIdById(dataList, idToUpdate, newValues) {
  const itemToUpdate = dataList.find((item) => item.id === idToUpdate);

  if (idToUpdate) {
    Object.assign(itemToUpdate, newValues);
  }
}

function updateEventInLocalStorage() {
  const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

  const updatedTitle = document.getElementById("editTitle").value;
  const updatedDate = document.getElementById("editDate").value;
  const updatedTime = document.getElementById("editTime").value;

  const updatedEvent = {
    title: updatedTitle,
    date: updatedDate,
    time: updatedTime,
  };

  updateListIdById(existingEvents, selectedId, updatedEvent);

  localStorage.setItem("events", JSON.stringify(existingEvents));

  updateEventList(existingEvents);
}

function loadEvents() {
  var existingEvents = JSON.parse(localStorage.getItem("events")) || [];
  updateEventList(existingEvents);
}

// Initial load on page load
loadEvents();
