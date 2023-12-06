var existingEvents = JSON.parse(localStorage.getItem("todos")) || [];
let selectedId = ""; //håller koll på ID i event

sortList(existingEvents);

// Open modal function
function openModal() {
	document.getElementById("todoModal").style.display = "flex"; // Change 'flex' to 'block' if you prefer
}

// Function to close the modal
function closeModal() {
	document.getElementById("todoModal").style.display = "none";
	document.getElementById("editModal").style.display = "none";
}

// Close the modal if the user clicks outside the modal
window.onclick = function (event) {
	const modal = document.getElementById("todoModal");
	const editModal = document.getElementById("editModal");
	if (event.target == modal || event.target == editModal) {
		modal.style.display = "none";
		editModal.style.display = "none";
	}
};

// add new event function
function addEvent() {
	var title = document.getElementById("titleToDo").value;
	var date = document.getElementById("dateToDo").value;
	var time = document.getElementById("timeToDo").value;

	var newEvent = {
		title: title,
		date: date,
		time: time,
		id: title + date + time, //create an id for event
	};

	var existingEvents = JSON.parse(localStorage.getItem("todos")) || [];
	existingEvents.push(newEvent);

	localStorage.setItem("todos", JSON.stringify(existingEvents));

	updateEventList(existingEvents);
	closeModal();
	loadEvents();
}
// sort list function (it sorts by date and time)
function sortList(todos) {
	const sortedList = todos.sort((a, b) => {
		const aDateTime = `${a.date} ${a.time}`;
		const bDateTime = `${b.date} ${b.time}`;
		return aDateTime.localeCompare(bDateTime);
	});
	localStorage.setItem("todos", JSON.stringify(sortedList));
}

// Function to update the event list on the page
function updateEventList(todos) {
	const eventList = document.getElementById("eventList");
	eventList.innerHTML = "";

	todos.forEach(function (event) {
		var listItem = document.createElement("li");

		// Create a span for event-info
		var eventInfo = document.createElement("span");
		eventInfo.className = "liEvents";
		eventInfo.textContent = `${event.date} at ${event.time}\r\n${event.title}`;

		listItem.appendChild(eventInfo);

		// edit button
		const editButton = document.createElement("button");
		editButton.setAttribute("data-cy", "edit-todo-button");
		editButton.className = "editButton";
		editButton.innerHTML =
			'<i class="far fa-pen-to-square" style="color: #000000;"></i>';
		editButton.addEventListener("click", (event) => {
			handleEditClick(event, existingEvents);
		});
		listItem.appendChild(editButton);
		eventList.appendChild(listItem);

		// delete button
		const deleteButton = document.createElement("button");
		deleteButton.setAttribute("data-cy", "delete-todo-button");
		deleteButton.className = "deleteButton";
		deleteButton.innerHTML =
			'<i class="fa-regular fa-trash-can" style="color: #000000;"></i>';
		deleteButton.addEventListener("click", (event) => {
			handleDeleteClick(event, existingEvents);
		});
		listItem.appendChild(deleteButton);

		eventList.appendChild(listItem);
	});
}

// edit function
function handleEditClick(event, existingEvents) {
	const listItem = event.target.closest("li");

	const index = Array.from(listItem.parentNode.children).indexOf(listItem);

	// Check if the index is valid
	if (index === -1 || index >= existingEvents.length) {
		console.error("Invalid index:", index);
	}

	const selectedEvent = existingEvents[index];
	selectedId = selectedEvent.id;

	fillEditModal(selectedEvent);
}

// delete function
function handleDeleteClick(event, todos) {
	const listItem = event.target.closest("li");

	if (listItem && listItem.parentNode) {
		if (listItem) {
			const index = Array.from(listItem.parentNode.children).indexOf(listItem);

			const removedEvent = todos.splice(index, 1)[0]; // Remove the event from the array
			localStorage.setItem("todos", JSON.stringify(todos));
			updateEventList(todos);

			console.log("Deleted Event:", removedEvent);
		}
	}
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
	const existingEvents = JSON.parse(localStorage.getItem("todos")) || [];
	const updatedTitle = document.getElementById("editTitle").value;
	const updatedDate = document.getElementById("editDate").value;
	const updatedTime = document.getElementById("editTime").value;

	const updatedEvent = {
		title: updatedTitle,
		date: updatedDate,
		time: updatedTime,
	};

	updateListIdById(existingEvents, selectedId, updatedEvent);
	localStorage.setItem("todos", JSON.stringify(existingEvents)); // saves it to local storage
	updateEventList(existingEvents);
}

// Function to load todos from local storage and update the list on page load
function loadEvents() {
	var existingEvents = JSON.parse(localStorage.getItem("todos")) || [];
	updateEventList(existingEvents);
}

document
	.getElementById("eventList")
	.addEventListener("click", function (event) {
		const editButton = event.target.closest(".editButton");
		const deleteButton = event.target.closest(".deleteButton");

		if (editButton) {
			handleEditClick(event, existingEvents);
		} else if (deleteButton) {
			handleDeleteClick(event, existingEvents);
		}
	});

window.onload = function () {
	loadEvents();
};
