/**Open modal function */

function openModal() {
  console.log("openModal function is called!");
  document.getElementById("todoModal").style.display = "flex"; // Change 'flex' to 'block' if you prefer
}

// Function to close the modal
function closeModal() {
  document.getElementById("todoModal").style.display = "none";
}

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
  const modal = document.getElementById("todoModal");
  if (event.target == modal) {
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
  };

  // Retrieve existing events from local storage
  var existingEvents = JSON.parse(localStorage.getItem("events")) || [];

  // Add the new event to the array
  existingEvents.push(newEvent);

  // Save the updated events array back to local storage
  localStorage.setItem("events", JSON.stringify(existingEvents));

  // Update the event list on the page
  updateEventList(existingEvents);

  // Close the modal
  closeModal();

  // load events
  loadEvents();
}

// Function to update the event list on the page
/*function updateEventList(events) {
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = ""; // Clear existing list

  sortList(events);

  // Iterate through the events and create list items
  events.forEach(function (event) {
    var listItem = document.createElement("li");

    // Create a span for event-info
    var eventInfo = document.createElement("span");
    eventInfo.className = "liEvents";
    eventInfo.textContent = `${event.date} at ${event.time}\r\n${event.title}`;
    listItem.appendChild(eventInfo);

    // Creata a button
    var editButton = document.createElement("button");
    editButton.className = "editButton";
    editButton.onclick = function () {};
    listItem.appendChild(editButton);
    eventList.appendChild(listItem);
  });
}*/
function updateEventList(events) {
  const eventList = document.getElementById("eventList");
  eventList.innerHTML = ""; // Clear existing list

  sortList(events);

  // Iterate through the events and create list items
  events.forEach(function (event) {
    const listItem = document.createElement("li");

    // Create a span for event-info
    const eventInfo = document.createElement("span");
    eventInfo.className = "liEvents";
    eventInfo.textContent = `${event.date} at ${event.time}\r\n${event.title}`;
    listItem.appendChild(eventInfo);

    // Creata a button
    const editButton = document.createElement("button");
    editButton.className = "editButton";
    editButton.onclick = function () {};
    listItem.appendChild(editButton);
    eventList.appendChild(listItem);
  });
}

function sortList(events) {
  //sorterar både datum och tid, tar in två parametrar för att jämföra
  events.sort((a, b) => {
    //hämtar datum och tid för a och b (aDateTime för a och bDateTime för b). dessa representerar två element i eventlistan
    const aDateTime = `${a.date} ${a.time}`;
    const bDateTime = `${b.date} ${b.time}`;
    //jämför a och b mot varandra genom localCompare och retunerar ett värde som på så vis byter plats på items
    return aDateTime.localeCompare(bDateTime);
  });
}
/*function filterByDate() {
  const selectedDate = document.getElementById("filterDate").value;
  const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
  const filteredEvents = existingEvents.filter(
    (event) => event.date === selectedDate
  );
  updateEventList(filteredEvents);
}
*/
let selectedDate = null;

function showEventsForDate(event) {
  const clickedDate = event.target.dataset.date;

  // Check if the same date is clicked again
  if (selectedDate === clickedDate) {
    // If yes, load all events for the month
    loadEvents();
    selectedDate = null; // Reset selectedDate
    return;
  }

  if (clickedDate) {
    const [clickedYear, clickedMonth, clickedDay] = clickedDate.split("-");
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Filter events for the entire year
    const eventsForYear = existingEvents.filter((evt) =>
      evt.date.startsWith(`${clickedYear}`)
    );

    // Filter events for the specific date (day and month)
    const eventsForDate = eventsForYear.filter(
      (evt) => evt.date === clickedDate
    );

    updateEventList(eventsForDate);
    selectedDate = clickedDate; // Set selectedDate
  }
}

// Function to load events from local storage and update the list on page load
function loadEvents() {
  const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
  updateEventList(existingEvents);
}
