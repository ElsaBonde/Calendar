// Open modal function
var existingEvents = JSON.parse(localStorage.getItem("events")) || [];
let selectedEventIndex = -1; // Holds the index of the selected event

sortList(existingEvents);

function openModal() {
	document.getElementById("todoModal").style.display = "flex";
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
		id: generateUniqueId(), // Function to generate a unique ID
	};

	var existingEvents = JSON.parse(localStorage.getItem("events")) || [];
	existingEvents.push(newEvent);
	localStorage.setItem("events", JSON.stringify(existingEvents));

	updateEventList(existingEvents);

	closeModal();

	loadEvents();
}

function generateUniqueId() {
	// Function to generate a unique ID
	return Date.now().toString();
}

function updateEventList(events) {
	const eventList = document.getElementById("eventList");
	eventList.innerHTML = "";

	events.forEach(function (event, index) {
		const listItem = document.createElement("li");

		const eventInfo = document.createElement("span");
		eventInfo.className = "liEvents";
		eventInfo.textContent = `${event.date} at ${event.time}\r\n${event.title}`;
		listItem.appendChild(eventInfo);

		const editButton = document.createElement("button");
		editButton.className = "editButton";
		editButton.addEventListener("click", function () {
			handleEditClick(index);
		});
		listItem.appendChild(editButton);

		const deleteButton = document.createElement("button");
		deleteButton.className = "deleteButton";
		deleteButton.dataset.cy = "delete-todo-button";
		listItem.appendChild(deleteButton);

		eventList.appendChild(listItem);
	});
}

function handleEditClick(index) {
	selectedEventIndex = index;
	const selectedEvent = existingEvents[index];

	fillEditModal(selectedEvent);
}

function fillEditModal(selectedEvent) {
	document.getElementById("editTitle").value = selectedEvent.title;
	document.getElementById("editDate").value = selectedEvent.date;
	document.getElementById("editTime").value = selectedEvent.time;

	document.getElementById("editModal").style.display = "flex";
}

function updateEventInLocalStorage() {
	if (selectedEventIndex !== -1) {
		const updatedTitle = document.getElementById("editTitle").value;
		const updatedDate = document.getElementById("editDate").value;
		const updatedTime = document.getElementById("editTime").value;

		const updatedEvent = {
			title: updatedTitle,
			date: updatedDate,
			time: updatedTime,
		};

		existingEvents[selectedEventIndex] = updatedEvent;

		localStorage.setItem("events", JSON.stringify(existingEvents));

		updateEventList(existingEvents);

		closeModal();
	}
}

function loadEvents() {
	var existingEvents = JSON.parse(localStorage.getItem("events")) || [];
	updateEventList(existingEvents);
}

// Initial load on page load
loadEvents();
