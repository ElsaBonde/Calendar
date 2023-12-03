/**Open modal function */

var existingEvents = JSON.parse(localStorage.getItem("todos")) || [];
let selectedId = ""; //håller koll på ID i event

sortList(existingEvents);

function openModal() {
  document.getElementById("todoModal").style.display = "flex"; // Change 'flex' to 'block' if you prefer
}

// Function to close the modal
function closeModal() {
  document.getElementById("todoModal").style.display = "none";
  document.getElementById("editModal").style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
  const modal = document.getElementById("todoModal");
  const editModal = document.getElementById("editModal");
  if (event.target == modal || event.target == editModal) {
    modal.style.display = "none";
  }
};

function addEvent() {
  // Get values from the form
  var title = document.getElementById("titleToDo").value;
  var date = document.getElementById("dateToDo").value;
  var time = document.getElementById("timeToDo").value;

  // Create a new event object
  var newEvent = {
    title: title,
    date: date,
    time: time,
    id: title + date + time, //skapar unikt id för varje todo
  };

  // Retrieve existing todos from local storage
  var existingEvents = JSON.parse(localStorage.getItem("todos")) || [];

  // Add the new event to the array
  existingEvents.push(newEvent);

  // Save the updated todos array back to local storage
  localStorage.setItem("todos", JSON.stringify(existingEvents));

  // Update the event list on the page
  updateEventList(existingEvents);

  // Close the modal
  closeModal();

  // load todos
  loadEvents();
}

function sortList(todos) {
  //sorterar både datum och tid, tar in två parametrar för att jämföra
  const sortedList = todos.sort((a, b) => {
    //hämtar datum och tid för a och b (aDateTime för a och bDateTime för b). dessa representerar två element i eventlistan
    const aDateTime = `${a.date} ${a.time}`;
    const bDateTime = `${b.date} ${b.time}`;
    //jämför a och b mot varandra genom localCompare och retunerar ett värde som på så vis byter plats på items
    return aDateTime.localeCompare(bDateTime);
  });
  localStorage.setItem("todos", JSON.stringify(sortedList));
}

// Function to update the event list on the page
function updateEventList(todos) {
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = ""; // Clear existing list

  // Iterate through the todos and create list items
  todos.forEach(function (event) {
    var listItem = document.createElement("li");

    // Create a span for event-info
    var eventInfo = document.createElement("span");
    eventInfo.className = "liEvents";
    eventInfo.textContent = `${event.date} at ${event.time}\r\n${event.title}`;

    listItem.appendChild(eventInfo);

    // Creata a button
    var editButton = document.createElement("button");
    editButton.className = "editButton";
    listItem.appendChild(editButton);
    eventList.appendChild(listItem);
  });

  document
    .getElementById("eventList")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("editButton")) {
        handleEditClick(event, existingEvents);
      }
    });
}

function handleEditClick(event, existingEvents) {
  const listItem = event.target.parentElement; //listelementet som innehåller det klickade editButton

  const index = Array.from(listItem.parentNode.children).indexOf(listItem); //hitta index för listelementet i dess förälders children
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
  //restunerar objekt
  const itemToUpdate = dataList.find((item) => item.id === idToUpdate);

  //uppdatera objektet med de nya värderna
  if (idToUpdate) {
    Object.assign(itemToUpdate, newValues);
  }
}

function updateEventInLocalStorage() {
  const existingEvents = JSON.parse(localStorage.getItem("todos")) || [];

  //hämta de uppdaterade värdena från input-fälten i modalen FUNKAR
  const updatedTitle = document.getElementById("editTitle").value;
  const updatedDate = document.getElementById("editDate").value;
  const updatedTime = document.getElementById("editTime").value;

  //skapa ett nytt event-objekt med de uppdaterade värdena
  const updatedEvent = {
    title: updatedTitle,
    date: updatedDate,
    time: updatedTime,
  };

  updateListIdById(existingEvents, selectedId, updatedEvent);

  //spara den uppdaterade todos-arrayen till localStorage funkar inte heller
  localStorage.setItem("todos", JSON.stringify(existingEvents));

  //uppdatera DOMen med de nya uppdaterade händelserna funkar inte med alla värden i objektet
  updateEventList(existingEvents);
}

// Function to load todos from local storage and update the list on page load
function loadEvents() {
  var existingEvents = JSON.parse(localStorage.getItem("todos")) || [];
  updateEventList(existingEvents);
}
