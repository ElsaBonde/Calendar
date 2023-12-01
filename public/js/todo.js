/**Open modal function */

var existingEvents = JSON.parse(localStorage.getItem("events")) || [];

function openModal() {
	console.log("openModal function is called!");
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
function updateEventList(events) {
	var eventList = document.getElementById("eventList");
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
		listItem.appendChild(editButton);
		eventList.appendChild(listItem);
	});

	document.getElementById('eventList').addEventListener('click', function (event) {
		if (event.target.classList.contains('editButton')) {
			handleEditClick(event, existingEvents);
		}
	});
}

function handleEditClick(event, existingEvents) {
	const listItem = event.target.parentElement; //listelementet som innehåller det klickade editButton
    const index = Array.from(listItem.parentNode.children).indexOf(listItem); //hitta index för listelementet i dess förälders children
	const selectedEvent = existingEvents[index];
	fillEditModal(selectedEvent);
}

function fillEditModal(selectedEvent) {
	document.getElementById('editTitle').value = selectedEvent.title;
	document.getElementById('editDate').value = selectedEvent.date;
	document.getElementById('editTime').value = selectedEvent.time;

	document.getElementById('editModal').style.display = "flex";
}

function updateEventInLocalStorage(index) {
	console.log('Index in updateEventInLocalStorage:', index); 

	console.log('Index in updateEventInLocalStorage:', index); 
    const existingEvents = JSON.parse(localStorage.getItem('events')) || [];
    
    // Hämta de uppdaterade värdena från input-fälten i modalen
    const updatedTitle = document.getElementById('editTitle').value;
    const updatedDate = document.getElementById('editDate').value;
    const updatedTime = document.getElementById('editTime').value;

    // Uppdatera eventet med de nya värdena
    existingEvents[index].title = updatedTitle;
    existingEvents[index].date = updatedDate;
    existingEvents[index].time = updatedTime;

    // Spara den uppdaterade events-arrayen till LS
    localStorage.setItem('events', JSON.stringify(existingEvents));

    // Uppdatera DOMen med de nya uppdaterade händelserna
    updateEventList(existingEvents);
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

// Function to load events from local storage and update the list on page load
function loadEvents() {
	var existingEvents = JSON.parse(localStorage.getItem("events")) || [];
	updateEventList(existingEvents);
}
