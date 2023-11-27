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
function updateEventList(events) {
	var eventList = document.getElementById("eventList");
	eventList.innerHTML = ""; // Clear existing list

	// Iterate through the events and create list items
	events.forEach(function (event) {
		var listItem = document.createElement("li");
		listItem.textContent = `${event.title} - ${event.date} - ${event.time}`;
		eventList.appendChild(listItem);
	});
}

// Function to load events from local storage and update the list on page load
function loadEvents() {
	var existingEvents = JSON.parse(localStorage.getItem("events")) || [];
	updateEventList(existingEvents);
}
